const GroupMemberTable = ({ groupName, handleClosePopup }) => {
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
  return (
    <div>
      <h3>Group Member Information</h3>
      <button onClick={handleClosePopup} className="btn btn-primary mx-2">
        Close Table
      </button>
      <div>
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>User_ID</th>
              <th>Username</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Gender</th>
              <th>Age</th>
              <th>Ethnicity</th>
              <th>Occupation</th>
              <th>Zipcode</th>
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
