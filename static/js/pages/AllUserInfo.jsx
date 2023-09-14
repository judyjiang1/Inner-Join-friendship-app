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
function AllUserInfo({ updateLoginStatus }) {
  const [dialogShown, setDialogShown] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogInfo, setDialogInfo] = useState(null);
  const [dialogButtons, setDialogButtons] = useState(null);

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

    // const formKeys = Object.keys(formData);
    // return fieldsToCheck.some(
    //   (field) => formKeys.includes(field) && formData[field].length === 0
    // );

    return fieldsToCheck.some((field) => formData[field].length > 0);
  };

  const handleSubmit = async (e) => {
    // setIsLoading(true);
    e.preventDefault();

    // Check if the "Gender" field is filled out
    if (isRequiredFieldsEmpty()) {
      // alert("Please fill out all the required fields.");
      setDialogTitle("Warning");
      setDialogInfo(<div>Please fill out all the required fields.</div>);
      setDialogButtons(
        <button className="btn btn-info" onClick={(evt) => setDialogShown("")}>
          Got it
        </button>
      );
      setDialogShown("show");
    } else if (!isValidUSZipCode(formData.zipCode)) {
      // alert("Please enter a valid ZIP code.");
      setDialogTitle("Warning");
      setDialogInfo(<div>Please enter a valid ZIP code.</div>);
      setDialogButtons(
        <button className="btn btn-info" onClick={(evt) => setDialogShown("")}>
          Got it
        </button>
      );
      setDialogShown("show");
    } else if (!isAtLeastOneFieldFilled()) {
      // alert("Please fill out at least one of the fields.");
      setDialogTitle("Warning");
      setDialogInfo(
        <div>
          Please make selections.
          {/* <ul>
            <li>Hobby & Interests</li>
            <li>Cultural Background</li>
            <li>Support Groups</li>
          </ul> */}
        </div>
      );
      setDialogButtons(
        <button className="btn btn-info" onClick={(evt) => setDialogShown("")}>
          Got it
        </button>
      );
      setDialogShown("show");
    } else {
      try {
        const response = await fetch("/api/submit-user-info", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          updateLoginStatus(true);
          history.push("/my-groups");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
    // setIsLoading(false);
  };

  return (
    <DialogContext.Provider
      value={{
        show: dialogShown,
        setShow: setDialogShown,
        title: dialogTitle,
        setTitle: setDialogTitle,
        info: dialogInfo,
        setInfo: setDialogInfo,
        buttons: dialogButtons,
        setButtons: setDialogButtons,
      }}
    >
      <div className="container">
        <GeneralInfo onChange={handleChange} />
        <CategoryInfo onChange={handleChange} />
        <button className="btn btn-primary" onClick={handleSubmit}>
          Submit
        </button>
        {/* {isLoading && <p>Matching...</p>} */}
      </div>
      <Dialog></Dialog>
    </DialogContext.Provider>
  );
}
