function GroupCard(props) {
  const { categoryName, groupName, imgUrl, handleImageClick } = props;

  return (
    <div
      className="card p-3"
      style={{
        width: "100%",
        height: "100%",
        cursor: "pointer",
        background: "rgba(255, 255, 255, 0.178)",
        backdropFilter: "blur(20px)",
      }}
      onClick={handleImageClick}
    >
      <div style={{ textAlign: "left" }}>
        <h5 className="category-text">{categoryName}</h5>
      </div>
      <div>
        <img
          src={imgUrl}
          className="card-img-top"
          alt=""
          style={{ maxHeight: "200px", objectFit: "cover" }}
        />
      </div>

      <div className="card-body">
        <h5 className="card-title group-text">{groupName} Group</h5>
      </div>
    </div>
  );
}
