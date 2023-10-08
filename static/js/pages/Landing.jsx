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

  document.title = "InnerJoin | Welcome";
  const [isOpen, setIsOpen] = useState(false);
  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const toggleOnOFF = () => {
    setIsOpen(!isOpen);
  };
  const handleExploreApp = (evt) => {
    evt.preventDefault();

    const email = "testuser@test.com";
    const password = "testtesttest";

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
      <nav className="navbar navbar-expand-lg navbar-dark bg-black">
        <Link to="/">
          <img
            src="/static/img/app logo.png"
            alt="App Logo"
            style={{ width: "200px", marginLeft: 20 }}
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
              <span className="nav-item">
                <a
                  className="nav-link text-white"
                  style={{ marginRight: "10px" }}
                  href="/my-super-match"
                >
                  My Super Match
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
                      Edit My Category Selection
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
          <div style={{ width: "100%" }}>
            <h1
              className="landing-text"
              style={{ marginTop: 150, fontWeight: "bold", fontSize: 42 }}
            >
              An innovative way of making new friends
              {/* Find Your Kindred Spirits <br></br>
              <span style={{ fontStyle: "italic", fontSize: 38 }}>
                Form Connections in the Most Unconventional Ways
              </span> */}
            </h1>
          </div>
          <div>
            <h2 className="landing-text">
              Discover people who have crossed paths or share commonalities with
              you
            </h2>
            <h2 className="landing-text" style={{ marginBottom: 35 }}>
              Embark on a journey of building lifelong friendships
            </h2>
          </div>
          {/* Buttons */}
          <div className="row" style={{ marginTop: 12 }}>
            <div className="col">
              <Link to="/login" className="ml-2 btn btn-primary mx-2">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary mx-2">
                Register
              </Link>

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
                {isOpen ? "Hide About & Instructions" : "About & Instructions"}
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
