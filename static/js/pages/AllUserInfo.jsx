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

//////////////////////////
function AllUserInfo() {
  document.title = "Enter your information";
  let history = useHistory();
  const [formData, setFormData] = useState({
    gender: "",
    zipCode: "",
    birthMonth: "",
    birthDay: "",
    birthYear: "",
    ethnicity: "",
    occupation: "",
    hobbies: [],
    culturalBackground: [],
    supportGroups: [],
    work: [],
    college: [],
    highSchool: [],
  });
  // const [isLoading, setIsLoading] = useState(false);

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const isValidUSZipCode = (zipCode) => {
    // Regular expression for 5-digit and 9-digit ZIP codes
    const zipCodePattern = /^\d{5}(-\d{4})?$/;
    return zipCodePattern.test(zipCode);
  };

  const isRequiredFieldsEmpty = () => {
    const requiredFields = [
      "gender",
      "zipCode",
      "birthMonth",
      "birthDay",
      "birthYear",
      "ethnicity",
      "occupation",
    ];

    return requiredFields.some((field) => formData[field] === "");
  };

  const isAtLeastOneFieldFilled = () => {
    const fieldsToCheck = [
      "hobbies",
      "culturalBackground",
      "supportGroups",
      "work",
      "college",
      "highSchool",
    ];

    return fieldsToCheck.some((field) => formData[field].length > 0);
  };

  const handleSubmit = async (e) => {
    // setIsLoading(true);
    e.preventDefault();

    // Check if the "Gender" field is filled out
    if (isRequiredFieldsEmpty()) {
      alert("Please fill out all the required fields.");
    } else if (!isValidUSZipCode(formData.zipCode)) {
      alert("Please enter a valid ZIP code.");
    } else if (!isAtLeastOneFieldFilled()) {
      alert("Please fill out at least one of the fields.");
    } else {
      try {
        const response = await fetch("/submit-user-info", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          history.push("/my-groups");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
    // setIsLoading(false);
  };

  return (
    <div>
      <GeneralInfo onChange={handleChange} />
      <CategoryInfo onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>
      {/* {isLoading && <p>Matching...</p>} */}
    </div>
  );
}
