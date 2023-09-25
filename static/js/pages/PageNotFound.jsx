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
  useRouteError,
} = ReactRouterDOM;

function PageNotFound() {
  let history = useHistory();
  document.title = "Page Not Found";
  return (
    <div className="info-content container">
      <div
        style={{
          color: "white",
          margin: 20,
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        This page doesn't exist. Please return to home page.
      </div>
      <button className="btn btn-primary" onClick={(evt) => history.push("/")}>
        Back to Home
      </button>
    </div>
  );
}
