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

const messages = [
  'Click "Explore the App" to log in as a demo user and test the application (make sure you are not already logged in, otherwise this feature will be disabled)',
  "Create a new account 👤",
  "Enter your information and select preferences 🧑‍💻 👩‍💻 ",
  "Groups will be created according to your preferences ",
  "Click on each group to join the group chat and begin forging new friendships!",
];

function InstructionBox({ isOpen }) {
  const [step, setStep] = useState(1);
  // const [isOpen, setIsOpen] = useState(false);

  function handlePrevious() {
    if (step > 1) setStep((s) => s - 1);
  }

  function handleNext() {
    if (step < 5) {
      setStep((s) => s + 1);
    }
  }

  // const toggleOnOFF = () => {
  //   setIsOpen(!isOpen);
  // };

  return (
    <div>
      {/* <div className="container">
        <button
          className="instruction_btn"
          onClick={() => setIsOpen((is) => !is)}
        >
          View Instructions
        </button>
      </div> */}

      {isOpen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>Step 1</div>
            <div className={step >= 2 ? "active" : ""}>Step 2</div>
            <div className={step >= 3 ? "active" : ""}>Step 3</div>
            <div className={step >= 4 ? "active" : ""}>Step 4</div>
            <div className={step >= 5 ? "active" : ""}>Step 5</div>
          </div>

          <StepMessage>{messages[step - 1]}</StepMessage>

          <div className="buttons">
            <Button bgColor="#0d6efd" textColor="#fff" onClick={handlePrevious}>
              Previous
            </Button>

            <Button bgColor="#0d6efd" textColor="#fff" onClick={handleNext}>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepMessage({ children }) {
  return <div className="message">{children}</div>;
}

function Button({ textColor, bgColor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgColor, color: textColor }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
