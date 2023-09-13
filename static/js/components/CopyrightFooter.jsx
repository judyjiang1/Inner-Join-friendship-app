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

const CopyrightFooter = () => {
  const currentYear = new Date().getFullYear();

  // const footerStyle = {
  //   backgroundColor: "#333",
  //   color: "white",
  //   textAlign: "center",
  //   padding: "10px",
  //   position: "fixed",
  //   bottom: "0",
  //   width: "100%",
  // };

  return (
    <footer className="footer">
      <p>&copy; {currentYear} Judy Jiang. All Rights Reserved.</p>
    </footer>
  );
};
