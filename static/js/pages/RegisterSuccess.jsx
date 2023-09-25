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
    <div className="acct-created-content">
      <div className="flexBox">
        <div>
          <div className="acct-created">
            <h4 className="text">Your Account Created!</h4>
          </div>
          <div>
            <div className="congrat-msg">
              Congratulations, your account has been successfully created!
            </div>
            <div className="enter-info-msg">
              Please enter your information to optimize the matching process!{" "}
            </div>
          </div>
          <div>
            <button
              className="btn btn-primary"
              onClick={(evt) => {
                history.push("/select-categories/");
              }}
            >
              Enter your information
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
