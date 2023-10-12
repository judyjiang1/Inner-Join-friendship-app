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

function AllUserInfo() {
  const [dialogShown, setDialogShown] = useState("");
  const [dialogTitle, setDialogTitle] = useState("");
  const [dialogInfo, setDialogInfo] = useState(null);
  const [dialogButtons, setDialogButtons] = useState(null);

  document.title = "InnerJoin | Enter Information";
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

  const isValidUSZipCode = (zipCode) => {
    // Regular expression for 5-digit and 9-digit ZIP codes
    const zipCodePattern = /^\d{5}(-\d{4})?$/;
    return zipCodePattern.test(zipCode);
  };

  const yearInRange = (year) => {
    return /^(196\d|197\d|198\d|199\d|200[0-5])$/.test(year);
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
    e.preventDefault();

    if (isRequiredFieldsEmpty()) {
      setDialogTitle("Warning");
      setDialogInfo(<div>Please fill out all the required fields.</div>);
      setDialogButtons(
        <button
          className="btn btn-primary"
          onClick={(evt) => setDialogShown("")}
        >
          Got it
        </button>
      );
      setDialogShown("show");
    } else if (!isValidUSZipCode(formData.zipCode)) {
      setDialogTitle("Warning");
      setDialogInfo(<div>Please enter a valid ZIP code.</div>);
      setDialogButtons(
        <button
          className="btn btn-primary"
          onClick={(evt) => setDialogShown("")}
        >
          Got it
        </button>
      );
      setDialogShown("show");
    } else if (
      !yearInRange(
        // formData.birthMonth,
        // formData.birthDay,
        formData.birthYear
      )
    ) {
      setDialogTitle("Warning");
      setDialogInfo(
        <div>Please enter a valid year within the range of 1960-2005.</div>
      );
      setDialogButtons(
        <button
          className="btn btn-primary"
          onClick={(evt) => setDialogShown("")}
        >
          Got it
        </button>
      );
      setDialogShown("show");
    } else if (!isAtLeastOneFieldFilled()) {
      setDialogTitle("Warning");
      setDialogInfo(<div>Please make selection(s) for each category.</div>);
      setDialogButtons(
        <button
          className="btn btn-primary"
          onClick={(evt) => setDialogShown("")}
        >
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
          history.push("/my-groups");
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    }
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
        <div
          className="row"
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: 80,
            marginBottom: 100,
          }}
        >
          <GeneralInfo className="col" onChange={handleChange} />
          <CategoryInfo className="col" onChange={handleChange} />

          <div className="row info-submit-btn">
            <button className="info-btn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
      <Dialog></Dialog>
    </DialogContext.Provider>
  );
}
