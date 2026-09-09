// Beyan — service worker
// Amaç: siteyi "ana ekrana ekle" ile kurulabilir yapmak ve daha önce ziyaret
// edilen sayfaların/verilerin çevrimdışı (internetsiz) da açılabilmesini sağlamak.
//
// Kapsam BİLEREK dar tutuldu: sadece KENDİ sitemizden (aynı origin) gelen GET
// istekleri önbelleğe alınıyor. Dış kaynaklar (EveryAyah ses akışı, GitHub'dan
// canlı çekilen tefsir, Aladhan namaz vakti API'si, Vikipedi API'si, Google
// Fonts) bu service worker'a hiç uğramıyor — tarayıcı bunları normal şekilde,
// kendi HTTP önbelleğiyle yönetiyor. Bunun 3 nedeni var: (1) ses dosyaları
// "Range" (parçalı) istekler kullanıyor, service worker'ın bunu önbelleklemesi
// bozuk/eksik parçalı ses çalmaya yol açabilir; (2) namaz vakti ve tefsir gibi
// veriler günlük/canlı kalmalı; (3) basit ve hataya kapalı tutmak, karmaşık
// çapraz-origin önbellekleme hatalarından kaçınmak için.

const CACHE_NAME = 'beyan-v4';

// "Uygulama iskeleti": ilk kurulumda hemen önbelleğe alınan dosyalar.
// Kur'an'ın Arapça+Türkçe (Diyanet) metni de dahil edildi ki meal modunda
// hiç ziyaret edilmemiş bir sayfa bile ilk internetli açılıştan sonra
// çevrimdışı çalışabilsin. Diğer her şey (ek mealler, tefsir, tecvid verisi,
// kök arama verisi, ses zamanlama dosyaları) ziyaret edildikçe aşağıdaki
// "cache-first" stratejisiyle kendiliğinden önbelleğe ekleniyor.
const PRECACHE_URLS = [
  './',
  'index.html',
  'oku.html',
  'ara.html',
  'ansiklopedi.html',
  'isimler.html',
  'namaz.html',
  'peygamberler.html',
  'peygamber.html',
  'mucizeler.html',
  'bilim.html',
  'bayramlar.html',
  'mealler.html',
  'tefsir-kaynaklari.html',
  'moderasyon.html',
  'ezberlerim.html',
  'elifba.html',
  'ilmihal.html',
  'tarih-haritasi.html',
  'haberler.html',
  'manifest.json',
  'assets/css/style.css',
  'assets/icons/icon-192.png',
  'assets/icons/icon-512.png',
  'assets/icons/icon-maskable-192.png',
  'assets/icons/icon-maskable-512.png',
  'assets/icons/apple-touch-icon.png',
  'assets/icons/favicon-32.png',
  'assets/icons/favicon-16.png',
  'data/quran/quran-arabic.json',
  'data/quran/quran-turkish.json',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((names) => Promise.all(names.filter((n) => n !== CACHE_NAME).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return; // sadece kendi sitemiz

  if (url.pathname.includes('/data/')) {
    // Kur'an metni, mealler, tefsir örnekleri, tecvid ve kök verisi:
    // büyük ve neredeyse hiç değişmeyen dosyalar → önce önbellek, yoksa ağ.
    event.respondWith(cacheFirst(req));
  } else {
    // Sayfalar (HTML), stil dosyası, manifest, ikonlar: geliştirme sürüyor,
    // her zaman en güncelini göstermek önemli → önce ağ, çevrimdışıysa önbellek.
    event.respondWith(networkFirst(req));
  }
});

async function cacheFirst(req) {
  const cached = await caches.match(req);
  if (cached) return cached;
  const res = await fetch(req);
  if (res && res.ok) {
    const cache = await caches.open(CACHE_NAME);
    cache.put(req, res.clone());
  }
  return res;
}

async function networkFirst(req) {
  const url = new URL(req.url);
  // Sorgu parametreli adresleri (ör. oku.html?sure=2&ayet=255 derin bağlantısı)
  // içerik aynı olduğu için sorgusuz tek bir önbellek anahtarına indirgiyoruz.
  const cacheKey = url.search ? (url.origin + url.pathname) : req;
  try {
    const res = await fetch(req);
    if (res && res.ok) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(cacheKey, res.clone());
    }
    return res;
  } catch (err) {
    const cached = await caches.match(cacheKey, { ignoreSearch: true });
    if (cached) return cached;
    throw err;
  }
}
