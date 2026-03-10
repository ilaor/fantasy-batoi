import json
import unicodedata
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options


def limpiar(texto):
    texto = unicodedata.normalize("NFKD", texto)
    texto = texto.encode("ascii", "ignore").decode("utf-8")
    return texto.lower().strip()


def run():

    chrome_options = Options()
    chrome_options.add_argument("--headless=new")

    driver = webdriver.Chrome(
        service=Service("/usr/local/bin/chromedriver"),
        options=chrome_options
    )

    data = {}

    try:

        print("Abriendo web...")

        driver.get("https://www.laligafantasy.com")

        # EJEMPLO DE DATOS (para probar la app)
        data = {
            limpiar("Vini Jr."): 12,
            limpiar("Raphinha"): 15,
            limpiar("David Soria"): 8,
            limpiar("Rüdiger"): 7,
            limpiar("Eric García"): 6
        }

    except Exception as e:

        print("Error scraper:", e)

    finally:

        driver.quit()

    if not data:
        data = {}

    with open("src/puntos.json", "w") as f:
        json.dump(data, f, indent=4)

    print("puntos.json actualizado")


if __name__ == "__main__":
    run()