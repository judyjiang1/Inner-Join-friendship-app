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

function Login(props) {
  document.title = "User Login";
  const history = useHistory();
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const submitLoginForm = (evt) => {
    evt.preventDefault();
    console.log(email, username, password);
    makeRequest({
      method: "post",
      url: "/login",
      data: { email, password },
    }).then((response) => {
      if (response.status === 200) {
        const { success, errors } = response.data;
      }
    });
  };
  return (
    <div>
      <div>User Login</div>
      <form onSubmit={submitLoginForm}>
        <input
          type="email"
          placeholder="Enter your email"
          required={true}
          autoComplete="off"
          value={email}
          onChange={(evt) => setEmail(evt.target.value.trim())}
        />
        <input
          type="password"
          placeholder="Password"
          required={true}
          autoComplete="off"
          value={password}
          onChange={(evt) => setPassword(evt.target.value.trim())}
        />
        <button>Log in</button>

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
    <Login />
  </BrowserRouter>,
  document.querySelector("#root")
);
