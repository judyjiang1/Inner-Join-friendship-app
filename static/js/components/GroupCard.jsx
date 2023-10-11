function GroupCard(props) {
  const { categoryName, groupName, imgUrl, handleImageClick } = props;

  const formatTitle = (string) => {
    return string.replace(/\w\S*/g, (title) => {
      if (title.toLowerCase() === "or") {
        return title;
      } else {
        return title.charAt(0).toUpperCase() + title.substr(1).toLowerCase();
      }
    });
  };
  const categoryNameTitle = formatTitle(categoryName);

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
        <h5 className="category-text">{categoryNameTitle}</h5>
      </div>
      <div>
        <img
          src={imgUrl}
          className="card-img-top"
          alt="category-image"
          style={{ maxHeight: "200px", objectFit: "cover" }}
        />
      </div>

      <div className="card-body">
        <h5 className="card-title group-text">{groupName} Group</h5>
      </div>
    </div>
  );
}
