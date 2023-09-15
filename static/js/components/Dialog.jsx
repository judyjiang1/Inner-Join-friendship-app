const { useContext, createContext } = React;

let DialogContext = createContext("");

function Dialog() {
  let { show, setShow, title, setTitle, info, setInfo, buttons, setButtons } =
    useContext(DialogContext);
  return (
    <div
      className={"modal fade " + show}
      id="exampleModalLive"
      tabIndex="-1"
      aria-labelledby="exampleModalLiveLabel"
      style={{ display: show ? "block" : "none" }}
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLiveLabel">
              {title}
            </h5>
            <button
              type="button"
              className="close modal-btn"
              data-dismiss="modal"
              aria-label="Close"
              onClick={(evt) => {
                setShow("");
              }}
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
          <div className="modal-body">{info}</div>
          <div className="modal-footer">{buttons}</div>
        </div>
      </div>
    </div>
  );
}
