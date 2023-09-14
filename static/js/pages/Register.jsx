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

function Register({ loggedIn }) {
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
    if (loggedIn) {
      alert("Already logged in! Redirecting to your account.");
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
    <div>
      <h2>Create a new account</h2>

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
        {/* gender
        <label for="gender">Gender:</label>
        <select name="gender" id="gender" required>
          <option value="" disabled selected>
            Select your gender
          </option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="transgender">Transgender</option>
          <option value="non-binary">Non-binary</option>
          <option value="not-say">Prefer not to respond</option>
        </select>
        {/* Cultural Background */}
        {/* <Field
          type={"age"}
          name={"age"}
          label={"Age"}
          required={true}
          autoComplete={"off"}
          updateValue={(val) => setAge(val)}
        />
        <Field
          type={"zipcode"}
          name={"zipcode"}
          label={"zip code"}
          required={true}
          autoComplete={"off"}
          updateValue={(val) => setZipcode(val)}
        /> */}

        <button type="submit">Sign up</button>
        {registerError && (
          <p>Account already exists. Please log in or use another email.</p>
        )}
        <button onClick={(evt) => history.push("/")}>Back to Home</button>
        <p className="more">
          Already have an account?
          <Link to={"/login/"}> Login</Link>
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
