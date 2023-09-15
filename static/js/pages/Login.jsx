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

function Login({ loggedIn, fname, updateLoginStatus }) {
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginError, setLoginError] = useState(false);
  // const { setLoginStatus } = props;
  const history = useHistory();
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");

  // useEffect(() => {
  //   // Check if the user is already logged in when the component mounts
  //   if (loggedIn) {
  //     // Show an alert
  //     alert("Already logged in! Redirecting you to My Groups page.");
  //     // Redirect to another page immediately (e.g., home page)
  //     history.push("/my-groups");
  //   }
  // }, [loggedIn, history]);

  // if (loggedIn) {
  //   alert("Already logged in! Redirecting to your account.");
  //   history.push("/my-groups");
  //   // return null; // Render nothing if already logged in and redirected
  // }

  useEffect(() => {
    // Check if the user is already logged in when the component mounts
    if (loggedIn) {
      // alert("Already logged in! Redirecting to your account.");
      history.push("/my-groups");
    }
  }, [loggedIn, history]);

  const handleLogin = (evt) => {
    evt.preventDefault();

    const loginData = new FormData(evt.target);

    const credentials = {
      email: loginData.get("email"),
      password: loginData.get("password"),
    };

    fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          updateLoginStatus(true);
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

  return (
    <div className="container content">
      <div>
        <h1 className="text">User Login</h1>
        <form onSubmit={handleLogin}>
          <div className="field">
            {/* <div>
              <label htmlFor="email">Email:</label>
            </div> */}
            <span className="fa fa-user"></span>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              required={true}
              autoComplete="off"
              value={email}
              onChange={(evt) => setEmail(evt.target.value.trim())}
            />{" "}
          </div>
          <div className="field">
            {/* <label htmlFor="password" className="row">
              Password:
            </label> */}

            <span className="fa fa-lock"></span>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="************"
              required={true}
              autoComplete="off"
              value={password}
              onChange={(evt) => setPassword(evt.target.value.trim())}
            />
          </div>
          <div className="row">
            <button type="submit" className="col login_button">
              Log in
            </button>
            {loginError && (
              <p>
                The email or password you entered was incorrect. Please try
                again.
              </p>
            )}

            <button
              className=" col home_button"
              onClick={(evt) => history.push("/")}
            >
              Home Page
            </button>
          </div>
          <p className="no_acct">
            Don't have an account?
            <Link to="/register" className="sign_up">
              Sign Up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

// ReactDOM.render(
//   <BrowserRouter>
//     <Login />,
//   </BrowserRouter>,

//   document.querySelector("#root")
// );
