# InnerJoin - Hackbright Capstone Project

## Overview

InnerJoin is an innovative social web application built upon the principles of the Similarity Attraction Theory, a social psychological concept that explains how people are naturally drawn to those who share important similarities with them. This unique web app allows users to discover and connect with individuals who reflect these similarities in their life experiences.

Staying true to its name, InnerJoin facilitates connections among people who share commonalities across various categories, including attending the same schools, working at the same companies, sharing common hobbies, cultural backgrounds, and life experiences. Users can effortlessly select their preferred categories and provide their information. Based on their choices, users are grouped with like-minded individuals in each category.

With a simple click, users can enter group chats, embarking on the journey of building lasting friendships. Additionally, users have the option to access a list of 'super match' group members — individuals who share at least two common groups with them, enhancing the potential for deeper connections.

## Technology Stack

### Frontend

- Javascript
- React
- AJAX
- CSS
- Bootstrap
- Flask-SocketIO

### Backend

- Python
- Flask
- SQLite
- SQLAlchemy
- Flask-SocketIO
- Beautiful Soup
- Selenium

## APIs

- Mockaroo API
- Google Map API

## Features

### Landing Page

- Users can log in, register, explore the app, and view instructions on the landing page.
- The "Explore the App" feature allows users to browse the app as a mock user with just one click.
- The navigation bar on the landing page displays only the app logo and name when user is not logged in. If the user is already logged in, the navigation bar will show a welcome message, provide access to other pages, and allow the user to log out.

### User Login

- Users can log in and see their groups.
- Error message will show if users entered the wrong email or password.
- Password is checked against the hashed password in database.
- On this page, user have access to "User Registration" page or landing page.
- If user is already logged in, an alert will show and will automatically redirect to "My Groups" Page

### User Registration

- Users can create a new account on this page.
- Error message will show if username or email already exist.
- Password is hashed using Flask-bycrypt and hashed password is stored in the database.
- User have access to "User Login" page or landing page.
- If user is already logged in, an alert will show and will automatically redirect to "My Groups" Page

### User Information Intake

- Users first select the categories they are interested in.
- Then users fill out general information about this such as gender, age, occupation, zip code.
- Users then pick the groups they are interested in within each category they have selected.
- Users can update/edit these user input by navigating to these same pages and update their information and selections accordinly.

### My Super Match Page

- Users can view a table of users who share at least two common groups as them on this page. Information about each user and the number of common groups will also be shown.

### My Groups Page

- On this page, users have access to a list of groups that are matched based on users' selections. Groups are only formed when at least two people have selected them.

### Chat Room for Each Group

- Users can chat with group members of a particular group. Group members are individuals who have selected the group when filling out user intake form.
- Messages sent by each user are stored in the database, so newly joined users can always see chat history.
- Users can see a list of group members and their online and offline status.
- Users can see the number of online members and the tototal count of members in the group.
- Group member list is sorted alphabetically, prioritizing the logged in user, then online users, and lastly offline users.
- Users can click on "View User Informatoin" to see each group member's personal infomration.
- Users can also click on "user Map" to see where all group members are located, and they can click on each marker to see that particular user's information.
- Upon hitting the "leave" button, websocket will be disconnected and users will be redicted to the "My Groups" page and the user's status will be updated to offline.

### User Logout

- Upon logging out, users will be redirected to the landing page.

## Data Model

## Flow Chart

## How to Run

### Requirements

- Python
- SQLite
- Google Map API Key

### Steps

1. Clone the github repository.

```zsh
git clone https://github.com/judyjiang1/Inner-Join-friendship-app.git
```

2. Create a virtual environment

```zsh
virtualenv env
```

3. Activate the virtual environment.

```zsh
source env/bin/activate
```

4. Install requirements

```zsh
pip3 install -r requirements.txt
```

5. Create credentials

to generate a flask secret key:

```zsh
pip3 /data/generate_flaks_key.py
```

[Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript)

6. Create a <kbd>secrets.sh</kbd> file to save your keys using this format:

```
export FLASK_SECRET_KEY="YOUR_KEY_HERE"
export GOOGLE_MAP_API_KEY="YOUR_KEY_HERE"
```

7. source secrets

```zsh
source secrets.sh
```

8. Seed database

```zsh
python3 seed_database.py
```

9. Run server

```zsh
python3 server.py
```

10. Optional: Run tests

```zsh
python3 test_backend.py
```

```zsh
python3 test_database.py
```

```zsh
python3 test_E2E.py
```
