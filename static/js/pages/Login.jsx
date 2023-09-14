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
    <div>
      <h1>User Login</h1>
      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          required={true}
          autoComplete="off"
          value={email}
          onChange={(evt) => setEmail(evt.target.value.trim())}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          required={true}
          autoComplete="off"
          value={password}
          onChange={(evt) => setPassword(evt.target.value.trim())}
        />
        <button type="submit">Log in</button>
        {loginError && (
          <p>
            The email or password you entered was incorrect. Please try again.
          </p>
        )}

        <button onClick={(evt) => history.push("/")}>Back to Home</button>

        <p>
          Don't have an account?
          <Link to="/register">Sign Up</Link>
        </p>
      </form>
    </div>
  );
}

ReactDOM.render(
  <BrowserRouter>
    <Login />,
  </BrowserRouter>,

  document.querySelector("#root")
);
