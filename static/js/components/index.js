function App() {
  return (
    <div>
      <Header />
      <Groups />
      <Chat />
    </div>
  );
}

function Header() {
  return <h1>Test</h1>;
}

function Groups() {
  return <p>Group 1</p>;
}

function Chat() {
  return <textarea>Chat</textarea>;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
