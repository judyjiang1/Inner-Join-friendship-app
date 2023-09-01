// const { useContext, createContext, useState, useEffect, useRef } = React;
// const {
//   Route,
//   Switch,
//   useLocation,
//   BrowserRouter,
//   HashRouter,
//   Redirect,
//   Link,
//   useHistory,
//   withRouter,
// } = ReactRouterDOM;

// import {
//   genderOptions,
//   months,
//   years,
//   ethnicityOptions,
//   occupationOptions,
// } from "./form_data";

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

const days = Array.from({ length: 31 }, (_, i) => i + 1);

const currentYear = new Date().getFullYear();
const youngestAge = 18;
const oldestAge = 65;

const youngestYear = currentYear - youngestAge;
const oldestYear = currentYear - oldestAge;

const years = Array.from(
  { length: oldestAge - youngestAge + 1 },
  (_, i) => oldestYear + i
);

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

  return (
    <div>
      <h2>General Information</h2>
      <div>
        <label>Gender:</label>
        <select name="gender" onChange={handleChange}>
          <option value="">Select</option>
          {genderOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Zip Code:</label>
        <input type="text" name="zipCode" onChange={handleChange} />
      </div>
      <div>
        <label>Birthday:</label>
        <select name="birthMonth" onChange={handleChange}>
          <option value="">Select Month</option>
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
        <select name="birthDay" onChange={handleChange}>
          <option value="">Select Day</option>
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        <select name="birthYear" onChange={handleChange}>
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Ethnicity:</label>
        <select name="ethnicity" onChange={handleChange}>
          <option value="">Select</option>
          {ethnicityOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Occupation:</label>
        <select name="occupation" onChange={handleChange}>
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
