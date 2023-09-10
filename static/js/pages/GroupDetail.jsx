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
  useParams,
} = ReactRouterDOM;

function GroupDetail() {
  const { groupName } = useParams();
  function capitalizeTitleCase(str) {
    return str.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
  }

  return (
    <div>
      <h1>{capitalizeTitleCase(groupName)}</h1>
      <GroupMember />
    </div>
  );
}
