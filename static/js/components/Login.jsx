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
  // const { setLoginStatus } = props;
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
        <p>
          Don't have an account?
          {/* <Link to={urlsMap.registerUrl}>Sign Up</Link> */}
        </p>
      </form>
    </div>
  );
}

ReactDOM.render(<Login />, document.querySelector("#login"));

// const Login = () => {
//   return (
//     <div>
//       <h1>Login</h1>
//       <form action="/submit" method="post">
//         <br />
//         <br />
//         <label htmlFor="email">Email</label>
//         <br />
//         <input type="email" id="email" name="email" required />
//         <br />
//         <br />

//         <label htmlFor="password">Password</label>
//         <br />
//         <input type="password" id="password" name="password" required />
//         <br />
//         <br />
//         <input type="submit" value="Submit" />
//         <p>Click here to register.</p>
//       </form>
//     </div>
//   );
// };

// ReactDOM.render(<Login />, document.querySelector("#login"));
