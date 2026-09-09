# Beyan (İkra Kur'an)

Ücretsiz, bağış temelli, "sadece Kur'an" ilkesiyle hazırlanan bir Kur'an-ı Kerim okuma/öğrenme sitesi.

## Şu anki durum
- `index.html` — ana sayfa (hero, "Kur'an'ı Oku" gerçek okuyucu, ezber araçları, sosyal alan). CSS `assets/css/style.css` dosyasında, JS sayfanın içinde gömülü.
- `data/` — **gerçek veri:** tam Kur'an metni (Arapça + Türkçe meal, 114 sûre/6.236 ayet) ve 6 tefsir kaynağından örnek veri. Detaylar için `data/README.md`.
- **8 ayrı sayfa** — Peygamberler, Mucizeler, Bilim, Namaz, Bayramlar (gerçek ayet alıntılarıyla) + Kullanılan mealler / Tefsir kaynakları / Moderasyon ilkeleri (bilgi sayfaları).
- `scripts/fetch_tafsir.py` — istediğiniz ayet + tefsir kombinasyonunu qul.tarteel.ai'den anında çekebilen yardımcı script.

## 2026-09-06: "Her tıklama çalışsın" düzeltmeleri
Sayfadaki her buton/link tek tek denendi, kırık olanlar onarıldı:

| Ne | Önce | Şimdi |
|---|---|---|
| "Okumaya başla" / "Uygulamayı dene" vb. (6 CTA) | `#basla` diye bir yer yoktu, hiçbir şey olmuyordu | Yeni **"Kur'an'ı Oku"** bölümü: 114 sûrenin tamamını, ayet ayet, gerçek Arapça+meal ile okuyabildiğiniz gerçek bir okuyucu |
| Peygamberler / Mucizeler / Bilim / Namaz / Bayramlar (5 kart) | Tıklanamaz, sadece görsel kutu | Her biri gerçek ayet alıntılarıyla dolu ayrı bir sayfaya bağlı |
| Footer: Kullanılan mealler / Tefsir kaynakları / Moderasyon ilkeleri | Boş `#` linki | Gerçek içerikli 3 ayrı sayfa |
| "Notlarıma ekle" | Sadece görsel toggle, kalıcı değil | `localStorage`'a gerçekten kaydediyor; "Not tutarak çalış" sekmesinde listeleniyor |
| "+ Yeni konu öner" | Hiçbir tepki yok | Başlık/açıklama soruyor, forum listesine ekliyor, tarayıcınızda kalıcı |
| "Giriş yap" | Hiçbir yere gitmiyordu | Tıklayınca dürüst bir bilgi mesajı gösteriyor (henüz üyelik sistemi yok) |

**Henüz gerçek olmayanlar (bilerek):** "Dinleyerek takip et" sekmesindeki oynatıcı gerçek ses dosyası çalmıyor, sadece kelimeleri sırayla vurguluyor (görsel simülasyon). Gerçek üyelik sistemi ve herkese açık/paylaşımlı forum bir sunucu + veritabanı gerektirir — bu, GitHub/Vercel adımına geçildiğinde ele alınacak.

## Yerel geliştirme — ÖNEMLİ
Sayfa `data/` klasöründeki JSON dosyalarını okuduğu için **çift tıklayarak açmak yeterli değil** — tarayıcılar güvenlik nedeniyle `file://` üzerinden yerel JSON okumaya izin vermiyor. Bunun yerine küçük bir yerel sunucu üzerinden açmanız gerekiyor:

```bash
cd "Kuran OkumaSayfası"
python3 -m http.server 8420
```
Sonra tarayıcıda **http://localhost:8420/index.html** adresini açın.

(Sunucu olmadan `file://` ile açarsanız sayfa yine de bozulmaz — sadece "Kur'an'ı Oku", "Meal ile oku" ve "Tefsirle karşılaştır" gerçek veri yerine örnek/mock metinle görünür.)

**PWA notu:** `http://localhost:8420` tarayıcılar tarafından "güvenli bağlam" sayıldığı için (localhost istisnası) service worker orada da normal çalışır — adres çubuğundaki kurulum ikonuna basıp siteyi yerelde bile "ana ekrana ekle" ile deneyebilirsiniz. Gerçek bir alan adına (Vercel vb.) taşındığında otomatik olarak HTTPS üzerinden de çalışır, ekstra bir ayar gerekmez.

## 2026-09-08: Ayrı bir "Kur'an'ı Oku" sayfası (oku.html)
Artık "Kur'an'ı Oku" tıklandığında ana sayfada kalmıyor — **ayrı bir sayfa (`oku.html`) açılıyor.** Bu sayfa önce size sorar: **Meal ile Oku / Tefsirle Oku / Hatim Modu**. Hangisini seçerseniz seçin, Fâtiha'nın 1. ayetinden başlayıp sırayla ilerlersiniz; okuma pozisyonunuz tarayıcınızda hatırlanır, kaldığınız yerden devam edersiniz.

- **Meal ile Oku:** Arapça + gerçek Türkçe meal.
- **Tefsirle Oku:** Arapça + seçtiğiniz kaynaktan (İbn Kesîr / Muhtasar / es-Sa'dî) **canlı çekilen** gerçek tefsir — sadece Fâtiha değil, Kur'an'ın **tamamı** için çalışır (spa5k/tafsir_api'nin GitHub'daki ham dosyalarından anlık olarak çekiliyor, internet bağlantısı gerektirir).
- **Hatim Modu:** Aynı okuma deneyimi + üstte belirgin bir ilerleme çubuğu ("6.236 ayetin %X'i tamamlandı").

## 2026-09-08 (devam): Gerçek kâri sesi + kelime kelime takip, çok ayetli sayfa
Kullanıcı geri bildirimi: "açılan pencere tek ayet gösteriyor, sesle okuma ve gözle takip özellikleri ekleyeceğiz" — bunun üzerine Quran.com, Tarteel ve EveryAyah.com araştırıldı, referans alınarak şunlar eklendi:

- **Aynı ekranda birden fazla ayet:** Artık tek ayet yerine, aynı sûre içinden 10'ar ayetlik "sayfalar" halinde gösteriliyor (Quran.com'un "translation view"ına benzer), "Önceki/Sonraki sayfa" ile ilerleniyor.
- **Gerçek kâri sesi:** Mişarî Raşid el-Afâsî'nin okuyuşu [EveryAyah.com](https://everyayah.com) CDN'inden doğrudan çalınıyor (indirilmiyor, sadece linkleniyor).
- **Kelime kelime canlı vurgulama ("gözle takip"):** [cpfair/quran-align](https://github.com/cpfair/quran-align) projesinin **6.236 ayetin tamamını kapsayan**, CC BY 4.0 lisanslı zaman damgası verisi kullanılarak, ses çalarken o an okunan kelime ekranda altın renkte vurgulanıyor — tıpkı karaoke gibi. Veri `data/audio/alafasy-word-timings.json` içinde (2,2 MB, tek seferlik indirme).
- **Otomatik sayfa çevirme:** Dinlerken bir sayfanın son ayeti bitince, çalma otomatik olarak bir sonraki sayfaya geçip devam ediyor — kesintisiz dinleme deneyimi.
- Her ayetin yanında artık kendi "🔊 bu ayetten dinle" ve "★ notlarıma ekle" düğmeleri var.

**Araştırmadan çıkan önemli teknik bulgu:** `raw.githubusercontent.com` (tefsir verisinin kaynağı) `access-control-allow-origin: *` döndürüyor — yani bir sunucu kurmadan, doğrudan tarayıcıdan canlı veri çekebiliyoruz. Aynı şekilde ses dosyaları için de bir sunucuya ihtiyaç yok, EveryAyah.com'un CDN'i doğrudan `<audio>` etiketiyle çalınabiliyor. Bu sayede "gerçek sesli okuma" özelliği GitHub/Vercel'e geçmeden, tamamen ücretsiz ve sunucusuz şekilde çalışıyor.

## 2026-09-08 (devam 7): İkinci rakip turu → tecvid renkleri, okuma serisi
Kullanıcı "başka rakiplerimizde olup bizde olmayan neler var" dedi. Quran.com'un ürün güncellemeleri (Tajweed Mushaf, Reading Streaks, Media Maker), tajweed renkli mushaf gelenekleri araştırıldı. Eklenenler:

- **Tecvid (tajweed) renk kodlaması** — [cpfair/quran-tajweed](https://github.com/cpfair/quran-tajweed) (CC BY 4.0) verisiyle, "Kur'an'ı Oku" sayfasında isteğe bağlı bir anahtarla Arapça metin tecvid kurallarına göre renkleniyor (kalkale kırmızı, idgam yeşil, ihfâ turuncu, iklab mor, med mavi, gunne pembe, okunmayan harfler gri). **Titizlikle doğrulandı:** kaynak verinin 112 ayette (her sûrenin ilk ayeti, Fâtiha/Tevbe hariç) besmeleyi metne dahil ederek ofset hesapladığı, bizim metnimizin ise besmeleyi ayrı tuttuğu tespit edildi — bu 112 ayette yanlış renklendirme olmaması için tecvid rengi bilerek gösterilmiyor; geri kalan %98,2'de (6.124 ayet) karakter karakter doğrulanmış durumda.
- **Okuma serisi (streak)** — Quran.com'un "Reading Streaks" özelliğine benzer şekilde, art arda kaç gündür okuduğunuzu takip ediyor, okuma ekranında rozet olarak gösteriliyor.

**Araştırılıp şimdilik eklenmeyen, kullanıcıya önerilecek diğer fikirler:** ayet paylaşım görseli (Canvas ile), PWA/çevrimdışı kurulum desteği, çoklu kâri karşılaştırması, açık/koyu tema seçeneği — detaylar sohbette.

## 2026-09-08 (devam 6): Rakip site araştırması → arama, kök arama, günün ayeti
Kullanıcı "benzer siteleri araştır, bende olmayan ne özellikler var" dedi. Quran.com, Tarteel, Muslim Pro, acikkuran.com ve Türkiye'deki popüler dini uygulamalar (Ezan Vakti, Vakit, Amin Pro, e-Diyanet) incelendi. Sonuç ve eklenenler:

- **Kur'an içinde arama** — sitede hiç yoktu, en büyük eksikti. Yeni `ara.html` sayfasında Türkçe meal metninde anlık arama yapılıyor, eşleşen kelime vurgulanıyor, her sonuç doğrudan "Kur'an'ı Oku"ya (o ayete) yönlendiriyor.
- **Kök arama** — acikkuran.com'un öne çıkan "Kökler" özelliğinden esinlenildi. [Quranic Arabic Corpus](http://corpus.quran.com) verisiyle (1.651 kök, GPL lisanslı) her Arapça kökün Kur'an'da geçtiği TÜM ayetler bulunabiliyor (ör. "صلو" kökü → 90 ayet). 26 popüler kök Türkçe etiketlerle (Namaz, Sabır, İman...) tek tıkla erişilebilir; ayrıca Arapça yazarak da aranabiliyor.
- **Günün Ayeti** — Vakit/Amin Pro gibi uygulamalarda standart olan bu özellik ana sayfaya eklendi; rastgele değil, 27 ayetlik küratörlü bir listeden güne göre sabit bir seçim yapılıyor (bağlamından kopuk ayetlerden kaçınmak için).
- **oku.html'e derin bağlantı desteği eklendi:** `oku.html?sure=2&ayet=255` gibi bir link artık doğrudan o ayete, meal moduna atlıyor — arama sonuçları ve günün ayeti bunu kullanıyor.

**Esma-ül Hüsna sorusu çözüldü:** Kullanıcıya soruldu, cevap: "farklı bir şekilde ekle" — yani geleneksel 99'luk hadis kaynaklı liste değil, sadece Kur'an'da doğrudan geçen isim/sıfatlar, her biri gerçek ayet referansıyla. Yeni **`isimler.html`** sayfası: Haşr Sûresi 59:22-24'ten (bizzat "en güzel isimler O'nundur" diyen ayetler) 15 isim, Fâtiha'dan Rabbü'l-Âlemîn, Ayetel Kürsî'den Hayy/Kayyûm/Aliyy/Azîm, İhlas'tan Ehad/Samed ve birkaç başka doğrulanmış ayetten toplam **25 isim** — hepsi gerçek ayet metninden alınmış, "99" iddiası yok, açıkça "kesin/kapalı liste değildir" diye belirtiliyor.

## 2026-09-08 (devam 5): İslam Ansiklopedisi araştırması + yeni sayfa
Kullanıcı Türkçe yayınlanan/aktif İslam ansiklopedilerinin araştırılmasını, paylaşılabilir olanların sayfada açılmasını, paylaşılamayanların ise (bizim içerik yazarken) kaynak olarak kullanılmasını istedi. Araştırma sonucu:

- **TDV İslam Ansiklopedisi (DİA)** — Türkçe'nin en kapsamlı İslam ansiklopedisi (16.000+ madde, 44 cilt), ücretsiz okunabiliyor ama kullanım şartı açık: *"yazıların bütün olarak yayımlanması yasaktır"*, sadece kısa alıntı + kaynak gösterimi + aktif link ile iktibas serbest. **Bu yüzden metnini sitemizde göstermiyoruz, sadece bağlantı veriyoruz.**
- **Türkçe Vikipedi** — CC BY-SA 4.0, tamamen açık lisans, canlı ve CORS'a açık bir REST API'si var (`tr.wikipedia.org/api/rest_v1/page/summary/...`). **Bu yüzden özetini doğrudan sitemizde, atıfla gösteriyoruz.**

Yeni **`ansiklopedi.html`** sayfası eklendi: bir terim aratıldığında Vikipedi özeti (görsel + metin + "devamını oku" linki) doğrudan gösteriliyor, yanında TDV İslam Ansiklopedisi'nin ilgili maddesine (Türkçe karakter normalizasyonuyla tahmin edilen URL) veya ana sayfasına giden bir kart duruyor. Sayfa, tüm sitenin footer'ına ve ana sayfanın "Konular" ile üst menüsüne bağlandı.

## 2026-09-08 (devam 4): Kaynak seçim ekranı + 2 kaynağı karşılaştırma
Kullanıcı geri bildirimi: "Meal ile Oku / Tefsirle Oku seçildiğinde hangi kaynaktan okumak istediği de sorulmalı, hatta 2 kaynak seçip karşılaştırabilmeli." Buna göre oku.html'e yeni bir ara ekran eklendi:

1. Mod seçilir (Meal / Tefsir / Hatim).
2. **Yeni:** O moda ait kaynaklar bir kart listesi olarak gösterilir (meal modunda 9 meal, tefsir modunda Türkçe/Arapça olarak gruplanmış 6 tefsir). **1 ya da 2 kaynak** seçilebilir — 2 seçilirse "Okumaya başla" sonrası her ayette iki kaynak **yan yana karşılaştırmalı** gösterilir.
3. Okuma ekranında seçili kaynak(lar) üstte bir etiket olarak görünür; "Kaynakları değiştir" ile bu ekrana geri dönülüp seçim değiştirilebilir.

## 2026-09-08 (devam 3): Tüm ücretsiz tefsir kaynakları bulundu, Tefsirle Oku modu tüm Kur'an'a genişletildi
Kullanıcı "aynı şekilde ücretsiz tefsirleri bul" dedi. QUL'ün (qul.tarteel.ai) tüm 122 kaynaklık kataloğu tek tek tarandı: yapılandırılmış/API ile erişilebilir **Türkçe tefsir sayısının gerçekten sadece 3** olduğu doğrulandı (İbn Kesîr, Muhtasar, es-Sa'dî — zaten kullanıyorduk). Bunun üzerine aynı altyapıyla **3 klasik Arapça tefsir** de (Taberî, İbn Kesîr aslı, Kurtubî) "Tefsirle Oku" moduna eklendi — toplam 6 kaynak, hepsi artık Kur'an'ın tamamı için canlı çekiliyor (önceden sadece Fâtiha örneği vardı). Arapça seçildiğinde metin otomatik olarak sağdan sola ve Arapça fontla gösteriliyor.

**Araştırılıp bilinçli olarak eklenmeyenler:** Diyanet'in kendi tefsir API'si var ama kullanım şartı üçüncü taraf geliştiricilere kapalı; Açık Kuran'ın (acikkuran.com) API'si araştırma sırasında erişilemez durumdaydı; Elmalılı'nın tam tefsiri (Hak Dini Kur'an Dili) kamu malı ama sadece taranmış kitap hâlinde var, ayet ayet aranabilir yapıda değil. Detaylar `tefsir-kaynaklari.html` ve `data/README.md`'de.

## 2026-09-08 (devam 2): Çoklu meal seçimi + tam profesyonel Namaz Vakti sayfası
İki büyük araştırma bazlı ekleme daha yapıldı:

**1) Türkiye'de yayınlanan tüm ücretsiz Türkçe mealler bulundu ve eklendi.** Tanzil.net'in çeviri listesi taranarak Diyanet'in yanı sıra **8 meal daha** indirildi ve `data/quran/meals/` altına eklendi: Diyanet Vakfı (Kur'an Yolu), Elmalılı Hamdi Yazır, Süleyman Ateş, Yaşar Nuri Öztürk, Ali Bulaç, Abdulbaki Gölpınarlı, Suat Yıldırım, Edip Yüksel. "Kur'an'ı Oku" sayfasında artık meal/hatim modunda bir açılır menüden istediğiniz meali seçebiliyorsunuz. **⚠️ Önemli lisans notu:** Bu 8 meal Tanzil'in "yalnızca ticari olmayan kullanım" şartıyla geliyor — bkz. `data/README.md`.

**2) "Namaz" sayfası tam bir namaz vakti uygulamasına dönüştürüldü.** Rakip uygulamalar (Ezan Vakti, Namaz Vakti, çeşitli Zikirmatik uygulamaları) referans alınarak araştırıldı, eklenenler:
- **Namaz vakitleri** — konumunuza göre (GPS veya 81 il listesinden seçim), [Al Adhan API](https://aladhan.com) ile Diyanet hesaplama yöntemi (method=13) kullanılarak.
- **Sıradaki vakte canlı geri sayım** ve hicri tarih.
- **Kerahat vakitleri** — sabah, istivâ (öğle) ve ikindi sonrası kerahat pencereleri (Diyanet kaynaklarına göre ~45 dakikalık aralıklarla hesaplanıyor).
- **Kıble bulucu** — büyük daire açısı formülüyle hesaplanan gerçek kıble yönü + mesafe; cihazınızın pusulasına izin verirseniz ok otomatik olarak Kâbe'yi gösterir.
- **Zikirmatik** — Namaz Tesbihatı (33-33-33) modu, serbest sayaç, özel hedef modu; titreşimli, günlük toplamı hatırlıyor.
- **Bildirim ayarları** — her vakit için ayrı aç/kapat, tarayıcı bildirimi. **Dürüst sınır:** bu bildirimler yalnızca sekme açıkken çalışır; gerçek arka plan bildirimi için ileride bir sunucu gerekir.

## Klasör yapısı
```
Kuran OkumaSayfası/
  index.html
  oku.html                (Kur'an'ı Oku — meal/tefsir/hatim seçimli okuyucu)
  peygamberler.html, mucizeler.html, bilim.html, namaz.html, bayramlar.html
  ansiklopedi.html          (İslam terimleri: Vikipedi özeti + TDV İslam Ansiklopedisi bağlantısı)
  ara.html                  (Kur'an içinde metin arama + Arapça kök arama)
  isimler.html              (Kur'an'da Allah'ın isim/sıfatları, ayet referanslı — "99 isim" değil)
  ezberlerim.html           (basit hıfz/ezber tekrar planlayıcı — aralıklı tekrar, AI yok)
  elifba.html               (sıfırdan Kur'an okumaya: harfler, harekeler, sükun, şedde, tenvin, med — 6 ders + alıştırma)
  mealler.html, tefsir-kaynaklari.html, moderasyon.html
  README.md
  manifest.json            (PWA — "ana ekrana ekle" tanımı)
  sw.js                    (service worker — çevrimdışı önbellekleme)
  /assets/css/style.css   (tüm sayfaların ortak tasarımı — açık/koyu tema tanımları da burada)
  /assets/icons            (PWA ikonları, sitenin kendi yıldız marka işaretinden üretildi)
  /data
    README.md            (veri kaynakları ve lisans detayları)
    /quran
      chapters-index.json
      quran-arabic.json    (114 sûre, Arapça)
      quran-turkish.json   (114 sûre, Türkçe meal)
      roots-index.json     (1.651 Arapça kök → geçtiği ayetler)
      gunun-ayeti.json      (küratörlü "Günün Ayeti" listesi)
      isimler.json          (Kur'an'da geçen 25 ilahi isim, ayet referanslı)
      juz-boundaries.json   (30 cüzün sûre:ayet başlangıç noktaları)
    /tafsir
      editions.json        (122 tefsir kaynağının kataloğu)
      /samples              (Fâtiha için 6 kaynaktan örnek tefsir)
    /audio
      alafasy-word-timings.json      (Mişarî Raşid el-Afâsî — 6.236 ayetin tamamı, kelime kelime ses zamanlaması)
      abdulbasit-word-timings.json   (Abdülbâsıt Abdüssamed — aynı kapsamda)
      husary-word-timings.json       (Mahmûd Halîl el-Husarî — aynı kapsamda)
      shuraym-word-timings.json      (Suûd eş-Şüreym — aynı kapsamda)
    /meals
      index.json, ates.json, bulac.json, golpinarli.json, ozturk.json, vakfi.json, yazir.json, yildirim.json, yuksel.json
    /tajweed
      tajweed-hafs.json    (6.236 ayetin tecvid kuralı etiketleri, 112 ayette bilinçli sınırlama var)
    il-koordinatlari.json   (81 il, Namaz Vakti sayfasının il seçimi için)
  namaz.html                (namaz vakti + kerahat + kıble + zikirmatik + bildirim)
  /scripts
    fetch_tafsir.py         (herhangi bir ayet+tefsir kombinasyonunu çeker)
```

## Sırada ne var
- [x] Gerçek Arapça metin + meal verisini bağlamak (quran-json üzerinden)
- [x] Ayrı bir okuma sayfası: meal / tefsir / hatim modu seçimli, Kur'an'ın tamamında çalışan ("oku.html")
- [x] Tefsirle Oku modunu tüm Kur'an'a genişletmek (canlı fetch ile, sadece Fâtiha değil)
- [x] Gerçek kâri sesi + kelime kelime canlı vurgulama (Alafasy, EveryAyah + quran-align)
- [x] Aynı ekranda birden fazla ayet (10'luk sayfalar, otomatik sayfa çevirme)
- [x] 5 konu sayfası (Peygamberler, Mucizeler, Bilim, Namaz, Bayramlar) gerçek ayetlerle
- [x] Kalıcı not defteri (localStorage)
- [x] Diyanet + 8 Tanzil meali arasında seçim ("Kur'an'ı Oku" sayfasında)
- [x] Tam namaz vakti uygulaması: vakitler, kerahat, kıble bulucu, zikirmatik, bildirim (`namaz.html`)
- [x] Bulunabilen tüm ücretsiz tefsir kaynakları (3 Türkçe + 3 Arapça klasik) — hepsi Kur'an'ın tamamında canlı çalışıyor
- [x] Meal/tefsir modunda kaynak seçim ekranı + 2 kaynağı yan yana karşılaştırma
- [x] İslam Ansiklopedisi arama sayfası (Vikipedi canlı + TDV İslam Ansiklopedisi'ne bağlantı)
- [x] Kur'an içinde metin arama + Arapça kök arama (`ara.html`)
- [x] Günün Ayeti widget'ı (ana sayfa, küratörlü liste)
- [x] oku.html'e derin bağlantı desteği (`?sure=X&ayet=Y`)
- [x] Kur'an'da geçen ilahi isimler (99'luk hadis listesi değil, 25 ayet-referanslı isim — `isimler.html`)
- [x] Tecvid (tajweed) renk kodlaması — isteğe bağlı, 6.124 ayette (%98,2) doğrulanmış
- [x] Okuma serisi (streak) takibi
- [x] Çoklu kâri seçimi (Alafasy, Abdülbâsıt, Husarî, Şüreym — "Kur'an'ı Oku" sayfasında ses çubuğundan seçilebiliyor)
- [x] Ayet paylaşım görseli (her ayetin yanındaki 📤 butonu; Canvas ile Arapça+meal+referans içeren bir kart üretiliyor, PNG olarak indirilebiliyor, destekleyen tarayıcılarda panoya da kopyalanabiliyor)
- [x] PWA / çevrimdışı kurulum desteği (`manifest.json` + `sw.js`; "ana ekrana ekle" ile kurulabiliyor, tüm sayfalar + Kur'an'ın Arapça/Türkçe metni ilk ziyarette önbelleğe alınıp internetsiz açılabiliyor, ziyaret edilen diğer veriler — mealler, tefsir, tecvid, kök arama, ses zamanlaması — kendiliğinden önbelleğe ekleniyor)
- [x] Açık/koyu tema seçeneği (nav'daki ☀︎/☾ düğmesi, tüm sayfalarda; tercih `localStorage`'da kalıcı, sayfa yenilendiğinde yanlış temanın anlık görünmesi engellenmiş — ana sayfanın atmosferik "kahraman" bölümü bilinçli olarak her iki temada da koyu kalıyor)
- [x] Cüz (30 cüz) bazlı gezinme + hatim modunda cüz-cüz ilerleme takibi (`data/quran/juz-boundaries.json`; "Kur'an'ı Oku" sayfasında "Cüzler" butonuyla herhangi bir cüze doğrudan atlanabiliyor, Hatim Modu'nda 30 hücrelik bir tamamlanma ızgarası gösteriliyor)
- [x] Okuma ayarları: yazı boyutu (Arapça + Türkçe metin, 4 kademeli, `localStorage`'da kalıcı)
- [x] Basit hıfz (ezber) tekrar planlayıcı — yapay zekâ/ses tanıma OLMADAN, aralıklı tekrar (spaced repetition) prensibiyle çalışan bir hatırlatma sistemi (`ezberlerim.html`); "Kur'an'ı Oku"da bir ayetin yanındaki 🧠 butonuyla eklenip buradan takip ediliyor
- [ ] Hatim modunda günlük hatırlatma/bildirim
- [x] Elif-Bâ öğreticisinin gerçek ders içeriği (`elifba.html` — 28 harf, harekeler, sükun, şedde, tenvin, med harfleri; her ders kısa bir alıştırmayla bitiyor; ileri konular — elif-lâm takısı, med-kasr, hurûf-ı mukattaa — henüz eklenmedi)
- [x] Sadece Dinle modu ("Kur'an'ı Oku"da 4. seçenek — metne bakmadan kâri sesiyle dinleme, isteğe bağlı meal altyazısı; Elmalılı Hamdi Yazır meali dahil 9 meal arasından seçilebiliyor)
- [x] Kelime vurgusu senkronu iyileştirildi (`requestAnimationFrame` ile — tarayıcının `timeupdate` olayı saniyede ~4 kez tetikleniyordu, bu bazen "senkron değil" hissi veriyordu; artık ekranın yenileme hızında, ~60/sn güncelleniyor)
- [x] Türkçe meali sesli okuma (tarayıcının kendi metin-okuma/TTS sesiyle — profesyonel bir seslendirme değil, dürüstçe belirtiliyor; "Meali de sesli oku" kutusu işaretlenince her ayetin Arapça sesinden sonra Türkçe meali de okunuyor, cihazda Türkçe ses yoksa kullanıcıya bildiriliyor)
- [ ] Kelime kelime MEAL verisi — QUL'da 22 dilde var ama **Türkçe yok** (doğrulandı); kendi setimizi üretmek büyük emek ister, şimdilik ertelendi
- [ ] Namaz vakti bildirimleri için gerçek arka plan desteği (şu an sadece sekme açıkken çalışıyor — sunucu gerektirir)
- [ ] Gerçek üyelik sistemi + herkese açık paylaşımlı forum (sunucu/veritabanı gerektirir)
- [ ] Secde ayetleri işaretleme, Kur'an içi tekrarlanan ayetler/çapraz referans (2026-09 rakip araştırmasında bulundu, kendi verimizden üretilebilir, henüz yapılmadı)

## Lisans / kaynak notu
- **Kur'an metni + Türkçe meal:** [risan/quran-json](https://github.com/risan/quran-json) üzerinden (Arapça aslı QuranEnc.com, harf çevirisi Tanzil.net, meal Diyanet kaynaklı) — **CC BY-SA 4.0**. Atıf zorunlu; bu veriyle oluşturulan türev (yani bu sitenin kendisi) de aynı CC BY-SA 4.0 lisansıyla paylaşılmalıdır — projeyi kapalı/özel tutamazsınız.
- **Tefsir örnekleri:** [spa5k/tafsir_api](https://github.com/spa5k/tafsir_api) (qul.tarteel.ai) — katalog MIT lisanslı ama her tefsirin metni kendi orijinal kaynağının telif durumuna tabidir. Klasik Arapça tefsirler (İbn Kesir, Taberî, Kurtubî) kamu malı; Türkçe çeviriler atıfla serbest dağıtım amaçlı yayınlanmış.
- **Ses (kâri):** [EveryAyah.com](https://everyayah.com) CDN'inden doğrudan linkleniyor, kendi sunucumuzda barındırılmıyor. 4 kâri seçeneği var: Mişarî Raşid el-Afâsî, Abdülbâsıt Abdüssamed, Mahmûd Halîl el-Husarî, Suûd eş-Şüreym.
- **Kelime zamanlaması:** [cpfair/quran-align](https://github.com/cpfair/quran-align) — CC BY 4.0, atıf yeterli.
- **8 ek meal (Vakfı, Yazır, Ateş, Öztürk, Bulaç, Gölpınarlı, Yıldırım, Yüksel):** [Tanzil.net](https://tanzil.net/trans/) — **⚠️ SADECE TİCARİ OLMAYAN KULLANIM**, 3'ten fazla çeviri kullanıldığı için Tanzil'e link zorunlu (footer'da mevcut). Detay ve önemli notlar için `data/README.md`.
- **Namaz vakitleri:** [Al Adhan API](https://aladhan.com) — Diyanet İşleri Başkanlığı hesaplama yöntemi (method=13) ile.
- **İl koordinatları:** [açık kaynak il/ilçe veri seti](https://gist.github.com/ismailbaskin/2492196).
- **Ansiklopedi özetleri:** [Türkçe Vikipedi](https://tr.wikipedia.org) — CC BY-SA 4.0, canlı API ile.
- **Derinlemesine ansiklopedi:** [TDV İslam Ansiklopedisi](https://islamansiklopedisi.org.tr) — telif hakları TDV İslam Araştırmaları Merkezi'ne aittir; **metnini yayınlamıyoruz, sadece bağlantı veriyoruz** (kullanım şartları tam metin yayınını yasaklıyor).
- **Kök verisi:** [Quranic Arabic Corpus](http://corpus.quran.com) — GNU (GPL), atıf ve corpus.quran.com'a link zorunlu.
- **Tecvid verisi:** [cpfair/quran-tajweed](https://github.com/cpfair/quran-tajweed) — CC BY 4.0, atıf yeterli.

Detaylı bilgi için `data/README.md` dosyasına bakın.
