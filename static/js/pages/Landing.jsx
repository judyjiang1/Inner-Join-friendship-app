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
  document.title = "Welcome";
  const [isOpen, setIsOpen] = useState(false);
  const toggleOnOFF = () => {
    setIsOpen(!isOpen);
  };
  const [user, setUser] = useState(null);
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    fetch("/get-user", {
      method: "GET",
      credentials: "include", // Use "include" to send cookies with the request
    })
      .then((response) => {
        if (response.ok) {
          // Assuming the response contains user data, parse it as JSON
          return response.json();
        } else {
          throw new Error("User not authenticated");
        }
      })
      .then((userData) => {
        setUser(userData); // Update the user state with the fetched data
        setLoggedIn(true);
      })
      .catch((error) => {
        console.error("Login error:", error);
        setUser(null); // Set user state to null if there's an error
      });
  };

  return (
    <div className="bg">
      <div className="row">
        {/* Logo and Website Name */}
        <div className="col-md-6">
          <div className="cover-header">
            <div className="logo img">
              <img src="/static/img/app logo.png" alt="Logo" />
            </div>
            <div className="web-name">
              <h1>InnerJoin</h1>
            </div>
          </div>
        </div>
        <div>
          {loggedIn ? (
            <>
              <a>Welcome, {user} </a>{" "}
              <Link className="navbar-brand" to="/my-groups">
                My Account
              </Link>
            </>
          ) : null}
        </div>
        <div className="flex-container">
          {/* Description */}
          <div>
            <div className="cover-content">
              <h2 className="cover-p1">
                "An innovative way of making new friends."
              </h2>

              <p className="cover-p2">
                Discover people who have crossed paths or share commonalities
                with you and start building <span> lifelong </span> friendship.
              </p>
            </div>

            {/* Buttons */}
            <div className="cover-buttons">
              <Link to="/login" className="btn btn-primary mx-2">
                Login
              </Link>
              <Link to="/register" className="btn btn-primary mx-2">
                Register
              </Link>
              <Link to="/demo" className="btn btn-primary mx-2">
                Explore the App
              </Link>

              <button
                onClick={toggleOnOFF}
                className={`btn ${
                  isOpen ? "btn btn-secondary mx-2" : "btn btn-primary mx-2"
                }`}
              >
                {isOpen ? "Hide Instructions" : "View Instructions"}
              </button>
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
    </div>
  );
}

ReactDOM.render(
  <BrowserRouter>
    <Landing />
  </BrowserRouter>,
  document.querySelector("#root")
);
