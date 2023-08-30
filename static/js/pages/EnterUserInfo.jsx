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

//
//
//
//
// Form Input Fields
//
const genderOptions = [
  { value: "male", label: "Male" },
  { value: "female", label: "Female" },
  { value: "other", label: "Other" },
];

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

const ethnicityOptions = ["Asian", "Black", "Hispanic", "White", "Other"];

const occupationOptions = ["Student", "Professional", "Artist", "Other"];

const culturalBackgroundOptions = [
  "American",
  "Chinese",
  "Indian",
  "Spanish",
  "Japanese",
  "Russian",
  "Mexican",
  "German",
  "French",
  "Italian",
  "British",
  "Brazilian",
  "Korean",
  "Canadian",
  "Australian",
  "African",
  "Middle Eastern",
  "Latin American",
  "Southeast Asian",
  "Scandinavian",
  "Eastern European",
  "Arabic",
  "Jewish",
  "Indigenous",
  "Pacific Islander",
];

const collegeOptions = [
  "Massachusetts Institute of Technology",
  "Stanford University",
  "Duke University",
  "University of Pennsylvania",
  "Northwestern University",
  "Claremont McKenna College",
  "University of Chicago",
  "Carnegie Mellon University",
  "Johns Hopkins University",
  "Princeton University",
  "Brown University",
  "Harvard University",
  "Cornell University",
  "Columbia University in the City of New York",
  "Yale University",
  "University of Notre Dame",
  "University of California - Berkeley",
  "University of Southern California",
  "Georgetown University",
  "Bowdoin College",
  "Vanderbilt University",
  "Dartmouth College",
  "Rice University",
  "Washington University in St Louis",
  "University of Michigan - Ann Arbor",
  "Georgia Institute of Technology - Main Campus",
  "Williams College",
  "California Institute of Technology",
  "University of California - Los Angeles",
  "New York University",
  "Harvey Mudd College",
  "University of Virginia - Main Campus",
  "University of Wisconsin - Madison",
  "Tufts University",
  "Emory University",
  "University of Maryland - College Park",
  "Lehigh University",
  "University of Washington - Seattle Campus",
  "Colgate University",
  "George Washington University",
  "Boston University",
  "Teachers College at Columbia University",
  "University of North Carolina at Chapel Hill",
  "University of Illinois at Urbana-Champaign",
  "Boston College",
  "Pomona College",
  "Purdue University - Main Campus",
  "Virginia Tech",
  "University of California - San Diego",
  "University of California - Santa Barbara",
];

const highSchoolOptions = [
  "Academy at the Lakes",
  "Arlington Catholic High School",
  "Army & Navy Academy",
  "Ben Lippen School",
  "Besant Hill School",
  "Buffalo Seminary School",
  "Colorado Rocky Mountain School",
  "Darlington School",
  "Emma Willard School",
  "Fay School ",
  "Florida Prep",
  "Fryeburg Academy",
  "Grier School",
  "Hawai'i Preparatory Academy",
  "Hebron Academy",
  "Idyllwild Arts Academy",
  "Interlochen Arts Academy",
  "Kent School",
  "Lake Mary Preparatory School",
  "Lake Forest Academy",
  "La Lumiere School",
  "Lyndon Institute",
  "Lincoln Academy",
  "Maine Central Institute",
  "Matignon High School",
  "Montverde Academy",
  "Norwich Free Academy",
  "Northfield Mount Hermon School",
  "Oakwood Friends School",
  "Orme School",
  "Phillips Academy ",
  " Phillips Exeter Academy",
  "Saint Andrew's School",
  "San Domenico School",
  "Southwestern Academy",
  "St. Croix Academy",
  "Stevenson School",
  "Stoneleigh-Burnham School",
  "Tallulah Falls School",
  "The Athenian School  ",
  "The Brook Hill School",
  "The Cambridge School of Weston",
  "The Hun School of Princeton",
  "The Northwest School",
  "Verde Valley School",
  "Vanguard School",
  "Thornton Academy",
  "The Webb School",
  "Wisconsin Lutheran High School",
  "Wilbraham & Monson Academy",
];

const companyOptions = [
  "Walmart",
  "Amazon",
  "Exxon Mobil",
  "Apple",
  "UnitedHealth Group",
  "CVS Health",
  "Berkshire Hathaway",
  "Alphabet",
  "McKesson",
  "Chevron",
  "AmerisourceBergen",
  "Costco Wholesale",
  "Microsoft ",
  "Cardinal Health ",
  "Cigna",
  "Marathon Petroleum",
  "Phillips 66",
  "Valero Energy ",
  "Ford Motor",
  "Home Depot",
  "General Motors",
  "Elevance Health",
  "JPMorgan Chase",
  "Kroger",
  "Centene",
  "Verizon Communications",
  "Walgreens Boots",
  "Fannie Mae",
  "Comcast",
  "AT&T",
  "Meta Platforms",
  "Bank of America",
  "Target",
  "Dell Technologies",
  "Archer Daniels Midland (ADM)",
  "Citigroup",
  "United Parcel Service",
  "Pfizer",
  "Lowe’s",
  "Johnson & Johnson",
  "FedEx",
  "Humana",
  "Energy Transfer",
  "State Farm Insurance",
  "Freddie Mac",
  "PepsiCo",
  "Wells Fargo",
  "Walt Disney",
  "ConocoPhillips",
  "Tesla",
  "Procter & Gamble",
  "General Electric",
  "Albertsons",
  "MetLife",
  "Goldman Sachs Group",
  "Sysco",
  "Raytheon Technologies",
  "Boeing",
  "StoneX Group",
  "Lockheed Martin",
  "Morgan Stanley",
  "Intel",
  "HP",
  "TD Synnex",
  "International Business Machines",
  "HCA Healthcare",
  "Prudential Financial",
  "Caterpillar",
  "Merck",
  "World fuel services",
  "New York Life Insurance",
  "Enterprise Products Partners",
  "AbbVie",
  "Plains GP Holdings",
  "Dow",
  "AIG",
  "American Express",
  "Publix Super Markets",
  "Charter Communications",
  "Tyson Foods",
  "Deere",
  "Cisco Systems",
  "Nationwide",
  "Delta Airlines",
  "Delta air lines",
  "Liberty Mutual Insurance Group",
  "TJX",
  "Progressive",
  "American Airlines Group",
  "CHS",
  "Performance Food Group",
  "PBF Energy",
  "Nike",
  "Best Buy",
  "Bristol-Myers Squibb",
  "United Airlines Holdings ",
  "Thermo Fisher Scientific",
  "Qualcomm",
  "Abbott Laboratories",
  "Coca-Cola",
];

const hobbyOptions = [
  "Reading",
  "Sport & Fitness",
  "Music",
  "Gardening",
  "Cooking & Baking",
  "Gaming",
  "Traveling",
  "Writing",
  "Collecting",
  "DIY & Home Improvement",
  "Cars",
  "Photography & Film",
  "Arts & Crafts",
];

const supportOptions = [
  "Stress & Anxiety",
  "Relationships",
  "Career & Education",
  "Mental Health",
  "Physical Health",
  "Personal Development",
  "Life Events & Transitions",
];

// function starts here
//
//
//
//
//
//
//

function EnterUserInfo(props) {
  document.title = "Enter your info";
  const history = useHistory();
  const [formData, setFormData] = useState({
    gender: "",
    birthMonth: "",
    birthDay: "",
    birthYear: "",
    ethnicity: [],
    occupation: [],
    hobby: [],
    culturalBackground: [],
    support: [],
    company: [],
    college: [],
    highSchool: [],
  });

  // const [errors, setErrors] = useState({
  //   name: "",
  //   email: "",
  //   password: "",
  //   // ... (other form fields)
  // });

  // const validateForm = () => {
  //   const newErrors = {};

  //   // Validate Name
  //   if (!formData.name) {
  //     newErrors.name = "Name is required";
  //   }

  //   // Validate Email
  //   if (!formData.email) {
  //     newErrors.email = "Email is required";
  //   } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
  //     newErrors.email = "Email is invalid";
  //   }

  //   // Validate Password
  //   if (!formData.password) {
  //     newErrors.password = "Password is required";
  //   } else if (formData.password.length < 6) {
  //     newErrors.password = "Password must be at least 6 characters long";
  //   }

  // ... (other validations)

  //   setErrors(newErrors);
  //   return Object.keys(newErrors).length === 0;
  // };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleEthnicityChange = (selectedOptions) => {
    setFormData({
      ...formData,
      ethnicity: selectedOptions.map((option) => option.value),
    });
  };

  const handleOccupationChange = (selectedOptions) => {
    setFormData({
      ...formData,
      occupation: selectedOptions.map((option) => option.value),
    });
  };

  const handleHobbyChange = (selectedOptions) => {
    setFormData({
      ...formData,
      hobby: selectedOptions.map((option) => option.value),
    });
  };

  const handleCulturalChange = (selectedOptions) => {
    setFormData({
      ...formData,
      culturalBackground: selectedOptions.map((option) => option.value),
    });
  };

  const handleSupportChange = (selectedOptions) => {
    setFormData({
      ...formData,
      support: selectedOptions.map((option) => option.value),
    });
  };

  const handleCompanyChange = (selectedOptions) => {
    setFormData({
      ...formData,
      company: selectedOptions.map((option) => option.value),
    });
  };

  const handleCollegeChange = (selectedOptions) => {
    setFormData({
      ...formData,
      college: selectedOptions.map((option) => option.value),
    });
  };

  const handleHighSchoolChange = (selectedOptions) => {
    setFormData({
      ...formData,
      highSchool: selectedOptions.map((option) => option.value),
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateForm();

    if (isValid) {
      console.log(formData);
      // Perform further actions (e.g., submit data to backend)
    }
  };

  return (
    <div>
      <h1>Enter your information for group matching!</h1>
      <form onSubmit={handleSubmit}>
        <label>Gender:</label>
        <select
          name="gender"
          value={formData.gender}
          onChange={handleInputChange}
        >
          <option value="">Select Gender</option>
          {genderOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <br></br>
        <label>Birthday:</label>
        <select
          name="birthMonth"
          value={formData.birthMonth}
          onChange={handleInputChange}
        >
          <option value="">Select Month</option>
          {months.map((month, index) => (
            <option key={index} value={month}>
              {month}
            </option>
          ))}
        </select>
        <select
          name="birthDay"
          value={formData.birthDay}
          onChange={handleInputChange}
        >
          <option value="">Select Day</option>
          {days.map((day) => (
            <option key={day} value={day}>
              {day}
            </option>
          ))}
        </select>
        <select
          name="birthYear"
          value={formData.birthYear}
          onChange={handleInputChange}
        >
          <option value="">Select Year</option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
        <br></br>
        {/* <div className="error-message">{errors.ethnicity}</div> */}
        <label>Ethnicity:</label>
        <br></br>
        <select
          name="ethnicity"
          multiple={true}
          value={formData.ethnicity}
          onChange={(e) =>
            handleEthnicityChange(Array.from(e.target.selectedOptions))
          }
          size={10}
        >
          {ethnicityOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <br></br>
        {/* <div className="error-message">{errors.occupation}</div> */}
        <label>Occupation:</label>
        <br></br>
        <select
          name="occupation"
          multiple={true}
          value={formData.occupation}
          onChange={(e) =>
            handleOccupationChange(Array.from(e.target.selectedOptions))
          }
          size={10}
        >
          {occupationOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <br></br>
        <label>Select your hobbies:</label>
        <br></br>
        <select
          name="hobby"
          multiple={true}
          value={formData.hobby}
          onChange={(e) =>
            handleHobbyChange(Array.from(e.target.selectedOptions))
          }
          size={10}
        >
          {hobbyOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <br></br>
        <label>Select your cultural background:</label>
        <br></br>
        <select
          name="culturalBackground"
          multiple={true}
          value={formData.culturalBackground}
          onChange={(e) =>
            handleCulturalChange(Array.from(e.target.selectedOptions))
          }
          size={10}
        >
          {culturalBackgroundOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <br></br>
        <label>Select any support groups you are interested in:</label>
        <br></br>
        <select
          name="support"
          multiple={true}
          value={formData.support}
          onChange={(e) =>
            handleSupportChange(Array.from(e.target.selectedOptions))
          }
          size={10}
        >
          {supportOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <br></br>
        <label>Select your past and current workplace:</label>
        <br></br>
        <select
          name="company"
          multiple={true}
          value={formData.support}
          onChange={(e) =>
            handleCompanyChange(Array.from(e.target.selectedOptions))
          }
          size={30}
        >
          {companyOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <br></br>
        <label>
          Select college(s) you are currently or previsouly enrolled in:{" "}
        </label>
        <br></br>
        <br></br>
        <select
          name="college"
          multiple={true}
          value={formData.support}
          onChange={(e) =>
            handleCollegeChange(Array.from(e.target.selectedOptions))
          }
          size={30}
        >
          {collegeOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <br></br>
        <label>
          Select high school(s) you are currently or previsouly enrolled in:
        </label>
        <br></br>
        <select
          name="highSchool"
          multiple={true}
          value={formData.support}
          onChange={(e) =>
            handleHighSchoolChange(Array.from(e.target.selectedOptions))
          }
          size={30}
        >
          {highSchoolOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <br></br>
        <br></br>
        <button onClick={(evt) => history.push("/my-groups/")}>
          Start matching!
        </button>
      </form>
    </div>
  );
}

ReactDOM.render(
  <BrowserRouter>
    <Register />
  </BrowserRouter>,
  document.querySelector("#root")
);

{
  /* <label>Ethnicity:</label>
        <MultiSelect
          options={ethnicityOptions.map((option) => ({
            label: option,
            value: option,
          }))}
          value={formData.ethnicity.map((option) => ({
            label: option,
            value: option,
          }))}
          onChange={handleEthnicityChange}
          labelledBy="Select"
        />

        <label>Occupation:</label>
        <MultiSelect
          options={occupationOptions.map((option) => ({
            label: option,
            value: option,
          }))}
          value={formData.occupation.map((option) => ({
            label: option,
            value: option,
          }))}
          onChange={handleOccupationChange}
          labelledBy="Select"
        /> */
}
