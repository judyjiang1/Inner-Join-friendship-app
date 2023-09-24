function SuperMatch() {
  const [users, setUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [numGroupGortOrder, setnumGroupGortOrder] = useState("asc");
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

  const handleNumSameGroupSort = () => {
    const sortedUsers = [...users].sort((a, b) => {
      const numSameGroupA = a.count ? parseInt(a.count, 10) : 0; // Parse to integer
      const numSameGroupB = b.count ? parseInt(b.count, 10) : 0; // Parse to integer

      if (numGroupGortOrder === "asc") {
        return numSameGroupA - numSameGroupB; // Compare as numbers for ascending order
      } else {
        return numSameGroupB - numSameGroupA; // Compare as numbers for descending order
      }
    });

    setUsers(sortedUsers);
    setnumGroupGortOrder(numGroupGortOrder === "asc" ? "desc" : "asc");
  };

  // if (!Array.isArray(users) || users.length === 0) {
  //   return (
  //     <>
  //       <NavBar />
  //       <div className="container">
  //         <div className="super-match-content">
  //           <div className="super-match-table-container">
  //             <h2 style={{ marginBottom: 20, fontWeight: "bold" }}>
  //               My Super Match
  //             </h2>
  //             <p style={{ fontSize: "18px", fontWeight: "bold" }}>
  //               These are users who share at least 2 same groups as you. Reach
  //               out to them in the group chat!{" "}
  //             </p>
  //             <div className="super-match-wrapper">
  //               <table>
  //                 <thead className="super-match-header">
  //                   <tr>
  //                     <th>#</th>
  //                     {/* <th>User_ID</th> */}
  //                     <th>Username</th>
  //                     <th
  //                       onClick={handleSort}
  //                       style={{ cursor: "pointer", width: "300px" }}
  //                     >
  //                       First Name {sortOrder === "asc" ? "▲" : "▼"}
  //                     </th>
  //                     <th>Last Name</th>
  //                     <th>Gender</th>
  //                     <th>Age</th>
  //                     <th>Ethnicity</th>
  //                     <th>Occupation</th>
  //                     <th>Zip Code</th>
  //                     <th style={{ width: "800px" }}>Groups</th>
  //                     <th
  //                       onClick={handleNumSameGroupSort}
  //                       style={{
  //                         cursor: "pointer",
  //                         width: "500px",
  //                         paddingRight: "25px",
  //                       }}
  //                     >
  //                       No. of Same Groups{" "}
  //                       {numGroupGortOrder === "asc" ? "▲" : "▼"}
  //                     </th>
  //                   </tr>
  //                 </thead>

  //                 <tbody>
  //                   <tr>
  //                     <td colSpan="3">You have no super match users.</td>
  //                   </tr>
  //                 </tbody>
  //               </table>
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </>
  //   );
  // }

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="super-match-content">
          <div className="super-match-table-container">
            <h2 style={{ marginBottom: 20, fontWeight: "bold" }}>
              My Super Match
            </h2>
            <p style={{ fontSize: "18px", fontWeight: "bold" }}>
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
                    <th
                      onClick={handleSort}
                      style={{ cursor: "pointer", width: "300px" }}
                    >
                      First Name {sortOrder === "asc" ? "▲" : "▼"}
                    </th>
                    <th>Last Name</th>
                    <th>Gender</th>
                    <th>Age</th>
                    <th>Ethnicity</th>
                    <th>Occupation</th>
                    <th>Zip Code</th>
                    <th style={{ width: "800px" }}>Groups</th>
                    <th
                      onClick={handleNumSameGroupSort}
                      style={{
                        cursor: "pointer",
                        width: "500px",
                        paddingRight: "25px",
                      }}
                    >
                      No. of Same Groups{" "}
                      {numGroupGortOrder === "asc" ? "▲" : "▼"}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.length === 0 ? (
                    <tr>
                      <td colSpan="3">You have no super match users. </td>
                    </tr>
                  ) : (
                    users.map((user, index) => (
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
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
