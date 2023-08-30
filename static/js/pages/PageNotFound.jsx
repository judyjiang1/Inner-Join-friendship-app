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

function PageNotFound(props) {
  let history = useHistory();
  document.title = "Page Not Found";
  return (
    <div>
      <div>Page Not Found</div>
      <button onClick={(evt) => history.push("/")}>Back to Home</button>
    </div>
  );
}
