const GroupMemberTable = ({ groupName, handleClosePopup }) => {
  const [users, setUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

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

  const handleSort = () => {
    const sortedUsers = [...users].sort((a, b) => {
      const firstNameA = a.fname ? a.fname : "";
      const firstNameB = b.fname ? b.fname : "";

      if (sortOrder === "asc") {
        return firstNameA.localeCompare(firstNameB);
      } else {
        return firstNameB.localeCompare(firstNameA);
      }
    });

    setUsers(sortedUsers);
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  return (
    <div className="user-table-container container">
      <h3>Group Member Information</h3>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <button
          onClick={handleClosePopup}
          className="btn btn-primary mx-2 close-table-btn"
        >
          Close
        </button>
      </div>
      <div className="table-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>User_ID</th>
              <th>Username</th>
              <th onClick={handleSort} style={{ cursor: "pointer" }}>
                First Name {sortOrder === "asc" ? "▲" : "▼"}
              </th>
              <th>Last Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Ethnicity</th>
              <th>Occupation</th>
              <th>Zip Code</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.user_id}>
                <td>{index + 1}</td>
                <td>{user.user_id}</td>
                <td>{user.username}</td>
                <td>{user.fname}</td>
                <td>{user.lname}</td>
                <td>{user.gender}</td>
                <td>{user.age}</td>
                <td>{user.ethnicity}</td>
                <td>{user.occupation}</td>
                <td>{user.zipcode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
