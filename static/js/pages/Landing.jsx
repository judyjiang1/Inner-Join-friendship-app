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

function Landing({ loggedIn, fname, updateLoginStatus }) {
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
  // const [user, setUser] = useState(null);
  // const [loggedIn, setLoggedIn] = useState(false);

  // useEffect(() => {
  //   let isMounted = true;

  //   const getUser = async () => {
  //     try {
  //       const response = await fetch("/api/get-user", {
  //         method: "GET",
  //         credentials: "include",
  //       });

  //       if (!isMounted) {
  //         return;
  //       }

  //       if (response.status === 401) {
  //         // Handle the "User not logged in" scenario quietly
  //         setUser(null); // Set the user to null or perform any other necessary actions
  //       } else if (response.ok) {
  //         const userData = await response.json();
  //         setUser(userData);
  //         setLoggedIn(true);
  //       } else {
  //         throw new Error("Request failed");
  //       }
  //     } catch (error) {
  //       // Handle other errors here
  //       console.error(error);
  //       setUser(null);
  //     }
  //   };

  //   getUser();

  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  return (
    <div>
      {/* Logo and Website Name */}

      <div className="row">
        {/* <div className="logo img">
              <img src="/static/img/app logo.png" alt="Logo" />
            </div> */}
        <div className="col-1">
          <Link to="/">
            <img
              src="/static/img/app logo.png"
              alt="App Logo"
              style={{ width: "300px" }}
            />
          </Link>
        </div>
        {/* <div className="web-name">
              <h1>InnerJoin</h1>
            </div> */}
        <div className="col-10"></div>

        <div className="col-1">
          {loggedIn ? (
            <>
              <a>Welcome, {fname} </a>{" "}
              <Link className="navbar-brand" to="/my-groups">
                My Account
              </Link>
            </>
          ) : null}
        </div>
      </div>
      <div className="container">
        <div className="container">
          {/* Description */}

          <div className="container">
            <h2>An innovative way of making new friends.</h2>

            <p className="row">
              Discover people who have crossed paths or share commonalities with
              you and start building <span> lifelong </span> friendship.
            </p>
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
              <Link to="/demo" className="btn btn-primary mx-2">
                Explore the App
              </Link>
              <button onClick={handleExploreApp}>Explore the App</button>
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

// ReactDOM.render(
//   <BrowserRouter>
//     <Landing />
//   </BrowserRouter>,
//   document.querySelector("#root")
// );
