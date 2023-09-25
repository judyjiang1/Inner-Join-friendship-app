"""Scraping a website to get a list of high schools."""

import requests
from bs4 import BeautifulSoup
import re


url = "https://cogitoworldeducation.org/best-high-schools-in-the-us/"
response = requests.get(url)
soup = BeautifulSoup(response.content, "html.parser")

schools = soup.find_all("h3", class_="card-long__title")

high_schools = []
for school in schools:
    name = school.text
    high_schools.append(name)


output_file = "category.py"
new_output = f"high_schools = {high_schools}\n\n"

# if the list is already in category.py then replace it, otherwise append it
existing_content = ""
try:
    with open(output_file, "r") as file:
        existing_content = file.read()
except FileNotFoundError:
    pass  


if "high_schools =" in existing_content:
    updated_content = existing_content.replace(
        re.search(r"high_schools = .*?\n\n", existing_content).group(0), new_output
    )
else:
    updated_content = existing_content + new_output

with open(output_file, "w") as file:
    file.write(updated_content)

print(f"High school list saved to '{output_file}'.")