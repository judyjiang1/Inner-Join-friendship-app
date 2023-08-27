"""Scraping a website to get a list of Fortune 100 companies."""

import requests
from bs4 import BeautifulSoup


url = "https://finasko.com/fortune-100-companies/"
response = requests.get(url)
data = BeautifulSoup(response.content, "html.parser")

table = data.find("figure", class_="wp-block-table is-style-stripes")
rows = table.find_all("tr")

def get_companies():
    companies = []
    for i in range(1, len(rows)):
        name = (rows[i].find("td").get_text()).split(' ')
        companies.append(' '.join(name[1:]))
   
    output_file = "category.py"
    with open(output_file, "a") as output_file:
        output_file.write(f"companies = {companies}\n\n")

    print(f"Fortune 100 list saved to '{output_file}'.")


get_companies()
