# Veri Kaynakları

Bu klasördeki tüm veriler gerçek, açık kaynaklardan çekilmiştir (uydurma/örnek veri değildir).

## `/quran/quran-arabic.json` ve `/quran/quran-turkish.json`

- **Kaynak proje (Arapça metin):** [risan/quran-json](https://github.com/risan/quran-json) (GitHub)
- **Arapça metin aslı:** The Noble Qur'an Encyclopedia (quranenc.com)
- **Harf çevirisi (transliteration):** Tanzil.net
- **Lisans (Arapça metin):** Creative Commons Attribution-ShareAlike 4.0 (CC BY-SA 4.0)
  - Atıf zorunlu (kaynağı belirtmeniz gerekir).
  - **ShareAlike şartı önemli:** Bu veriyi kullanarak oluşturduğunuz türev de aynı CC BY-SA 4.0 lisansıyla paylaşılmalıdır. Yani veri setinizi/derlemenizi kapalı/özel tutamazsınız — bu, projenizin zaten "ücretsiz ve açık" ruhuyla uyumlu.
- **İçerik:** 114 sûre, 6.236 ayetin tamamı, hem Arapça hem Türkçe.

### ⚠️ Türkçe meal alanı — 10 Eylül 2026 tarihli düzeltme (önemli)

`quran-turkish.json` içindeki `translation` alanı **artık quran-json projesinden gelmiyor.**
Önceki hal, kaynağı doğrulanmadan "Diyanet kaynaklı" diye etiketlenmişti; yapılan tam veri
denetiminde şu bulundu:

1. Metin, bilinen hiçbir yayınlanmış Diyanet mealiyle (ne Diyanet İşleri Başkanlığı'nın kendi
   meali ne de Diyanet Vakfı/Kur'an Yolu) birebir örtüşmüyordu — gerçek kaynağı belirsizdi.
2. Çok daha ciddisi: **6.236 ayetin 1.413'ünde (%22,7), 114 sûrenin 96'sında**, art arda gelen
   ayetlerin çevirisi birbirine karışmış/tekrarlanmış durumdaydı. En uç örnek: Nâs sûresinin
   (114) 6 ayetinin **tamamı**, sûrenin tümünü kapsayan tek ve aynı paragrafı gösteriyordu.

**Yapılan düzeltme:** `quran-turkish.json`'daki her ayetin `translation` alanı, aşağıda anlatılan
`meals/vakfi.json` (gerçek ve doğrulanmış Diyanet Vakfı — Kur'an Yolu meali, Tanzil.net kaynaklı)
içeriğiyle **birebir, ayet numarası eşleştirilerek** yeniden yazıldı. Değişiklikten önce iki
dosyanın da aynı 114 sûre / 6.236 ayet yapısına sahip olduğu ve `vakfi.json`'ın kendi doğal
tekrar oranının (yalnızca ~20/6.236 ≈ %0,3, elle örneklenip makul bulundu) bu tür bir bozulma
taşımadığı doğrulandı.

**Lisans sonucu (önemli değişiklik):** Bu değişiklikle birlikte `quran-turkish.json`'daki meal
metni artık CC BY-SA 4.0 ile değil, aşağıdaki `/quran/meals/*.json` bölümünde açıklanan
**Tanzil.net'in "yalnızca ticari olmayan kullanım" şartına** tabidir — çünkü asıl kaynağı odur.
Arapça metin (`quran-arabic.json` ve `quran-turkish.json`'daki `text` alanı) bundan etkilenmedi,
CC BY-SA 4.0 olarak kalmaya devam ediyor.

## `/tafsir/editions.json`

- **Kaynak proje:** [spa5k/tafsir_api](https://github.com/spa5k/tafsir_api) (GitHub)
- **İçerik:** 122 tefsir kaynağının tam kataloğu (id, isim, dil, slug, orijinal kaynak linki).
- **ÖNEMLİ:** Bu katalog dosyasının kendisi MIT lisanslı bir kod projesinden geliyor, ama **her tefsirin metni kendi orijinal kaynağının telif durumuna tabidir** — "MIT lisanslı" demek "tefsir metni telifsiz" demek değildir.
  - Klasik Arapça tefsirler (İbn Kesir, Taberi, Kurtubi gibi) — yazarları asırlar önce vefat ettiği için **kamu malı**, sorunsuz kullanılabilir.
  - Türkçe tefsirler (turkish-mokhtasar, tr-tafsir-ibne-kathir, turkish-tafsir-as-saadi-turkish) — modern çeviri kuruluşlarınca (Rowwad/Muhtasar Tefsir Merkezi gibi) hazırlanmış, atıf ile serbest dağıtım amaçlı yayınlanmıştır.

## `/tafsir/samples/`

Fâtiha sûresinin 7 ayeti için 6 farklı tefsir kaynağından örnek veri buradadır (ilk kod denemeleri için kullanıldı):

| Klasör | Tefsir | Dil |
|---|---|---|
| `tr-tafsir-ibne-kathir/` | Tefsir İbn Kesir | Türkçe |
| `turkish-mokhtasar/` | Muhtasar Tefsir | Türkçe |
| `turkish-tafsir-as-saadi-turkish/` | Tefsir es-Sa'di | Türkçe |
| `ar-tafsir-ibn-kathir/` | Tefsir İbn Kesir | Arapça |
| `ar-tafsir-al-tabari/` | Taberî Tefsiri | Arapça |
| `ar-tafseer-al-qurtubi/` | Kurtubî Tefsiri | Arapça |

**Güncelleme:** Bu 6 kaynağın tamamı artık `oku.html`'in "Tefsirle Oku" modunda **Kur'an'ın tamamı için canlı olarak** çekiliyor (yalnızca Fâtiha örneği değil) — bkz. aşağıdaki `fetch_tafsir.py` yöntemiyle aynı mantık, tarayıcıdan doğrudan. Türkçe tefsir için QUL'ün tüm kataloğu tarandı; bu 3 kaynak (İbn Kesir, Muhtasar, es-Sa'di) şu an açık/yapılandırılmış olarak bulunan **tek** Türkçe tefsirlerdir — daha fazlası araştırıldı ama bulunamadı (bkz. `tefsir-kaynaklari.html` sayfasındaki "araştırılıp eklenmeyen kaynaklar" notu).

Kalan 116 tefsir kaynağı (çoğunlukla Arapça/İngilizce/diğer diller) için toptan indirme **yapılmamıştır** —
bu, gereksiz yere gigabaytlarca veri taşımak anlamına gelirdi. Bunun yerine:

```bash
python3 scripts/fetch_tafsir.py <edition-slug> <sure-no> <ayet-no>
```

komutuyla istediğiniz herhangi bir ayet+tefsir kombinasyonunu anında çekebilirsiniz.
Gerçek üründe bu çağrı, kullanıcı bir ayeti açtığı anda (on-demand) yapılıp
sonucun önbelleğe (cache) alınması şeklinde kurgulanmalı.

## `/audio/*-word-timings.json` (4 kâri)

- **Kaynak proje:** [cpfair/quran-align](https://github.com/cpfair/quran-align) (GitHub, "Release 2016-11-24")
- **İçerik:** Her dosya, ilgili kârinin okuyuşu için **6.236 ayetin tamamında** kelime kelime zaman damgası (`[kelime_no, kelime_no, başlangıç_ms, bitiş_ms]`). Sitedeki `quran-arabic.json`'daki ayet metninin boşlukla ayrılmış kelime sırasıyla bire bir örtüştüğü her dosya için ayrı ayrı doğrulandı (1:1, 2:255, 2:282 — Kur'an'ın en uzun ayeti — ve son ayet 114:6 dahil).

| Dosya | Kâri | EveryAyah klasörü |
|---|---|---|
| `alafasy-word-timings.json` | Mişarî Raşid el-Afâsî | `Alafasy_128kbps` |
| `abdulbasit-word-timings.json` | Abdülbâsıt Abdüssamed (Murattal) | `Abdul_Basit_Murattal_64kbps` |
| `husary-word-timings.json` | Mahmûd Halîl el-Husarî | `Husary_64kbps` |
| `shuraym-word-timings.json` | Suûd eş-Şüreym | `Saood_ash-Shuraym_128kbps` |

- **Lisans:** Creative Commons Attribution 4.0 (CC BY 4.0) — atıf yeterli, ShareAlike şartı yok. Bkz. `LICENSE-quran-align.txt`.
- **Ses dosyalarının kendisi bu klasörde YOK** — [EveryAyah.com](https://everyayah.com) CDN'inden doğrudan linkleniyor (`https://everyayah.com/data/{klasör}/{sss}{aaa}.mp3`, sûre+ayet 3'er haneli sıfırla dolgulu). Kendi sunucumuza indirip barındırmıyoruz; tarayıcı doğrudan EveryAyah'tan çalıyor. "Kur'an'ı Oku" sayfasında yalnızca o an seçili kârinin zamanlama dosyası indiriliyor (ihtiyaç anında/lazy-load), diğerleri kullanıcı o kâriyi seçene kadar hiç çekilmiyor.
- **⚠️ Denenip elenen kâri — Abdurrahman es-Sudeys:** quran-align'ın 2016 sürümündeki `Abdurrahmaan_As-Sudais_192kbps.json` dosyası bozuk çıktı: JSON içeriğinin başında bir program çökme (crash) günlüğü metni var (`"Crashed Command '['./align', ...'"`) ve dosya 114. sûreyi hiç içermeden, 113:5'te eksik bitiyor. Zip'ten yeniden çıkarma denendi, aynı bozuk veri geldi — yani hata yerel değil, kaynağın kendisinde. Bu yüzden Sudeys eklenmedi; yerine (aynı yöntemle tam doğrulanan) Suûd eş-Şüreym eklendi.

## `/quran/meals/*.json`

Diyanet dışında **8 farklı Türkçe meal** — her biri `{"sûre:ayet": "metin"}` şeklinde düz bir JSON, "Kur'an'ı Oku" sayfasında meal kaynağı seçilince ihtiyaç anında indirilir (hepsi baştan yüklenmez).

| Dosya | Meal | Yazar |
|---|---|---|
| `vakfi.json` | Kur'an Yolu | Diyanet Vakfı |
| `yazir.json` | Hak Dini Kur'an Dili (sadeleştirilmiş) | Elmalılı Hamdi Yazır |
| `ates.json` | Kur'an-ı Kerim ve Yüce Meali | Süleyman Ateş |
| `ozturk.json` | Kur'an-ı Kerim Meali | Yaşar Nuri Öztürk |
| `bulac.json` | Kur'an-ı Kerim ve Türkçe Anlamı | Ali Bulaç |
| `golpinarli.json` | Kur'an-ı Kerim ve Meali | Abdulbaki Gölpınarlı |
| `yildirim.json` | Kur'an-ı Hakîm ve Açıklamalı Meali | Suat Yıldırım |
| `yuksel.json` | Mesaj: Kuran Çevirisi | Edip Yüksel |

- **Kaynak:** [Tanzil.net çeviriler sayfası](https://tanzil.net/trans/) — her biri 6.236 ayetin tamamını kapsıyor, indirilip doğrulandı.
- **⚠️ LİSANS UYARISI — SADECE TİCARİ OLMAYAN KULLANIM:** Tanzil'in kendi ifadesiyle *"The translations provided at this page are for non-commercial purposes only."* Yani bu 8 meal, sitenizde reklam/ücretli üyelik gibi ticari bir model olursa kullanılamaz. Sitenin şu anki "ücretsiz, bağış temelli" modeli buna uygun görünüyor, ama ileride ticarileşme düşünülürse bu meallerin ya kaldırılması ya da doğrudan çevirmen/yayıncıdan izin alınması gerekir.
- **Ek şart:** Üçten fazla çeviri kullanıldığı için (8 tanesini kullanıyoruz) Tanzil'e geri link vermek zorunludur — footer'da bu link mevcut.
- **Not (Edip Yüksel):** Bu meal, klasik Sünni tefsir çizgisinden belirgin şekilde ayrılan, tartışmalı bir yorum çizgisini (bazı ayetlerin metin bütünlüğüne dair iddialar dahil) yansıtır. Tanzil onu editoryal onay vermeden, tarafsız bir kaynak listesi olarak barındırıyor; biz de aynı şekilde nötr sunuyoruz. İsterseniz kolayca listeden çıkarılabilir.
- `vakfi.json` (Diyanet Vakfı — Kur'an Yolu) burada listelenen 8 alternatif mealin dışındadır çünkü aynı zamanda `/quran/quran-turkish.json`'ın **varsayılan** meali olarak da gömülüdür (bkz. yukarıdaki "10 Eylül 2026 tarihli düzeltme" notu) — iki yerde de birebir aynı, Tanzil.net kaynaklı metin kullanılır.

## `/il-koordinatlari.json`

- **İçerik:** Türkiye'nin 81 ilinin plaka kodu, adı, enlem/boylam bilgisi — "Namaz Vakti" sayfasında konum izni verilmediğinde il seçimi için kullanılır.
- **Kaynak:** [Açık kaynak il/ilçe koordinat veri seti](https://gist.github.com/ismailbaskin/2492196) (Google Maps/Başarsoft kaynaklı, halka açık paylaşılmış).

## `/quran/roots-index.json`

- **Kaynak proje:** [Quranic Arabic Corpus](http://corpus.quran.com) v0.4 — [mustafa0x/quran-morphology](https://github.com/mustafa0x/quran-morphology) (GitHub) üzerinden, e-posta gerektiren resmi indirme sayfası yerine doğrudan erişilebilen bu türev kullanıldı.
- **İçerik:** Kur'an'daki her kelimenin Arapça kökü (jazr) — **1.651 benzersiz kök**, her biri geçtiği tüm ayetlerin listesiyle (`{"kök": [[sûre, ayet], ...]}`). "Kur'an'da Ara" sayfasının "Kök Ara" sekmesinde kullanılıyor.
- **Doğrulama:** Bilinen kök sıklıklarıyla karşılaştırıldı (صلو/namaz→90, رحم/rahmet→313, حمد/hamd→66 gibi) — hepsi tutarlı çıktı.
- **Lisans:** GNU (GPL) — atıf zorunlu ve corpus.quran.com'a link verilmesi şart; her ikisi de footer'da mevcut.

## `/quran/gunun-ayeti.json`

Ana sayfadaki "Günlük Bülten"in "Günün Ayeti" kartı için **27 elle seçilmiş, bağlamından kopuk olmayan** ayet (Bakara 286, İhlas sûresi tamamı, Asr sûresi tamamı, Ayetel Kürsî'nin bir kısmı vb.). Rastgele 6236 ayetten seçmek yerine küratörlü liste kullanıldı çünkü pek çok ayet (örn. bir öncekine bağlı zamir/bağlaç) tek başına anlamsız kalıyor.

- **`not` alanı (2026-09-10 eklendi):** Her kayda, ayetin doğrudan içeriğine dayanan, 2-3 cümlelik kısa bir düşündürücü not eklendi. Bu notlar **yorum/tefekkür** niteliğindedir — tartışmalı fıkhî/itikadî hüküm içermez, doğrulanamayan bir tarihsel iddiada (esbâb-ı nüzul gibi) bulunmaz; bir yerde bir söz birine atfedildiyse ("İmam Şâfiî'ye atfedilen bir söze göre" gibi) bu açıkça belirtilir, kesin bir alıntı olarak sunulmaz.

## `/quran/isimler.json`

Kullanıcıya "Esma-ül Hüsna eklensin mi?" diye soruldu; cevap "farklı bir şekilde ekle" oldu. Geleneksel 99'luk liste bir hadisten derlendiği için eklenmedi; bunun yerine Kur'an'da **doğrudan** geçen 25 isim/sıfat, her biri gerçek bir ayet referansıyla derlendi (çoğu Haşr 59:22-24'ten — bizzat "en güzel isimler O'nundur" diyen ayetlerden). "99" iddiası yoktur, kapalı bir liste değildir.

## `/tajweed/tajweed-hafs.json`

- **Kaynak proje:** [cpfair/quran-tajweed](https://github.com/cpfair/quran-tajweed) — CC BY 4.0.
- **İçerik:** 6.236 ayetin tamamı için tecvid kuralı etiketleri (kalkale, idgam, ihfâ, iklab, med çeşitleri, gunne, vasıl hemzesi/şemsî lâm gibi 18 kural), karakter aralığı olarak. "Kur'an'ı Oku" sayfasında isteğe bağlı bir anahtarla (varsayılan kapalı) Arapça metni renklendirmek için kullanılıyor.
- **⚠️ ÖNEMLİ VERİ KALİTESİ NOTU:** Bu verinin kaynağı, Fâtiha ve Tevbe hariç **her sûrenin 1. ayetine besmeleyi de dahil ederek** karakter ofseti hesaplıyor; bizim `quran-arabic.json`'ımızda ise besmele ayrı tutuluyor. Bu, **112 ayette** (her sûrenin ilk ayeti) sistematik bir kayma yaratıyor — tek tek doğrulandı (bkz. altta). Bu 112 ayet için tecvid rengi **bilerek gösterilmiyor** (yanlış harfi renklendirmemek için); geri kalan 6.124 ayette (%98,2) karakter karakter doğrulandı ve tam uyumlu.
  - Doğrulama yöntemi: her ayetin son karakterinin, kendi metnimizin uzunluğunu aşıp aşmadığı kontrol edildi. Ayet≠1 için SIFIR uyumsuzluk bulundu; ayet=1 için tam olarak beklenen 112 sûrede (Fâtiha ve Tevbe hariç tümü) uyumsuzluk çıktı — rastgele değil, sistematik ve açıklanabilir bir kalıp.

## `/elifba/harfler.json`

- **İçerik:** Arap alfabesinin (Kur'an'da kullanılan hâliyle) 28 harfi, sırasıyla — her biri `{"ar": "<harf>", "name": "<Türkçe isim>", "kalin": true/false}` şeklinde. `elifba.html` sayfasının "1. Harfler" dersinde kullanılıyor.
- **Kaynak ve doğrulama:** Bu, telif konusu olmayan, standart/evrensel bir alfabe listesidir (herhangi bir "Latin alfabesi 29 harftir" bilgisi gibi). Sıralama ve isimlendirme, Diyanet'in ve geleneksel Türkçe Kur'an kurslarının kullandığı yaygın adlandırmayla eşleştirildi. "Kalın" (tefhim) harf listesi — Hı, Sâd, Dâd, Tı, Zı, Ğayn, Kaf (7 harf) — bağımsız bir kaynaktan (tecvid kaynakları, "خُصَّ ضَغْطٍ قِظْ" ezber cümlesi) doğrulandı.

## `/quran/juz-boundaries.json`

- **İçerik:** Kur'an'ın 30 cüze bölünmesi — her cüzün başladığı sûre:ayet noktası (`{"juz":N,"surah":X,"ayah":Y}`, 30 kayıt). "Kur'an'ı Oku" sayfasındaki cüz seçici ve Hatim Modu'ndaki cüz-cüz ilerleme ızgarası için kullanılıyor.
- **Kaynak ve doğrulama:** Tek bir kaynağa körü körüne güvenmek yerine iki bağımsız yöntemle çapraz doğrulandı: (1) Wikipedia'nın Juz' maddesindeki tablo ilk denemede çekildi ama **hatalı çıktı** (ör. 30. cüzü yanlışlıkla Kehf 18:75'te başlatıyordu — oysa doğrusu En-Nebe 78:1'dir; bu, sayfa özetleyicisinin tablo sütunlarını karıştırmasından kaynaklanan bir hataydı, kullanılmadı). (2) Bunun yerine [api.alquran.cloud](https://alquran.cloud) (Aladhan'ı da işleten Islamic Network projesi — sitede zaten namaz vakti için kullanılıyor ve güveniliyor) üzerinden **ayet ayet** cüz numarası içeren tam Kur'an verisi çekildi, 6.236 ayetin tamamı üzerinde cüz numarasının hep artan (monoton) olduğu ve toplamın tam 6.236'ya eşit olduğu programatik olarak doğrulandı, ardından her cüzün İLK ayeti bu veriden çıkarılıp `juz-boundaries.json`'a yazıldı. Sonuç, bilinen referans noktalarıyla (1. cüz→Fâtiha 1:1, 16. cüz→Kehf 18:75, 30. cüz/Amme cüzü→En-Nebe 78:1) birebir eşleşti.
- **Lisans notu:** Bu, standart Osmanlı/Hafs mushafının nesnel yapısal bilgisidir (bir kitabın "5. bölüm 120. sayfada başlıyor" demesi gibi, telif konusu olan yaratıcı bir içerik değildir) — yine de temkinli davranıldı, tek kaynağa güvenilmeyip iki bağımsız yöntemle doğrulandı.

## `/haberler.json` (2026-09-10 eklendi)

**"İslam Dünyasından" (`haberler.html`) sayfasının veri kaynağı.** Kullanıcı, hem yasal/telif açısından güvenli hem de "siyasetten tamamen uzak" bir haber altyapısı istedi ve şu araştırılmış öneriyi paylaştı: Google News RSS + RSS.app/FreshRSS gibi araçlarla kategori bazlı otomatik akışlar toplanıp bir moderatör tarafından elle onaylanan yarı-otomatik bir sistem.

**Mimari karar — canlı/otomatik RSS entegrasyonu KULLANILMADI, bilinçli olarak:**
1. **Teknik engel:** Bu site tamamen statik (backend yok, build adımı yok). Google News RSS ve önerilen kurumsal "Press/News" sayfalarının neredeyse hiçbiri CORS başlığı (`Access-Control-Allow-Origin`) döndürmüyor — yani tarayıcıdan doğrudan `fetch()` ile çekilemiyor (bu sitenin kullandığı Tanzil/Aladhan/Wikipedia REST/raw.githubusercontent.com gibi kaynakların hepsi CORS'a özellikle AÇIK olduğu için seçilmişti — Google News RSS bu listede değil). Üçüncü taraf bir "CORS proxy" kullanmak hem kırılgan/güvenilmez hem de kaynağı belirsiz/denetlenemeyen içerik demek.
2. **Daha önemlisi — kullanıcının kendi "siyasetten kaçının" ilkesi:** "İslam dünyası" anahtar kelimesiyle otomatik bir haber araması, öngörülemez şekilde çatışma/siyaset/mezhep tartışması içeren sonuçlar getirebilir (Google News'in kendi algoritması gündeme göre değişir, önceden filtrelenemez). Kullanıcının kendi önerisindeki "⚠️ En önemli mimari karar: tam otomasyon önerilmez" notu da bunu zaten doğruluyordu.

**Seçilen yöntem — elle derlenmiş, doğrulanmış, statik JSON** (tıpkı `gunun-ayeti.json`/`peygamberler.json` gibi): Her haber, WebSearch + WebFetch ile GERÇEK kaynağından bulunup doğrulandı (tarih, rakamlar, isimler orijinal habere karşı çapraz kontrol edildi — hiçbiri uydurulmadı). Savaş/siyaset/mezhep tartışması/güncel çekişme içeren HİÇBİR şey bilerek dahil edilmedi (ör. bir sergi haberinin "modern dönem güç mücadeleleri" bahsi olan bir bölümü esas alınmadı, tamamen çıkarıldı; Filistin gibi hassas bölge adları haber özetlerinde bilinçli olarak öne çıkarılmadı). 8 kategori, 12 haber ile başlatıldı (`son_guncelleme` alanı en son ne zaman elden geçirildiğini gösterir).

**Şema:** `{"son_guncelleme":"YYYY-MM-DD", "kategoriler":[{id,ad,ikon}], "haberler":[{id,kategori,baslik,ozet,tarih,kaynak_adi,kaynak_url}]}`.

**Nasıl güncellenir (ileride, kullanıcı ya da yeni bir oturum için):** Her ~1-2 ayda bir, yukarıdaki kategorilerden her biri için WebSearch ile güncel/gerçek bir haber bulunur, WebFetch ile kaynağının kendisinden tarih/rakam/isim doğrulanır (arama motorunun özetine güvenilmez), savaş/siyaset/tartışma içermediğinden emin olunur, `haberler` dizisine yeni bir kayıt eklenir (çok eski/alakasız olanlar silinebilir) ve `son_guncelleme` bugünün tarihine çekilir. Otomatik bir cron/script YOKTUR — bu bilinçli bir tercih (yukarıdaki mimari karara bkz.).

## Sırada ne var

- [x] Kelime senkron ses vurgulama (bkz. `/audio/alafasy-word-timings.json`) — "Kur'an'ı Oku" sayfasında canlı çalışıyor
- [x] Çoklu Türkçe meal seçimi (Diyanet + 8 Tanzil meali) — "Kur'an'ı Oku" sayfasında meal/hatim modunda seçilebiliyor
- [x] Namaz vakti + kıble + zikirmatik + bildirim araçları (bkz. `namaz.html`) — Aladhan API (Diyanet yöntemi, method=13)
- [x] Kur'an içinde metin arama + Arapça kök arama (bkz. `ara.html`)
- [x] Günün Ayeti widget'ı (ana sayfa)
- [ ] Kelime kelime (word-by-word) MEAL verisi (her kelimenin Türkçe karşılığı) — QUL (qul.tarteel.ai) üzerinden indirilmeli; şu an sadece ses zamanlaması ve kök verisi var, kelimenin Türkçe anlamı yok
- [x] Çoklu kâri seçenekleri — Alafasy, Abdülbâsıt, Husarî, Şüreym eklendi (bkz. yukarıdaki `/audio/*-word-timings.json` notu). quran-align'ın Release 2016-11-24'ünde birkaç kâri daha var (Minşâvî, Ecmi vb.), aynı yöntemle eklenebilir; Sudeys ise veri bozukluğu nedeniyle bilerek dışarıda bırakıldı
- [x] Kur'an'da geçen ilahi isimler — `isimler.json` (bkz. yukarıdaki not; 99'luk hadis listesi değil)
- [x] Tecvid renk kodlaması — `tajweed-hafs.json` (bkz. yukarıdaki not; 112 ayette bilinçli olarak devre dışı)
- [x] Okuma serisi (streak) takibi — "Kur'an'ı Oku" sayfasında (localStorage)
- [x] Cüz (30 cüz) bazlı gezinme + hatim modunda cüz-cüz ilerleme — `juz-boundaries.json` (bkz. yukarıdaki not)
- [x] Basit hıfz (ezber) tekrar planlayıcı — `ezberlerim.html`, yapay zekâ/ses tanıma olmadan aralıklı tekrar (spaced repetition) prensibiyle; veri tamamen `localStorage`'da (`beyan-hifz-v1`), yeni bir dış veri kaynağı gerektirmedi
