const genderOptions = ["Male", "Female", "Other"];

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const ethnicityOptions = [
  "Asian",
  "Black or African American",
  "Hispanic or Latino",
  "White",
  "Native Hawaiian or Other Pacific Islander",
  "American Indian or Alaska Native",
  "Other",
];

const occupationOptions = [
  "Software Developer",
  "Registered Nurse",
  "Accountant",
  "Teacher",
  "Doctor",
  "Marketing Manager",
  "Mechanical Engineer",
  "Graphic Designer",
  "Financial Analyst",
  "Sales Representative",
  "Administrative Assistant",
  "Electrician",
  "Civil Engineer",
  "Writer",
  "Chef",
  "Human Resources Manager",
  "Data Analyst",
  "Nurse Practitioner",
  "Pharmacist",
  "Web Designer",
  "Other",
];

const GeneralInfo = ({ onChange }) => {
  const handleChange = (evt) => {
    const { name, value } = evt.target;
    onChange(name, value);
  };

  const handleBirthdayChange = (evt) => {
    const { name, value } = evt.target;
    let d = new Date(value);

    onChange("birthMonth", months[d.getMonth()]);
    onChange("birthDay", d.getDate());
    onChange("birthYear", d.getFullYear());
  };

  return (
    <div className="info-content">
      <h1 className="text">General Information</h1>
      <div className="form-group">
        <label htmlFor="gender" className="form-label">
          Gender: <span className="text-danger">*</span>
        </label>
        <select
          name="gender"
          id="gender"
          className="form-control form-select"
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          {genderOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="zipCode" className="form-label">
          Zip Code: <span className="text-danger">*</span>
        </label>
        <input
          type="text"
          className="form-control zipcode"
          id="zipCode"
          name="zipCode"
          placeholder="Enter your 5-digit ZIP code"
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label" htmlFor="birthday">
          Birthday: <span className="text-danger">*</span>
        </label>
        <input
          type="date"
          id="birthday"
          name="birthday"
          className="form-control"
          min="1960-01-01"
          max="2005-01-01"
          required
          onChange={handleBirthdayChange}
        />
      </div>
      <div className="form-group">
        <label className="form-label" htmlFor="ethnicity">
          Ethnicity: <span className="text-danger">*</span>
        </label>
        <select
          name="ethnicity"
          id="ethnicity"
          className="form-control"
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          {ethnicityOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="occupation">
          Occupation: <span className="text-danger">*</span>
        </label>
        <select
          name="occupation"
          id="occupation"
          className="form-control"
          onChange={handleChange}
          required
        >
          <option value="">Select</option>
          {occupationOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
