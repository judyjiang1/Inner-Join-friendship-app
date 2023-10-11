const { useContext, createContext, useState, useEffect, useRef, useMemo } =
  React;
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
  useParams,
} = ReactRouterDOM;

const formatTime = (timestamp) => {
  return moment(timestamp).format("YYYY-MM-DD hh:mm:ss");
};

function RoomMember({
  user_id,
  fname,
  lname,
  email,
  last_seen,
  is_online,
  current_user_id,
  ...props
}) {
  let status = is_online ? (
    <span className="badge bg-success text-white">Online</span>
  ) : (
    <span className="badge bg-danger text-white">Offline</span>
  );
  return (
    <div className="member" id={`member-${user_id}`}>
      {fname} {lname}{" "}
      {current_user_id === user_id ? (
        <span className="badge bg-warning text-white">Me</span>
      ) : (
        status
      )}
    </div>
  );
}

function Message({
  message_id,
  content,
  sender_id,
  sender_username,
  sender_lname,
  sender_fname,
  created_at,
  currentUserObj,
}) {
  return (
    <div
      id={`message-${message_id}`}
      className={`chatRecord${
        sender_id === currentUserObj.user_id ? " chatRecordAlt" : ""
      }`}
    >
      <span className="msgUser">
        {sender_fname} {sender_lname}
      </span>
      <span className="msgBody">
        <span className="msgContent">{content}</span>
        <span className="msgTime">{formatTime(created_at)}</span>
      </span>
    </div>
  );
}

function mergeMessages(arr_a, arr_b) {
  let c = Array.from(new Set([...arr_a, ...arr_b]));
  c.sort((a, b) => a.id - b.id);
  return c;
}

function ChatRoom() {
  const { groupName, categoryName } = useParams();

  const formatTitle = (string) => {
    return string.replace(/\w\S*/g, (title) => {
      if (title.toLowerCase() === "or") {
        return title;
      } else {
        return title.charAt(0).toUpperCase() + title.substr(1).toLowerCase();
      }
    });
  };
  const categoryNameTitle = formatTitle(categoryName);

  const history = useHistory();

  const { loginStatus, setLoginStatus, userInfo, setUserInfo } =
    useContext(AuthContext);

  const chatArea = useRef();

  const currentUserObj = userInfo;

  const [activeRoom, setActiveRoom] = useState({
    id: 0,
    group_name: "",
    category_name: "",
  });
  let [messages, setMessages] = useState([]);
  let [members, setMembers] = useState([]);

  const [newContent, setNewContent] = useState("");

  let isMounted = false;
  let isConnected = false;

  const [chatStatus, setChatStatus] = useState({
    isMounted,
    isConnected,
    socketIO,
  });

  let pingTask = null;
  let __room_id__ = -1;

  useEffect(() => {
    document.title = "InnerJoin | Chat Room";
  }, []);

  function onConnect() {
    isConnected = true;
    if (isMounted)
      // a callback function that emits a "joined" event to the server using the socketIO instance
      setActiveRoom((prev) => {
        socketIO.emit("joined", { room: prev.id });
        return prev;
      });

    if (isMounted) {
      setChatStatus((prev) => {
        return { ...prev, isConnected: true, socketIO: socketIO };
      });
    }

    if (isMounted) {
      // console.log("websocket connected");
      Swal.fire({
        icon: "success",
        title: "Chat service connected",
        showConfirmButton: false,
        toast: true,
        timer: 2000,
      });
    } else {
      // console.log("not mounted, please double check");
    }
  }

  function onDisconnect() {
    // console.log("websocket disconnected");
    isConnected = false;
    if (isMounted) {
      setChatStatus((prev) => {
        return { ...prev, isConnected: false, socketIO: null };
      });
    }
  }

  function onStatusEvent(value) {
    // console.log(value)
    if (!isMounted) return null;
    const { code } = value;
    if (code === 4) {
      // on ping
      const { online_members, offline_members } = value;
      // console.log("on ping response");
      if (isMounted)
        setMembers((prev) => {
          return prev.map((el) => {
            if (online_members.indexOf(el.user_id) > -1) {
              return { ...el, is_online: true };
            } else if (offline_members.indexOf(el.user_id) > -1) {
              return { ...el, is_online: false };
            } else return el;
          });
        });
    }
    if (code === 3) {
      // on enter chatroom
      const { user } = value;
      if (isMounted)
        setMembers((prev) => {
          // new member
          if (prev.filter((e) => e.user_id === user.user_id).length === 0) {
            return [{ ...user, is_online: true }, ...prev];
          } else {
            return prev.map((el) => {
              if (el.user_id === user.user_id) {
                el.is_online = true;
              }
              return el;
            });
          }
        });
    }
    if (code === 2) {
      // on left chatroom
      if (isMounted)
        setMembers((prev) => {
          return prev.map((el) => {
            return el.user_id === value.user_id
              ? { ...el, is_online: false }
              : el;
          });
        });
    }
  }

  function onMessageEvent(value) {
    if (!isMounted) return null;
    const { room_id, sender_id, created_at } = value.msg;
    setTimeout(scroll_bottom, 100);
    if (isMounted) setMessages((prev) => mergeMessages([...prev], [value.msg]));

    // receive a message, update online status / last_seen / last_speak
    if (isMounted)
      setMembers((prev) => {
        return prev.map((el) => {
          if (el.user_id === sender_id) {
            el.is_online = true;
            el.last_seen = created_at;
            el.last_speak = created_at;
          }
          return el;
        });
      });
  }

  // client-side establishes a WebSocket connection to the server
  let socketIO = null;
  const getSocket = async (ensureExists) => {
    return new Promise((resolve) => {
      if (ensureExists) {
        if (!isConnected) {
          let sc = document.createElement("script");
          sc.src =
            "https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.7.2/socket.io.js";
          sc.onload = () => {
            let socket = io.connect("/chat/", {
              autoConnect: false,
            });

            // socketio event handlers, events are emitted by the server
            socket.on("connect", onConnect);
            socket.on("disconnect", onDisconnect);
            socket.on("status", onStatusEvent);
            socket.on("message", onMessageEvent);

            socket.on("disconnected", (err) => {
              console.error("disconnected", err);
            });

            socket.on("connect_error", () => {
              console.log("Server temporarily unavailable. Reconnecting...");
              // set timer to disconnect socket if server continues to be unavailable
              setTimeout(() => {
                socket.disconnect();
                console.log(
                  "Connection timed out. The server is currently unavailable. Please try again at a later time."
                );
              }, 8000);
            });

            socket.connect();

            socketIO = socket;
            resolve(socketIO);
          };
          document.head.insertAdjacentElement("beforeend", sc);
        } else {
          resolve(socketIO);
        }
      } else {
        resolve(socketIO);
      }
    });
  };

  function sortMembers(members) {
    if (members.length === 0) return [];
    // current user
    const me = members.filter((el) => el.user_id === currentUserObj.user_id)[0];

    // sort online group members by first name in alphabetical ascending order
    const onlineMembers = members
      .filter((el) => el.is_online && el.user_id !== me.user_id)
      .sort((a, b) => b.last_speak - a.last_speak);

    // sorted offline group members by first name in alphabetical ascending order
    const offlineMembers = members
      .filter((el) => !el.is_online && el.user_id !== me.user_id)
      .sort((a, b) => a.fname.localeCompare(b.fname));

    // show current user at the top, then online members, followed by offline members
    let res = [me, ...onlineMembers, ...offlineMembers];

    return res;
  }

  function gotoMyGroups() {
    history.push("/my-groups");
  }

  function endChat() {
    Swal.fire({
      icon: "question",
      title: "Are you sure you want to end this chat?",
      showCancelButton: true,
      cancelButtonText: "No",
      confirmButtonText: "Yes",
    }).then((r) => {
      if (r.isConfirmed) {
        gotoMyGroups();
      }
    });
  }

  // re-render RoomMember component when members changed
  const memberEleArr = useMemo(
    () =>
      sortMembers(members).map((m) => {
        return (
          <RoomMember
            {...m}
            current_user_id={userInfo.user_id}
            key={`${activeRoom.id}-${m.user_id}`}
          />
        );
      }),
    [members]
  );

  let messageEleArr = messages.map((m) => (
    <Message {...m} currentUserObj={currentUserObj} key={m.message_id} />
  ));

  useEffect(() => {
    // console.log("mounted");
    isMounted = true;
    setChatStatus((old) => {
      return { ...old, isMounted: true };
    });
    return () => {
      // console.log("unmounted");
      isMounted = false;

      clearInterval(pingTask);

      if (socketIO?.connected) {
        socketIO.emit("left", { room: __room_id__ });
        socketIO.disconnect();
      }
    };
  }, []);

  function scroll_bottom() {
    chatArea.current.scroll({
      top: chatArea.current.scrollHeight,
      behavior: "smooth",
    });
  }

  useEffect(() => {
    getChatRoomInitInfo({ group_name: groupName, category_name: categoryName })
      .then((res) => {
        const room_id = res.room.id;
        setActiveRoom(res.room);
        setMessages(res.messages);
        setMembers(res.members);

        __room_id__ = room_id;

        pingTask = setInterval(() => {
          getSocket().then((socket) => {
            if (isMounted && socket?.connected)
              socket.emit("ping", { room: room_id });
          });
        }, 3000);

        getSocket(true).then((socket) => {});
      })
      .catch((err) => {
        history.push("/login");
      });
  }, []);

  // clean-up logic
  useEffect(() => {
    return () => {
      if (pingTask) clearInterval(pingTask);
      getSocket().then((socket) => {
        if (socket?.connected) {
          socket.emit("left", { room: __room_id__ });
          socket.off("disconnect", onDisconnect);
          socket.off("status", onStatusEvent);
          socket.off("message", onMessageEvent);
          socket.off("connect", onConnect);
        }
      });
    };
  }, []);

  // to submit a text message, client sends a "text" event to the server
  function submitMessage(evt) {
    evt.preventDefault();
    if (chatStatus.socketIO?.connected) {
      chatStatus.socketIO.emit("text", {
        content: newContent,
        room: activeRoom.id,
      });
      setNewContent("");
    } else {
      Swal.fire({
        icon: "warning",
        title: "Chat service not ready for now",
      });
    }
  }

  const [showTablePopup, setShowTablePopup] = useState(false);
  const toggleTablePopup = () => {
    setShowTablePopup(!showTablePopup);
  };

  const [showMapPopup, setShowMapPopup] = useState(false);
  const toggleMapPopup = () => {
    setShowMapPopup(!showMapPopup);
  };

  return (
    <>
      <NavBar setLoginStatus={setLoginStatus} />

      <h1 className="chatRoom-group-text" style={{ fontSize: 35 }}>
        {groupName} Group
      </h1>
      <h2 className="chatRoom-category-text" style={{ fontSize: 20 }}>
        ({categoryNameTitle})
      </h2>
      <div className="containerfluid">
        <div className="row" style={{ marginTop: 40, marginBottom: 20 }}>
          <div className="col chatRoom-btn">
            <button
              className="btn btn-primary mx-2"
              onClick={() => {
                endChat();
              }}
            >
              Leave chat
            </button>

            <button
              onClick={toggleTablePopup}
              className="btn btn-primary mx-2"
              style={{ paddingBottom: 10 }}
            >
              Show Group Member Info
            </button>

            {showTablePopup && (
              <div className="popup">
                <div className="popup-content">
                  <GroupMemberTable
                    groupName={groupName}
                    handleClosePopup={toggleTablePopup}
                  />
                </div>
              </div>
            )}

            <button
              onClick={toggleMapPopup}
              className="btn btn-primary mx-2"
              style={{ paddingBottom: 10 }}
            >
              Show Group Map
            </button>

            {showMapPopup && (
              <div className="popup">
                <div className="popup-content">
                  <GroupMap
                    groupName={groupName}
                    handleCloseMapPopup={toggleMapPopup}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="chatRoot container-fluid" style={{ marginBottom: 200 }}>
        <div className="chatArea">
          <div className="groupMembers">
            <h4>Group Members</h4>
            <h5 className="onlineCount">
              Online {members.filter((m) => m.is_online).length} /Total{" "}
              {members.length}
            </h5>
            <div className="memberCase">{memberEleArr}</div>
          </div>
          <div className="chatBox">
            <div className="history" ref={chatArea} data-id={activeRoom.id}>
              {messageEleArr}
            </div>
            <div className="input">
              <form action="" onSubmit={submitMessage}>
                <input
                  type="text"
                  required={true}
                  autoComplete={"off"}
                  value={newContent}
                  onChange={(evt) => {
                    setNewContent(evt.target.value);
                  }}
                />

                <button type="submit">
                  <i className="fa-regular fa-paper-plane"></i>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
