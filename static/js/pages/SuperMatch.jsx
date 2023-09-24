function SuperMatch() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    document.title = "My Super Match";
    fetch("/api/get-super-match", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);
  return (
    <div className="super-match-table-container">
      <h3>Group Member Information</h3>
      <div className="super-match-wrapper">
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
              <th>Zip Code</th>
              <th>Groups</th>
              <th>No. of Same Groups</th>
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
                <td className="wide-column">
                  {user.groups.map((group, index) => (
                    <span key={index}>
                      {group.trim()}
                      {index !== user.groups.length - 1 && ", "}
                      <br />
                    </span>
                  ))}
                </td>
                <td>{user.count}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
