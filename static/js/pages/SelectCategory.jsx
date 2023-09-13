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

// category_mapping = {
//   hobby: 1,
//   cultural_background: 2,
//   support: 3,
//   company: 4,
//   college: 5,
//   high_school: 6,
// };

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
    <div>
      <h2>
        Please select at least one category you would like to be matched with!
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
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

// // Create a dictionary to map selected categories to numbers 1-6
// const mapping = {};
// selectedCategories.forEach((category, index) => {
//   mapping[category] = index + 1;
// });
// setCategoryMapping(mapping);

// // Here you can seed the user input into the database
// // For now, let's just print the mapping
// console.log("Category Mapping:", mapping);

// // Redirect to the next page
// history.push("/enter-user-info/");
