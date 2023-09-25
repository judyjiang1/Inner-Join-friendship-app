"""Get mock user data using Mockaroo API."""

import requests, os, json

api_key = os.environ["MOCKAROO_KEY"]
url = f"https://my.api.mockaroo.com/project_data.json?key={api_key}"


def get_user_info(url):

    response = requests.get(url)

    if response.status_code == 200:
        api_data = response.json()
        
    
        file_name = "user_data.json"

        with open(file_name, "w") as file:
            json.dump(api_data, file, indent=4)
        
        print(f"Data exported to {file_name}")

    else:
        print("API request failed with status code:", response.status_code)


get_user_info(url)

