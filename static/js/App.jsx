const { useContext, createContext, useState, useEffect, useRef } = React;
const {
  Route,
  Routes,
  Switch,
  useLocation,
  BrowserRouter,
  HashRouter,
  Redirect,
  Link,
  useHistory,
  withRouter,
  useRouteError,
} = ReactRouterDOM;

// let isLogin = true;
// const AuthContext = createContext();

function App() {
  // const [loginStatus, setLoginStatus] = useState(isLogin);
  // useEffect(() => {
  //   console.log(loginStatus);
  // }, [loginStatus]);
  const [loggedIn, setLoggedIn] = useState(false);
  const [fname, setFname] = useState(null);

  useEffect(() => {
    // Check if the user is logged in when the component mounts
    fetch("/check_login")
      .then((response) => response.json())
      .then((data) => {
        if (data.loggedIn) {
          setLoggedIn(true);
          setFname(data.userfname);
        }
      })
      .catch((error) => console.error("Error checking login status", error));
  }, []);

  const updateLoginStatus = (status) => {
    setLoggedIn(status);
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <div>
            <Landing
              loggedIn={loggedIn}
              fname={fname}
              updateLoginStatus={updateLoginStatus}
            />
          </div>
        </Route>
        <Route path="/login/" exact>
          <div className="App">
            <Login
              loggedIn={loggedIn}
              fname={fname}
              updateLoginStatus={updateLoginStatus}
            />
          </div>
        </Route>
        <Route path="/register/" exact>
          <div className="App">
            <Register
              loggedIn={loggedIn}
              updateLoginStatus={updateLoginStatus}
            />
          </div>
        </Route>
        <Route path="/register-success/" exact>
          <div className="App">
            <RegisterSuccess></RegisterSuccess>
          </div>
        </Route>
        <Route path="/select-categories/" exact>
          <div className="App">
            <SelectCategory></SelectCategory>
          </div>
        </Route>
        <Route path="/enter-user-info/" exact>
          <div className="Info">
            <AllUserInfo updateLoginStatus={updateLoginStatus} />
          </div>
        </Route>
        <Route path="/my-groups/" exact>
          <div>
            <MyGroups className="Info" updateLoginStatus={updateLoginStatus} />
          </div>
        </Route>
        <Route exact path="/" component={MyGroups} />
        <Route path="/my-groups/:groupName" component={GroupDetail} />
        <Route path={"*"}>
          <div className="container">
            <PageNotFound></PageNotFound>
          </div>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));

// function App() {
//   return (
//     <>
//       <Routes>
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Register />} />
//       </Routes>
//     </>
//   );
// }

// ReactDOM.render(
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>,
//   document.querySelector("#root")
// );
