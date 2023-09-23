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

function Landing() {
  const { loginStatus, setLoginStatus, userInfo, setUserInfo } =
    useContext(AuthContext);

  document.title = "Welcome";
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toggleOnOFF = () => {
    setIsOpen(!isOpen);
  };
  const handleExploreApp = (evt) => {
    evt.preventDefault();

    const email = "rbrakespear1@wisc.edu";
    const password = "rA0!MvPv<1s";

    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setEmail("");
          setPassword("");
          setLoginStatus(true);
          setUserInfo((prev) => {
            prev.user_id = data.user_id;
            prev.username = data.username;
            prev.fname = data.fname;
            prev.lname = data.lname;
            prev.email = data.email;
            return prev;
          });
          history.push("/my-groups");
        } else {
          setLoginError(true);
          setEmail("");
          setPassword("");
        }
      })
      .catch((error) => {
        console.error("An error occurred:", error);
      });
  };

  function performLogout() {
    logoutUser().then((res) => {
      setLoginStatus(false);
      history.replace("/");
    });
  }

  return (
    <div>
      {/* Logo and Website Name */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-black">
        <Link to="/">
          <img
            src="/static/img/app logo.png"
            alt="App Logo"
            style={{ width: "200px" }}
          />
        </Link>
        <div className="navbar-nav ms-auto">
          {loginStatus === true ? (
            <>
              <span className="nav-item">
                <a
                  className="nav-link text-white"
                  style={{ marginRight: "10px" }}
                >
                  Welcome, {userInfo.fname}
                </a>
              </span>
              <li className="nav-item">
                <Link
                  className="nav-link text-white"
                  style={{ marginRight: "10px" }}
                  to="/my-groups"
                >
                  My Groups
                </Link>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link text-white"
                  style={{ marginRight: "10px" }}
                  href="#"
                  onClick={performLogout}
                >
                  Logout
                </a>
              </li>
            </>
          ) : (
            <></>
          )}
        </div>
      </nav>

      <div className="landing-intro">
        <div className="center container">
          {/* Description */}
          <div>
            <h2 className="landing-text" style={{ marginTop: 150 }}>
              An innovative way of making new friends.
            </h2>
          </div>
          <div>
            <h5 className="landing-text" style={{ fontStyle: "bold" }}>
              Discover people who have crossed paths or share commonalities with
              you and start building <span> lifelong </span> friendship.
            </h5>
          </div>
          {/* Buttons */}
          <div className="row">
            <div className="col">
              <Link to="/login" className="btn btn-primary mx-2">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary mx-2">
                Register
              </Link>
              {/* <Link to="/demo" className="btn btn-primary mx-2">
                Explore the App
              </Link> */}

              {loginStatus === true ? (
                <button className="btn btn-secondary mx-2" disabled>
                  Explore the App
                </button>
              ) : (
                <button
                  className="btn btn-primary mx-2"
                  onClick={handleExploreApp}
                >
                  Explore the App
                </button>
              )}

              <button
                onClick={toggleOnOFF}
                className={`btn ${
                  isOpen ? "btn btn-secondary mx-2" : "btn btn-primary mx-2"
                }`}
              >
                {isOpen ? "Hide Instructions" : "View Instructions"}
              </button>
            </div>
          </div>

          <div>
            <InstructionBox isOpen={isOpen} />
          </div>
        </div>
      </div>
      <div>
        <CopyrightFooter />
      </div>
    </div>
  );
}
