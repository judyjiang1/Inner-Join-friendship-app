const { useContext, createContext, useState, useEffect, useRef, useMemo } =
  React;
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

let socket = null;
const formatTime = (ts) => {
  return moment(ts).format("YYYY-MM-DD hh:mm:ss");
};

function RoomMember({
  user_id,
  fname,
  lname,
  email,
  last_seen,
  is_online,
  current_user_id,
  ...props
}) {
  let st = is_online ? <span>Online</span> : <span>Offline</span>;
  return (
    <div id={`member-${user_id}`}>
      {fname} {lname} {current_user_id === user_id ? <span>Me</span> : st}
    </div>
  );
}
