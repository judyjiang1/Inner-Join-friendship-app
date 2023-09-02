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

function GroupDetail() {
  const { groupName } = useParams();
  const [groupData, setGroupData] = useState({});

  useEffect(() => {
    // Fetch group data from Flask backend using the groupName parameter
    fetch(`/my-groups/${groupName}`)
      .then((response) => response.json())
      .then((data) => setGroupData(data))
      .catch((error) => console.error("Error fetching group data:", error));
  }, [groupName]);

  return (
    <div>
      <h1>Group Name: {groupData.group_name}</h1>
      {/* You can display additional group details here */}
    </div>
  );
}
