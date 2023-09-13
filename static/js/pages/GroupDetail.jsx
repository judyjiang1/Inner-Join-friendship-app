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
      <NavBar></NavBar>
      <h1>{capitalizeTitleCase(groupName)}</h1>
      <GroupMember />
      {/* <ChatBox /> */}
    </div>
  );
}

// const groupDetailContainer = document.getElementById("group-member");
// ReactDOM.render(<GroupDetail />, groupDetailContainer);
