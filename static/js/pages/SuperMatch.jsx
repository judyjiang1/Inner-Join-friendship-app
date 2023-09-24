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
    <>
      <NavBar />
      <div className="container">
        <div className="super-match-content">
          <div className="super-match-table-container">
            <h3>My Super Match</h3>
            <p>
              These are users who share at least 2 same groups as you. Reach out
              to them in the group chat!{" "}
            </p>
            <div className="super-match-wrapper">
              <table>
                <thead className="super-match-header">
                  <tr>
                    <th>#</th>
                    {/* <th>User_ID</th> */}
                    <th>Username</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Ethnicity</th>
                    <th>Occupation</th>
                    <th>Zip Code</th>
                    <th style={{ width: "800px" }}>Groups</th>
                    <th style={{ paddingRight: "25px" }}>No. of Same Groups</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.user_id}>
                      <td>{index + 1}</td>
                      {/* <td>{user.user_id}</td> */}
                      <td>{user.username}</td>
                      <td>{user.fname}</td>
                      <td>{user.lname}</td>
                      <td>{user.gender}</td>
                      <td>{user.age}</td>
                      <td>{user.ethnicity}</td>
                      <td>{user.occupation}</td>
                      <td>{user.zipcode}</td>
                      <td>
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
        </div>
      </div>
    </>
  );
}
