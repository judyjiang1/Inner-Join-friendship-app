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

function Landing() {
  document.title = "Welcome";
  return (
    <div>
      {/* <PageNav /> */}
      <h2>
        <span>Chat App</span>
      </h2>

      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
      <Link to="/demo">Explore the App</Link>
    </div>
  );
}

ReactDOM.render(
  <BrowserRouter>
    <Landing />
  </BrowserRouter>,
  document.querySelector("#root")
);
