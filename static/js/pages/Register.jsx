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

function Register(props) {
  document.title = "User Registration";
  let history = useHistory();
  const [fname, setFname] = useState(" ");
  const [lname, setLname] = useState(" ");
  const [username, setUsername] = useState(" ");
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const submitRegisterForm = (evt) => {
    evt.preventDefault();
    console.log(fname, lname, email, username, password);
    // makeRequest({
    //   method: "post",
    //   url: "/register",
    //   data: { username, email, password },
    // }).then((response) => {
    //   if (response.status === 200) {
    //     const { success, errors } = response.data;
    //   }
    // });
  };
  return (
    <div>
      <h2>Create a new account</h2>
      <form onSubmit={submitRegisterForm}>
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

        <button onClick={(evt) => history.push("/register-success/")}>
          Sign up
        </button>
        <button onClick={(evt) => history.push("/")}>Back to Home</button>
        <p className="more">
          Already have an account?
          <Link to={"/login/"}> Login</Link>
        </p>
      </form>
    </div>
  );
}

ReactDOM.render(
  <BrowserRouter>
    <Register />
  </BrowserRouter>,
  document.querySelector("#root")
);
