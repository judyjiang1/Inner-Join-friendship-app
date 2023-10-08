let isMapLoaded = false;

function initMap(users) {
  const map = new window.google.maps.Map(document.getElementById("map"), {
    center: { lat: 39.8283, lng: -98.5795 },
    zoom: 4,
  });

  const groupedUsers = {};

  if (users !== undefined) {
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
            .map((item) => item.fname + " " + item.lname)
            .join(" & ");

          const marker = new window.google.maps.Marker({
            position: { lat: lat(), lng: lng() },
            map,
            label: {
              text: labelUserContent,
              color: "#4B0082",
              fontWeight: "bold",
              fontSize: "16px",
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
}

function loadScript(url, callback) {
  const index = window.document.getElementsByTagName("script")[0];
  const script = window.document.createElement("script");
  script.src = url;
  script.async = true;
  script.defer = true;
  script.onload = callback;
  index.parentNode.insertBefore(script, index);
}

const GroupMap = ({ groupName, handleCloseMapPopup }) => {
  const [users, setUsers] = useState([]);
  const [googleMapApiKey, setApiKey] = useState("");

  useEffect(() => {
    fetch("/api/get-map-api-key")
      .then((response) => response.json())
      .then((data) => {
        setApiKey(data.google_map_api_key);
      })
      .catch((error) => {
        console.error("Error fetching API key:", error);
      });
  }, []);

  function renderMap() {
    if (!isMapLoaded && googleMapApiKey) {
      loadScript(
        `https://maps.googleapis.com/maps/api/js?key=${googleMapApiKey}&callback=initMap`,
        () => {
          isMapLoaded = true;
          initMap(users);
        }
      );
    } else {
      initMap(users);
    }
  }

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
      renderMap();
    }
  }, [users]);

  return (
    <div className="container">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={handleCloseMapPopup}
          className="btn btn-primary mx-2"
          style={{ marginBottom: 20 }}
        >
          Close
        </button>
      </div>
      <div id="map" style={{ width: "800px", height: "600px" }}></div>
    </div>
  );
};
