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

function SelectCategory(props) {
  document.title = "Select category";

  const history = useHistory();

  const categories = [
    "Hobbies & Interests",
    "Cultural Background",
    "Support Groups",
    "Current or Past Workplace(s)",
    "Current or Past College(s) Attended",
    "Current or Past High School(s) Attended",
  ];

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [categoryMapping, setCategoryMapping] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedCategories([...selectedCategories, value]);
    } else {
      setSelectedCategories(
        selectedCategories.filter((category) => category !== value)
      );
    }
  };

  const handleSubmit = async () => {
    if (selectedCategories.length > 0) {
      const selectedData = {
        selectedCategories: selectedCategories,
      };

      try {
        const response = await fetch("/api/select-categories", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(selectedData),
        });

        if (response.ok) {
          history.push("/enter-user-info/");
        } else {
          console.error("Error saving selections:", response.statusText);
        }
      } catch (error) {
        console.error("Error saving selections:", error);
      }
    } else {
      alert("Please select at least one category.");
    }
  };

  return (
    <div className="category-content">
      <h2 className="text">
        Please select at least one category you would like to be matched with!
      </h2>
      <form className="category-form">
        {categories.map((category) => (
          <div className="category-item" key={category}>
            <label>
              <input
                type="checkbox"
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={handleCheckboxChange}
              />
              <span className="category-text">{category}</span>
            </label>
          </div>
        ))}
      </form>
      <div className="submit-btn-margin">
        <button className="category-submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
    </div>
  );
}
