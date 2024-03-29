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

const NavBar = () => {
  const { loginStatus, setLoginStatus, userInfo, setUserInfo } =
    useContext(AuthContext);

  const [groups, setGroups] = useState([]);

  const history = useHistory();

  const getGroups = async () => {
    try {
      const response = await fetch("/api/get-user-groups", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      const sortedGroups = Object.keys(data)
        .sort((a, b) => a.localeCompare(b))
        .reduce((acc, key) => {
          acc[key] = data[key];
          return acc;
        }, {});
      setGroups(sortedGroups);
    } catch (error) {
      console.error("Error fetching user groups names:", error);
    }
  };

  useEffect(() => {
    getGroups();
  }, []);

  function performLogout() {
    logoutUser().then((res) => {
      setLoginStatus(false);
      history.replace("/");
    });
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-black">
      <Link to="/">
        <img
          src="/static/img/app logo.png"
          alt="App Logo"
          style={{ width: "200px", marginLeft: 20 }}
        />
      </Link>
      <div className="navbar-nav ms-auto">
        <span className="nav-item ">
          <a className="nav-link text-white" style={{ marginRight: "10px" }}>
            Welcome, {userInfo.fname}
          </a>
        </span>
        <span className="nav-item">
          <a
            className="nav-link text-white"
            style={{ marginRight: "10px" }}
            href="/my-super-match"
          >
            My Super Match
          </a>
        </span>
        <span className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle text-white"
            style={{ marginRight: "10px" }}
            to="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            My Groups
          </Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            {Object.keys(groups).map((groupName, index) => (
              <li key={index} style={{ textTransform: "capitalize" }}>
                <a
                  className="dropdown-item"
                  href={`/my-groups/${groups[groupName].categoryName}/${groupName}`}
                >
                  {groupName}
                </a>
              </li>
            ))}
          </ul>
        </span>
        <span className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle text-white"
            style={{ marginRight: "10px" }}
            to="#"
            id="navbarDropdown"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Edit My Input
          </Link>
          <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
            <li>
              <a
                className="nav-link text-black"
                style={{ marginRight: "10px" }}
                href="/select-categories"
              >
                Edit Category Selection
              </a>
            </li>
            <li>
              <a
                className="nav-link text-black"
                style={{ marginRight: "10px" }}
                href="/enter-user-info"
              >
                Edit My Info & Group Selection
              </a>
            </li>
          </ul>
        </span>
        <span className="nav-item">
          <a
            className="nav-link text-white"
            style={{ marginRight: "10px" }}
            href="#"
            onClick={performLogout}
          >
            Log out
          </a>
        </span>
      </div>
    </nav>
  );
};
