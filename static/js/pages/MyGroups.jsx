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
  const [selectedCategory, setSelectedCategory] = useState("");

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

        // Sort groups by category name and then by group name
        const sortedGroups = Object.keys(data)
          .sort((a, b) => {
            const categoryComparison = data[a].categoryName.localeCompare(
              data[b].categoryName
            );
            if (categoryComparison !== 0) return categoryComparison;
            return a.localeCompare(b);
          })
          .reduce((acc, key) => {
            acc[key] = data[key];
            return acc;
          }, {});

        setGroupsWithPeople(sortedGroups);
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
          history.push(`/my-groups/${categoryName}/${groupName}`);
        } else {
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

    // Filter based on selected category
    if (selectedCategory && group.categoryName !== selectedCategory) {
      continue;
    }

    const groupCard = (
      <div className="col-md-4 mb-4 d-flex text-to-title-case" key={groupName}>
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
    <>
      <NavBar />
      <div
        className="container"
        style={{
          background: "rgba(255, 255, 255, 0.178)",
          backdropFilter: "blur(20px)",
          marginTop: 50,
          marginBottom: 100,
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "white",
            fontWeight: 600,
            marginTop: 25,
            paddingTop: 30,
          }}
        >
          My Groups
        </h1>

        <div className="my-4">
          <label htmlFor="categoryFilter" className="form-label">
            Filter by Category:
          </label>
          <select
            id="categoryFilter"
            className="form-select"
            style={{ textTransform: "uppercase" }}
            onChange={(e) => setSelectedCategory(e.target.value)}
            value={selectedCategory}
          >
            <option value="">All</option>
            {Array.from(
              new Set(
                Object.values(groupsWithPeople).map(
                  (group) => group.categoryName
                )
              )
            ).map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        <p style={{ color: "rgb(247, 233, 233)", marginBottom: 30 }}>
          Note: Groups are formed only when a minimum of two individuals choose
          to join the group.
        </p>
        <div className="row">{groupCards}</div>
      </div>
    </>
  );
}
