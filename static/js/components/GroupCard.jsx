function GroupCard(props) {
  const { categoryName, groupName, imgUrl, handleImageClick } = props;

  return (
    <div className="card" onClick={handleImageClick} style={{ width: "100%" }}>
      <div>
        <img src={imgUrl} className="card-img-top" alt="" />
      </div>

      <div className="card-body">
        <h5 className="card-title">{categoryName}</h5>

        <h5 className="card-title">{groupName}</h5>
      </div>

      {/* <div className="card-body pt-0 container-fluid">
        <div className="row">
          <div className="col-12 col-lg-6">
            <button
              type="button"
              className="btn btn-sm btn-success d-inline-block"
              onClick={() => handleJoinGroup(code)}
            >
              Join
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
}
