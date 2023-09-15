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
    <div className="container register-content">
      <div className="flexBox">
        <div className="card border-success">
          <div className="card-header bg-success text-white">
            <h4 className="text-center">Your Account Created</h4>
          </div>
          <div className="card-body">
            <div className="text-success">
              Congratulations, your account has been successfully created!
            </div>
            <div>
              Please enter your information to optimize the matching process!{" "}
            </div>
          </div>
          <div className="card-footer text-center">
            <button
              className="btn btn-success"
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

// function RegisterSuccess(props) {
//   document.title = "Your Account Created";
//   const history = useHistory();
//   return (
//     <div className="container">
//       <div className="flexBox">
//         <div className="card border-success">
//           <div className="card-header bg-success text-white">
//             <h4 className="text-center">Your Account Created</h4>
//           </div>
//           <div className="card-body">
//             <div className="text-success">
//               Congratulations, your account has been successfully created!
//             </div>
//             <div>
//               Please enter your information to optimize the matching process!{" "}
//             </div>
//           </div>
//           <div className="card-footer text-center">
//             <button
//               className="btn btn-success"
//               onClick={(evt) => {
//                 history.push("/select-categories/");
//               }}
//             >
//               Enter your information
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
