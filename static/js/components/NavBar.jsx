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
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    fetch("/api/get-user", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("User not authenticated");
        }
      })
      .then((userData) => {
        setUser(userData);
      })
      .catch((error) => {
        console.error("Login error:", error);
        setUser(null);
      });
  };

  const handleLogout = () => {
    fetch("/api/logout", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          setUser(null);
          history.push("/");
        }
      })
      .catch((error) => {
        console.error("Logout error:", error);
      });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link className="navbar-brand" to="/">
        InnerJoin
      </Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <a>Welcome, {user} </a>{" "}
          </li>
          <li>
            <Link className="navbar-brand" to="/my-groups">
              My Groups
            </Link>
          </li>
          <li>
            <a href="#" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};
