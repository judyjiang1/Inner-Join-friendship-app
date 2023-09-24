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
  // const [user, setUser] = useState(null);

  const { loginStatus, setLoginStatus, userInfo, setUserInfo } =
    useContext(AuthContext);

  const [groups, setGroups] = useState([]);

  const history = useHistory();

  const getGroups = async () => {
    try {
      const response = await fetch("/api/get-user-groups", {
        method: "POST",
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
    // Fetch groups when the component mounts
    getGroups();
  }, []);

  // useEffect(() => {
  //   getUser();
  // }, []);

  // const getUser = () => {
  //   fetch("/api/get-user", {
  //     method: "GET",
  //     credentials: "include",
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         return response.json();
  //       } else {
  //         throw new Error("User not authenticated");
  //       }
  //     })
  //     .then((userData) => {
  //       setUser(userData);
  //     })
  //     .catch((error) => {
  //       console.error("Login error:", error);
  //       setUser(null);
  //     });
  // };

  // const handleLogout = () => {
  //   fetch("/api/user/logout", {
  //     method: "GET",
  //     credentials: "include",
  //   })
  //     .then((response) => {
  //       if (response.ok) {
  //         // setUser(null);
  //         // updateLoginStatus(false);
  //         setLoginStatus(false);
  //         setUserInfo(null);
  //         history.push("/");
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Logout error:", error);
  //     });
  // };

  const handleLinkClick = () => {
    // Reload the page
    window.location.reload();
  };

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
          style={{ width: "200px" }}
        />
      </Link>
      <div className="navbar-nav ms-auto">
        <span className="nav-item ">
          <a className="nav-link text-white" style={{ marginRight: "10px" }}>
            Welcome, {userInfo.fname}
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
              <li key={index}>
                <a
                  className="dropdown-item"
                  href={`/my-groups/${groups[groupName].categoryName}/${groupName}`}
                >
                  {/* {groups[groupName].categoryName} -  */}
                  {groupName}
                </a>
              </li>
            ))}
          </ul>
        </span>
        <span className="nav-item">
          <a
            className="nav-link text-white"
            style={{ marginRight: "10px" }}
            href="#"
            onClick={performLogout}
          >
            Logout
          </a>
        </span>
      </div>
    </nav>
  );
};

//   return (
//     <nav className="navbar navbar-expand-lg navbar-light bg-light">
//       {/* <Link className="navbar-brand" to="/">
//         InnerJoin
//       </Link> */}
//       <Link to="/">
//         <img
//           src="/static/img/app logo.png"
//           alt="App Logo"
//           style={{ width: "250px" }}
//         />
//       </Link>
//       <div className="collapse navbar-collapse" id="navbarNav">
//         <ul className="navbar-nav ml-auto">
//           <li className="nav-item">
//             <a>Welcome, {userInfo.fname} </a>{" "}
//           </li>
//           <li>
//             <Link className="navbar-brand" to="/my-groups">
//               My Groups
//             </Link>
//           </li>
//           <li>
//             <a href="#" onClick={performLogout}>
//               Logout
//             </a>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };
