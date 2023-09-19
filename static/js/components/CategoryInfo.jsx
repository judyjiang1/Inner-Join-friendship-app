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

// import {
//   culturalBackgroundOptions,
//   collegeOptions,
//   highSchoolOptions,
//   companyOptions,
//   hobbyOptions,
//   supportOptions,
// } from "./form_data";

//////////////////////////
const CategoryInfo = ({ onChange }) => {
  const history = useHistory();

  /* checking which categories are selected */
  const [userTags, setUserTags] = useState([]);
  const [selectHobby, setSelectHobby] = useState(false);
  const [selectCulture, setSelectCulture] = useState(false);
  const [selectSupport, setSelectSupport] = useState(false);
  const [selectWork, setSelectWork] = useState(false);
  const [selectCollege, setSelectCollege] = useState(false);
  const [selectHighSchool, setSelectHighSchool] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/get-user-tags", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setUserTags(data);
      } catch (error) {
        console.error("Error fetching user tag names:", error);
      }
    }

    fetchData();
  }, []);

  const h1 = useRef();
  const h2 = useRef();
  const h3 = useRef();
  const h4 = useRef();
  const h5 = useRef();
  const h6 = useRef();

  useEffect(() => {
    if (userTags.includes("hobbies & interests")) {
      setSelectHobby(true);

      let ivt = setInterval(() => {
        if (h1.current) {
          clearInterval(ivt);
          new Choices(h1.current, {
            allowHTML: true,
            addItems: true,
            removeItems: true,
            removeItemButton: true,
          });
        }
      });
    }

    if (userTags.includes("cultural background")) {
      setSelectCulture(true);
      let ivt = setInterval(() => {
        if (h2.current) {
          clearInterval(ivt);
          new Choices(h2.current, {
            allowHTML: true,
            addItems: true,
            removeItems: true,
            removeItemButton: true,
          });
        }
      });
    }

    if (userTags.includes("support groups")) {
      setSelectSupport(true);
      let ivt = setInterval(() => {
        if (h3.current) {
          clearInterval(ivt);
          new Choices(h3.current, {
            allowHTML: true,
            addItems: true,
            removeItems: true,
            removeItemButton: true,
          });
        }
      });
    }
    if (userTags.includes("current or past workplace(s)")) {
      setSelectWork(true);
      let ivt = setInterval(() => {
        if (h4.current) {
          clearInterval(ivt);
          new Choices(h4.current, {
            allowHTML: true,
            addItems: true,
            removeItems: true,
            removeItemButton: true,
          });
        }
      });
    }
    if (userTags.includes("current or past college(s) attended")) {
      setSelectCollege(true);
      let ivt = setInterval(() => {
        if (h5.current) {
          clearInterval(ivt);
          new Choices(h5.current, {
            allowHTML: true,
            addItems: true,
            removeItems: true,
            removeItemButton: true,
          });
        }
      });
    }
    if (userTags.includes("current or past high school(s) attended")) {
      setSelectHighSchool(true);
      let ivt = setInterval(() => {
        if (h6.current) {
          clearInterval(ivt);
          new Choices(h6.current, {
            allowHTML: true,
            addItems: true,
            removeItems: true,
            removeItemButton: true,
          });
        }
      });
    }
  }, [userTags]);

  // console.log("tags", userTags);
  // console.log(selectHobby);
  // console.log(selectCulture);
  // console.log(selectWork);
  // console.log(selectSupport);
  // console.log(selectCollege);
  // console.log(selectHighSchool);
  /*                           */
  const [hobby, setHobby] = useState([]);
  const [culture, setCulture] = useState([]);
  const [support, setSupport] = useState([]);
  const [work, setWork] = useState([]);
  const [college, setCollege] = useState([]);
  const [highSchool, setHighSchool] = useState([]);

  const handleHobbyChange = (selectedOptions) => {
    setHobby(selectedOptions);
    onChange("hobbies", selectedOptions);
  };

  const handleCultureChange = (selectedOptions) => {
    setCulture(selectedOptions);
    onChange("culturalBackground", selectedOptions);
  };

  const handleSupportChange = (selectedOptions) => {
    setSupport(selectedOptions);
    onChange("supportGroups", selectedOptions);
  };

  const handleWorkChange = (selectedOptions) => {
    setWork(selectedOptions);
    onChange("work", selectedOptions);
  };

  const handleCollegeChange = (selectedOptions) => {
    setCollege(selectedOptions);
    onChange("college", selectedOptions);
  };

  const handleHighSchoolChange = (selectedOptions) => {
    setHighSchool(selectedOptions);
    onChange("highSchool", selectedOptions);
  };

  return (
    <div className="info-content">
      <h3 className="category-text">
        Please make selection(s) for each category below{" "}
      </h3>
      <div className="category-select">
        {selectHobby && (
          <div style={{ marginBottom: "20px" }}>
            <label>
              Hobby & Interests: <span className="text-danger">*</span>
            </label>
            <select
              ref={h1}
              name="hobbies"
              onChange={(e) =>
                handleHobbyChange(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              multiple
              required
            >
              {hobbyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
        {selectCulture && (
          <div style={{ marginBottom: "20px" }}>
            <label>
              Cultural Background: <span className="text-danger">*</span>
            </label>
            <select
              ref={h2}
              name="culturalBackground"
              onChange={(e) =>
                handleCultureChange(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              multiple
              required
            >
              {culturalBackgroundOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
        {selectSupport && (
          <div style={{ marginBottom: "20px" }}>
            <label>
              Support Groups: <span className="text-danger">*</span>
            </label>
            <select
              ref={h3}
              name="supportGroups"
              onChange={(e) =>
                handleSupportChange(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              multiple
              required
            >
              {supportOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
        {selectWork && (
          <div style={{ marginBottom: "20px" }}>
            <label>
              Current or Past Workplace(s):{" "}
              <span className="text-danger">*</span>
            </label>
            <select
              ref={h4}
              name="work"
              onChange={(e) =>
                handleWorkChange(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              multiple
              required
            >
              {companyOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
        {selectCollege && (
          <div style={{ marginBottom: "20px" }}>
            <label>
              Current or Past College(s) Attended:{" "}
              <span className="text-danger">*</span>
            </label>
            <select
              ref={h5}
              name="college"
              onChange={(e) =>
                handleCollegeChange(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              multiple
              required
            >
              {collegeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
        {selectHighSchool && (
          <div style={{ marginBottom: "20px" }}>
            <label>
              Current or Past High School(s) Attended:{" "}
              <span className="text-danger">*</span>
            </label>
            <select
              ref={h6}
              name="highSchool"
              onChange={(e) =>
                handleHighSchoolChange(
                  Array.from(e.target.selectedOptions, (option) => option.value)
                )
              }
              multiple
              required
            >
              {highSchoolOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </div>
  );
};

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
  "Sports & Fitness",
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
