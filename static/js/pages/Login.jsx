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

function Login() {
  const { loginStatus, setLoginStatus, userInfo, setUserInfo } =
    useContext(AuthContext);
  const [loginError, setLoginError] = useState(false);

  document.title = "User Login";

  const history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const hasFetchBeenCalledRef = useRef(false);

  useEffect(() => {
    if (!hasFetchBeenCalledRef.current && loginStatus === true) {
      alert(
        "Already logged in! Redirecting to your account. Please log out if this is not your account."
      );
      history.push("/my-groups");
    }
  }, [loginStatus, history]);

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
          setEmail("");
          setPassword("");
          setLoginStatus(true);
          hasFetchBeenCalledRef.current = true;
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

  return (
    <div className="login-content">
      <div>
        <h1 className="text">User Login</h1>
        <form onSubmit={handleLogin}>
          <div className="email-field">
            <label htmlFor="email" className="label-text row">
              Email:
            </label>
            <div className="field">
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
          </div>
          <div>
            <label htmlFor="password" className="row">
              Password:
            </label>
            <div className="field">
              <span className="fa fa-lock"></span>
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
            </div>
          </div>
          <div>
            <div className="login-btn-div">
              <button type="submit" className="login-button">
                Log in
              </button>
              {loginError && (
                <p
                  style={{
                    color: "#B22222",
                    marginTop: 20,
                    fontWeight: "bold",
                  }}
                >
                  The email or password you entered was incorrect. Please try
                  again.
                </p>
              )}{" "}
            </div>
            <div className="home-btn-div">
              <button
                className="home-button"
                onClick={(evt) => history.push("/")}
              >
                Back to Home
              </button>
            </div>
          </div>
          <p className="no-acct-txt">
            Don't have an account?
            <Link to="/register">
              <button className="home-button">Sign Up</button>
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
