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

const socket = window.io();

function ChatBox() {
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isJoined, setIsJoined] = useState(false);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    if (typeof io !== "undefined") {
      setSocket(io({ autoConnect: false }));
    } else {
      console.error(
        "Socket.io is not available. Make sure you included the script tag in your HTML."
      );
    }
  }, []);

  const handleJoin = () => {
    if (username.trim() !== "") {
      socket.connect();
      socket.emit("user_join", username);
      setIsJoined(true);
    }
  };

  const handleSendMessage = (e) => {
    if (e.key === "Enter") {
      if (message.trim() !== "") {
        socket.emit("new_message", message);
        setMessage("");
      }
    }
  };

  useEffect(() => {
    socket.on("connect", () => {
      // Handle connection
    });

    socket.on("chat", (data) => {
      setMessages([...messages, data]);
      scrollToBottom();
    });

    return () => {
      socket.disconnect();
    };
  }, [socket, messages]);

  const scrollToBottom = () => {
    const chatMessages = document.getElementById("chat-messages");
    chatMessages.scrollTop = chatMessages.scrollHeight;
  };

  return (
    <div className="App">
      <div id="landing" style={{ display: isJoined ? "none" : "block" }}>
        <input
          type="text"
          id="username"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button id="join-btn" onClick={handleJoin}>
          JOIN
        </button>
      </div>

      <div id="chat" style={{ display: isJoined ? "block" : "none" }}>
        <ul id="chat-messages">
          {messages.map((data, index) => (
            <li key={index}>
              {data.username}: {data.message}
            </li>
          ))}
        </ul>
        <input
          type="text"
          id="message"
          placeholder="Enter a Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyUp={handleSendMessage}
        />
      </div>
    </div>
  );
}
