from geopy.geocoders import Nominatim
import json
import random



with open('city.json', 'r') as json_file:
    city_data = json.load(json_file)

geolocator = Nominatim(user_agent="my_geocoder")

coordinate_with_city = []
coordinates = []

for city_info in city_data:
    city_name = city_info["city"]
    state_name = city_info["state"]
    location_str = f"{city_name}, {state_name}"

    location = geolocator.geocode(location_str)
    if location:
        coordinate_with_city.append({
            "city": city_name,
            "state": state_name,
            "latitude": location.latitude,
            "longitude": location.longitude
        })
        coordinates.append((location.latitude, location.longitude))
print(coordinates)

# for coord in coordinates:
#     print(f"City: {coord['city']}, State: {coord['state']}, Latitude: {coord['latitude']}, Longitude: {coord['longitude']}")


# add coordinates to user data 
file_path = "data.json"

with open(file_path, "r") as json_file:
    json_data = json.load(json_file)

def assign_coordinates(users, coordinates):
    for user in users:
        user['coordinate'] = tuple(random.choice(coordinates))

assign_coordinates(json_data, coordinates)

with open(file_path, "w") as json_file:
    json.dump(json_data, json_file, indent=4)