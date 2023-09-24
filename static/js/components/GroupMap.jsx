function initMap(users) {
  const map = new window.google.maps.Map(document.getElementById("map"), {
    center: { lat: 39.8283, lng: -98.5795 },
    zoom: 4,
  });

  const groupedUsers = {};

  users.forEach((user) => {
    const {
      user_id,
      username,
      fname,
      lname,
      gender,
      age,
      ethnicity,
      occupation,
      zipcode,
    } = user;

    if (!groupedUsers[zipcode]) {
      groupedUsers[zipcode] = [];
    }

    groupedUsers[zipcode].push({
      user_id,
      username,
      fname,
      lname,
      gender,
      age,
      ethnicity,
      occupation,
      zipcode,
    });
  });

  for (const [zipcode, userArray] of Object.entries(groupedUsers)) {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: zipcode }, (results, status) => {
      if (status === "OK" && results[0]) {
        const { lat, lng } = results[0].geometry.location;

        const labelUserContent = userArray
          .map((item) => item.username)
          .join(" & ");

        const marker = new window.google.maps.Marker({
          position: { lat: lat(), lng: lng() },
          map,
          label: {
            text: labelUserContent,
            color: "#4B0082",
            fontWeight: "bold",
          },
        });

        const infoWindow = new window.google.maps.InfoWindow();

        marker.addListener("click", () => {
          const infoContent = userArray
            .map(
              (item) =>
                `<strong>User ID:</strong> ${item.user_id}<br>` +
                `<strong>Username:</strong> ${item.username}<br>` +
                `<strong>First Name:</strong> ${item.fname}<br>` +
                `<strong>Last Name:</strong> ${item.lname}<br>` +
                `<strong>Gender:</strong> ${item.gender}<br>` +
                `<strong>Age:</strong> ${item.age}<br>` +
                `<strong>Ethnicity:</strong> ${item.ethnicity}<br>` +
                `<strong>Zip Code:</strong> ${item.zipcode}`
            )
            .join("<br><br>");
          infoWindow.setContent(infoContent);
          infoWindow.open(map, marker);
        });
      } else {
        // alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }
}

const GroupMap = ({ groupName, handleCloseMapPopup }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("/api/get-group-members", {
      method: "POST",
      body: JSON.stringify({
        group_name: groupName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  useEffect(() => {
    if (users.length > 0) {
      initMap(users);
    }
  }, [users]);

  return (
    <div>
      <button onClick={handleCloseMapPopup} className="btn btn-primary mx-2">
        Close Map
      </button>
      <div id="map" style={{ width: "800px", height: "600px" }}></div>
    </div>
  );
};
