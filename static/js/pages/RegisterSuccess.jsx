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

function RegisterSuccess(props) {
  document.title = "Your Account Created";
  const history = useHistory();
  return (
    <div>
      <div className="text">
        Congratulations, your account has been successfully created!
      </div>
      <div>
        Please enter your information to optimize the matching process!{" "}
      </div>
      <button
        onClick={(evt) => {
          history.push("/select-categories/");
        }}
      >
        Enter your information
      </button>
    </div>
  );
}
