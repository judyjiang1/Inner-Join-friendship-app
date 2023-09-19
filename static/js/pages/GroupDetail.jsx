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
