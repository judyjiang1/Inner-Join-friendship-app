import data from "../../api/data.json";

function My_Groups() {
  const [groupedUsers, setGroupedUsers] = useState([]);

  useEffect(() => {
    // Fetch data from data.json
    fetch("/api/data.json")
      .then((response) => response.json())
      .then((data) => {
        // Process data and group users
        const usersByCollege = {};
        data.forEach((user) => {
          const college = user.college;
          if (college) {
            if (college in usersByCollege) {
              usersByCollege[college].push(
                `${user.first_name} ${user.last_name}`
              );
            } else {
              usersByCollege[college] = [
                `${user.first_name} ${user.last_name}`,
              ];
            }
          }
        });
        setGroupedUsers(usersByCollege);
      });
  }, []);

  return (
    <div className="App">
      {Object.keys(groupedUsers).map((college) => (
        <div key={college}>
          <h2>Users from {college}:</h2>
          <ul>
            {groupedUsers[college].map((user) => (
              <li key={user}>{user}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
