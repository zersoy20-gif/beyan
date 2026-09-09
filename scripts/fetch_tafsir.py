"""
Tek bir ayetin istediğiniz tefsir kaynağından metnini çeker.
Kaynak: spa5k/tafsir_api (GitHub) - her tefsirin lisansı kendi kaynağına aittir,
tam liste ve kaynaklar için data/tafsir/editions.json dosyasına bakın.

Kullanım:
    python3 fetch_tafsir.py <edition-slug> <sure-no> <ayet-no>

Örnek:
    python3 fetch_tafsir.py tr-tafsir-ibne-kathir 2 255
    (Bakara sûresi, Ayete'l-Kürsî için İbn Kesir tefsiri)

Türkçe tefsir kaynakları (editions.json içinde language_name == "turkish"):
    - tr-tafsir-ibne-kathir              (Tefsir İbn Kesir)
    - turkish-mokhtasar                  (Muhtasar Tefsir)
    - turkish-tafsir-as-saadi-turkish    (Tefsir es-Sa'di)

Not: Bu script tek tek ayet çeker (6236 ayet x 122 tefsiri toptan indirmek
gereksiz yer kaplar). Sitenizde bir ayet açıldığında ihtiyaç anında
(on-demand) çağırıp önbelleğe almanız (cache) daha doğru bir mimaridir.
"""
import sys
import json
import urllib.request

BASE_URL = "https://raw.githubusercontent.com/spa5k/tafsir_api/main/tafsir"


def fetch_tafsir(edition: str, surah: int, ayah: int) -> dict:
    url = f"{BASE_URL}/{edition}/{surah}/{ayah}.json"
    with urllib.request.urlopen(url, timeout=10) as response:
        data = json.loads(response.read().decode("utf-8"))
    return data


if __name__ == "__main__":
    if len(sys.argv) != 4:
        print(__doc__)
        sys.exit(1)

    edition_arg, surah_arg, ayah_arg = sys.argv[1], int(sys.argv[2]), int(sys.argv[3])
    result = fetch_tafsir(edition_arg, surah_arg, ayah_arg)
    print(json.dumps(result, ensure_ascii=False, indent=2))
