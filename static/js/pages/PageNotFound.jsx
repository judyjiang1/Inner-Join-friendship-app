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

// const Error = () => {
//   const error = useRouteError();
//   console.log(error);
//   if (error.status === 404) {
//     return (
//       <div>
//         <h3> Page not found</h3>
//         <Link to="/homepage">Return back to home page</Link>
//       </div>
//     );
//   }
// };

// ReactDOM.render(
//   <BrowserRouter>
//     <Error />
//   </BrowserRouter>,
//   document.querySelector("#root")
// );
