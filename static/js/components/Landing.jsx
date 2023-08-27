const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: #bf4f74;
`;

// import { Title } from "../wrapper/LandingPage";
// console.log(Title);

const Landing = () => {
  return (
    <div>
      <Title>
        Inner <span>Join Friendship</span> App
      </Title>
      <p>
        Find strangers who once crossed paths with you at some point in your
        life and start building life-long friendship!
      </p>

      <button className="btn" type="button">
        Log In
      </button>

      <button type="button">Register</button>
      <button type="button">Explore the App</button>
    </div>
  );
};

ReactDOM.render(<Landing />, document.querySelector("#root"));
