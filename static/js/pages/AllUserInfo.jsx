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

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("/submit-user-info", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        history.push("/my_groups");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <GeneralInfo onChange={handleChange} />
      <CategoryInfo onChange={handleChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}
