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

function Register() {
  const { loginStatus, setLoginStatus, userInfo, setUserInfo } =
    useContext(AuthContext);

  document.title = "User Registration";
  const [registerError, setRegisterError] = useState(false);
  let history = useHistory();
  const [fname, setFname] = useState(" ");
  const [lname, setLname] = useState(" ");
  const [username, setUsername] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");

  useEffect(() => {
    // Check if the user is already logged in when the component mounts
    if (loginStatus === true) {
      alert(
        "Already logged in! Redirecting to your account. Please log out if this is not your account."
      );
      history.push("/my-groups");
    }
  }, [loggedIn, history]);

  const handleRegister = (evt) => {
    evt.preventDefault();

    const registerData = new FormData(evt.target);
    const userInfo = {
      fname: registerData.get("fname"),
      lname: registerData.get("lname"),
      username: registerData.get("username"),
      email: registerData.get("email"),
      password: registerData.get("password"),
    };

    fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfo),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          history.push("/register-success");
        } else {
          setRegisterError(true);
          setFname("");
          setLname("");
          setUsername("");
          setEmail("");
          setPassword("");
        }
      });
  };

  return (
    <div className="register-content">
      <h2 className="text">Create a new account</h2>

      <form onSubmit={handleRegister}>
        <Field
          type={"text"}
          name={"fname"}
          label={"First Name"}
          required={true}
          autoComplete={"off"}
          updateValue={(val) => setFname(val)}
        />
        <Field
          type={"text"}
          name={"lname"}
          label={"Last Name"}
          required={true}
          autoComplete={"off"}
          updateValue={(val) => setLname(val)}
        />
        <Field
          type={"text"}
          name={"username"}
          label={"Username"}
          required={true}
          autoComplete={"off"}
          updateValue={(val) => setUsername(val)}
        />
        <Field
          type={"email"}
          name={"email"}
          label={"Email"}
          required={true}
          autoComplete={"off"}
          updateValue={(val) => setEmail(val)}
        />
        <Field
          type={"password"}
          name={"password"}
          label={"Password"}
          required={true}
          autoComplete={"off"}
          updateValue={(val) => setPassword(val)}
        />

        <div className="btn-margin">
          <button type="submit" className="general-button">
            Sign up
          </button>
          {registerError && (
            <p>Account already exists. Please log in or use another email.</p>
          )}
        </div>

        <div className="home-btn-margin">
          <button
            className="general-button"
            onClick={(evt) => history.push("/")}
          >
            Back to Home
          </button>
        </div>
        <p className="acct-txt">
          Already have an account?
          <Link to={"/login/"}>
            <div>
              <button className="general-button">Login</button>
            </div>
          </Link>
        </p>
      </form>
    </div>
  );
}

// ReactDOM.render(
//   <BrowserRouter>
//     <Register />
//   </BrowserRouter>,
//   document.querySelector("#root")
// );
