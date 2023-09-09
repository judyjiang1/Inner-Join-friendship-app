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

function MyGroups(props) {
  const history = useHistory();
  const [groupsWithPeople, setGroupsWithPeople] = useState([]);

  // const [myGroups, joinMyGroup] = props;

  useEffect(() => {
    document.title = "My Groups";

    async function fetchData() {
      try {
        const response = await fetch("/get-user-groups", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setGroupsWithPeople(data);
      } catch (error) {
        console.error("Error fetching user groups names:", error);
      }
    }

    fetchData();
  }, []);

  function joinMyGroup(groupName) {
    fetch(`/store-group-in-session/${groupName}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // Group information successfully stored in the session
          // Now, navigate to the GroupDetail page
          history.push(`/my-groups/${groupName}`);
        } else {
          // Handle errors if needed
          console.error("Error storing group information in session");
        }
      })
      .catch((error) => {
        console.error("Error storing group information:", error);
      });
  }

  const groupCards = [];

  for (const groupName of Object.keys(groupsWithPeople)) {
    const group = groupsWithPeople[groupName];
    const groupCard = (
      <GroupCard
        key={groupName}
        categoryName={group.categoryName}
        groupName={groupName}
        imgUrl={group.imgURL}
        handleImageClick={() => joinMyGroup(groupName)}
      />
    );
    groupCards.push(groupCard);
  }

  return (
    <div>
      <h1>My Groups</h1>
      <div className="col-12 col-md-9 d-flex flex-wrap">{groupCards}</div>
    </div>
  );
}
