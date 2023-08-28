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

// function Field(props) {
//   const { label, name, type, updateValue, required, autoComplete, value } =
//     props;
//   const [val, setVal] = useState(value || "");
//   const handleChangeChangeVal = (evt) => {
//     setVal(evt.target.value.trim());
//     if (updateValue) updateValue(evt.target.value.trim());
//   };
//   return (
//     <div>
//       <input
//         type={type}
//         placeholder={label}
//         name={name}
//         required={required}
//         autoComplete={autoComplete}
//         value={val}
//         onChange={handleChangeChangeVal}
//       />
//     </div>
//   );
// }

function Register(props) {
  document.title = "User Registration";
  let history = useHistory();
  const [email, setEmail] = useState(" ");
  const [username, setUsername] = useState(" ");
  const [password, setPassword] = useState(" ");
  const submitRegisterForm = (evt) => {
    evt.preventDefault();
    console.log(email, username, password);
    makeRequest({
      method: "post",
      url: "/register",
      data: { username, email, password },
    }).then((response) => {
      if (response.status === 200) {
        const { success, errors } = response.data;
      }
    });
  };
  return (
    <div>
      <form onSubmit={submitRegisterForm}>
        <Field
          type={"email"}
          name={"email"}
          label={"Email"}
          required={true}
          autoComplete={"off"}
          updateValue={(val) => setEmail(val)}
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
          type={"password"}
          name={"password"}
          label={"Password"}
          required={true}
          autoComplete={"off"}
          updateValue={(val) => setPassword(val)}
        />

        <button>Sign up</button>
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
