"""Scraping a website to get a list of colleges."""

import requests
from bs4 import BeautifulSoup


url = "https://www.collegefactual.com/rankings/best-colleges/"
response = requests.get(url)
data = BeautifulSoup(response.content, "html.parser")

college_element = data.find_all("a", class_="rankListHeaderText")

colleges = []
for college in college_element:
    name = college.text
    colleges.append(name)

output_file = "category.py"
with open(output_file, "a") as output_file:
    output_file.write(f"colleges = {colleges}\n\n")

print(f"College list saved to '{output_file}'.")




