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

const _userInfo = { user_id: 0, fname: 0, lname: "", email: "", username: "" };
let _isLogin = false;

const AuthContext = createContext();

function PrivateRoute({ children, ...rest }) {
  const { loginStatus } = useContext(AuthContext);
  // console.log(loginStatus);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        return loginStatus ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}

function PublicRoute({ children, ...rest }) {
  const { loginStatus } = useContext(AuthContext);
  const history = useHistory();

  // console.log(loginStatus);
  return (
    <Route
      {...rest}
      render={({ location }) => {
        if (!loginStatus) {
          return children;
        } else {
          return children;
        }
      }}
    />
  );
}

async function checkAuthStatus() {
  return authCheck()
    .then((res) => {
      if (res.success) {
        _isLogin = true;
        _userInfo.user_id = res.user_id;
        _userInfo.username = res.username;
        _userInfo.fname = res.fname;
        _userInfo.lname = res.lname;
        _userInfo.email = res.email;
        return { info: _userInfo, status: _isLogin };
      } else {
        _isLogin = false;
        _userInfo.user_id = 0;
        _userInfo.username = "";
        _userInfo.fname = "";
        _userInfo.lname = "";
        _userInfo.email = "";
        return { info: _userInfo, status: _isLogin };
      }
    })
    .catch((err) => {
      _isLogin = false;
      _userInfo.user_id = 0;
      _userInfo.username = "";
      _userInfo.fname = "";
      _userInfo.lname = "";
      _userInfo.email = "";
      return { info: _userInfo, status: _isLogin };
    });
}

function App() {
  const [loginStatus, setLoginStatus] = useState(_isLogin);
  const [userInfo, setUserInfo] = useState(_userInfo);

  return (
    <AuthContext.Provider
      value={{ loginStatus, setLoginStatus, userInfo, setUserInfo }}
    >
      <BrowserRouter>
        <Switch>
          <PublicRoute path="/" exact>
            <div>
              <Landing />
            </div>
          </PublicRoute>
          <PublicRoute path="/login/" exact>
            <div className="App">
              <Login />
            </div>
          </PublicRoute>
          <PublicRoute path="/register/" exact>
            <div className="App">
              <Register />
            </div>
          </PublicRoute>
          <PrivateRoute path="/register-success/" exact>
            <div className="App">
              <RegisterSuccess></RegisterSuccess>
            </div>
          </PrivateRoute>
          <PrivateRoute path="/select-categories/" exact>
            <div className="App">
              <SelectCategory></SelectCategory>
            </div>
          </PrivateRoute>
          <PrivateRoute path="/enter-user-info/" exact>
            <div className="App">
              <AllUserInfo></AllUserInfo>
            </div>
          </PrivateRoute>
          <PrivateRoute path="/my-super-match/" exact>
            <div>
              <SuperMatch />
            </div>
          </PrivateRoute>
          <PrivateRoute path="/my-groups/" exact>
            <div>
              <MyGroups />
            </div>
          </PrivateRoute>
          <PrivateRoute path="/my-groups/:categoryName/:groupName">
            <ChatRoom></ChatRoom>
          </PrivateRoute>
          <Route path={"*"}>
            <div className="App">
              <PageNotFound></PageNotFound>
            </div>
          </Route>
        </Switch>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

checkAuthStatus().then((res) => {
  // console.log(res);
  ReactDOM.render(<App />, document.querySelector("#root"));
});
