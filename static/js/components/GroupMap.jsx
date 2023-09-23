function initMap(users) {
  const map = new window.google.maps.Map(document.getElementById("map"), {
    center: { lat: 39.8283, lng: -98.5795 },
    zoom: 4,
  });

  const groupedUsers = {};

  users.forEach((user) => {
    const { zipcode, username } = user;

    if (!groupedUsers[zipcode]) {
      groupedUsers[zipcode] = [];
    }

    groupedUsers[zipcode].push(username);
  });

  for (const [zipcode, usernames] of Object.entries(groupedUsers)) {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: zipcode }, (results, status) => {
      if (status === "OK" && results[0]) {
        const { lat, lng } = results[0].geometry.location;

        new window.google.maps.Marker({
          position: { lat: lat(), lng: lng() },
          map,
          label: {
            text: `${usernames.join(" & ")}`,
            color: "#4B0082",
          },
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
