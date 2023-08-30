const { useContext, createContext, useState, useEffect, useRef } = React;
// const { MultiSelect } = ReactMultiSelectComponent;
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
    "Hobby & Interest",
    "Cultural Background",
    "Support Groups",
    "Current or Past Workplace",
    "Current or Past College",
    "Current or Past High School",
  ];

  const [selectedCategories, setSelectedCategories] = useState([]);

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

  return (
    <div>
      <h2>
        Please select at least one category you are interested in for matching!
      </h2>
      <form>
        {categories.map((category) => (
          <div key={category}>
            <label>
              <input
                type="checkbox"
                value={category}
                checked={selectedCategories.includes(category)}
                onChange={handleCheckboxChange}
              />
              {category}
            </label>
          </div>
        ))}
      </form>
      <button onClick={(evt) => history.push("/enter-user-info/")}>
        Submit{" "}
      </button>
    </div>
  );
}
