const { useContext, createContext, useState, useEffect, useRef } = React;
const {
  Route,
  Switch,
  useLocation,
  BrowserRouter,
  HashRouter,
  Redirect,
  Link,
  useHistory,
  withRouter,
} = ReactRouterDOM;

function GroupMember() {
  const [groupMemberData, setGroupMemberData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/get-group-members")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        const memberArray = Object.entries(data).map(([id, name]) => ({
          id: parseInt(id, 10),
          name,
        }));
        setGroupMemberData(memberArray);
      })
      .catch((error) => {
        setError(error);
        console.error("Error fetching data:", error);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (groupMemberData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <ul>
        {groupMemberData.map((member) => (
          <li key={member.id}>{member.name}</li>
        ))}
      </ul>
    </div>
  );
}
