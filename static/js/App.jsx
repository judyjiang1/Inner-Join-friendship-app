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

let isLogin = true;

function App() {
  const [loginStatus, setLoginStatus] = useState(isLogin);
  useEffect(() => {
    console.log(loginStatus);
  }, [loginStatus]);
  return (
    <BrowserRouter>
      {/* <Switch> */}
      <Route path="/" exact>
        <div>
          <Landing></Landing>
        </div>
      </Route>
      <Route path="/login/" exact>
        <div>
          <Login></Login>
        </div>
      </Route>
      <Route path="/register/" exact>
        <div>
          <Register></Register>
        </div>
      </Route>
      <Route path={"*"}>
        <div className="container">
          <PageNotFound></PageNotFound>
        </div>
      </Route>
      {/* </Switch> */}
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
