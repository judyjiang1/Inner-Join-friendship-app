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

function MyGroups(props) {
  document.title = "Your Groups";
  const history = useHistory();
  return (
    <div>
      <h2>My Groups</h2>
    </div>
  );
}
