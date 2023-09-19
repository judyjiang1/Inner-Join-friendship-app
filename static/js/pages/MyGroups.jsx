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

function MyGroups() {
  const history = useHistory();
  const [groupsWithPeople, setGroupsWithPeople] = useState([]);

  // const [myGroups, joinMyGroup] = props;

  useEffect(() => {
    document.title = "My Groups";

    async function fetchData() {
      try {
        const response = await fetch("/api/get-user-groups", {
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

  function joinMyGroup(groupName, categoryName) {
    fetch(`/api/open-chatroom`, {
      method: "POST",
      body: JSON.stringify({
        group_name: groupName,
        category_name: categoryName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          // Group information successfully stored in the session
          // Then navigate to the GroupDetail page
          history.push(`/my-groups/${categoryName}/${groupName}`);
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
      <div className="col-md-4" key={groupName}>
        <GroupCard
          key={groupName + "_card"}
          categoryName={group.categoryName}
          groupName={groupName}
          imgUrl={group.imgURL}
          handleImageClick={() => joinMyGroup(groupName, group.categoryName)}
        />
      </div>
    );
    groupCards.push(groupCard);
  }

  return (
    <div className="container" style={{ backGroundColor: "red" }}>
      <h1 className="text-center">My Groups</h1>
      <div className="row">{groupCards}</div>
    </div>
  );
}
