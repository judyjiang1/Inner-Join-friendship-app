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

const formatTime = (ts) => {
  return moment(ts).format("YYYY-MM-DD hh:mm:ss");
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
  let st = is_online ? (
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
        st
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
    isMounted = true;
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    document.title = "Chat Rooms";
  }, []);

  function onConnect() {
    isConnected = true;
    if (isMounted)
      setActiveRoom((old) => {
        socketIO.emit("joined", { room: old.id });
        return old;
      });

    setChatStatus((old) => {
      return { ...old, isConnected: true, socketIO: socketIO };
    });

    if (isMounted) {
      console.log("ws connected");
      Swal.fire({
        icon: "success",
        title: "Chat service connected",
        showConfirmButton: false,
        toast: true,
        timer: 2000,
      });
    } else {
      console.log("ddddd");
    }
  }

  function onDisconnect() {
    isConnected = false;
    setChatStatus((old) => {
      return { ...old, isConnected: false, socketIO: null };
    });

    console.log("ws disconnected");
  }

  function onStatusEvent(value) {
    // console.log(value)
    if (!isMounted) return null;
    const { code } = value;
    if (code === 4) {
      // on ping
      const { online_members, offline_members } = value;
      console.log("on ping response");
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
    // setStatusEvents(previous => [...previous, value]);
  }

  function onMessageEvent(value) {
    if (!isMounted) return null;
    const { room_id, sender_id, created_at } = value.msg;

    setTimeout(scroll_bottom, 100);

    // if (chatArea.current.getAttribute('data-id') === `${room_id}`) {
    //     setTimeout(scroll_bottom, 100)
    // }
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

            socket.on("connect", onConnect);
            socket.on("disconnect", onDisconnect);
            socket.on("status", onStatusEvent);
            socket.on("message", onMessageEvent);

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
        clearInterval(pingTask);
        if (chatStatus.socketIO?.connected) {
          chatStatus.socketIO.emit("left", { room: activeRoom.id });
        }
        setTimeout(() => {
          gotoMyGroups();
        }, 200);
      }
    });
  }

  // let memberEleArr = members.map(m => (
  //     <RoomMember {...m} current_user_id={userInfo.user_id} key={`${activeRoom.id}-${m.user_id}`}/>))

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
    console.log("mounted");
    setChatStatus((old) => {
      return { ...old, isMounted: true };
    });
    return () => {
      console.log("unmounted");
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
          getSocket(isMounted).then((socket) => {
            if (socket?.connected) socket.emit("ping", { room: room_id });
          });
        }, 3000);

        getSocket(true).then((socket) => {});
      })
      .catch((err) => {
        if (pingTask) clearInterval(pingTask);
        history.push("/login");
      });
  }, []);

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

  const [showPopup, setShowPopup] = useState(false);

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  const [showMapPopup, setShowMapPopup] = useState(false);

  const toggleMapPopup = () => {
    setShowMapPopup(!showMapPopup);
  };

  const handleCloseMapPopup = () => {
    setShowMapPopup(false);
  };

  return (
    <>
      <NavBar setLoginStatus={setLoginStatus} />

      <h2 className="chatRoom-category-text">{categoryName}</h2>
      <h3 className="chatRoom-group-text">{groupName} Group</h3>
      <div className="containerfluid">
        <div className="row">
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
              onClick={togglePopup}
              className="btn btn-primary mx-2"
              style={{ paddingBottom: 10 }}
            >
              Show Group Member Info
            </button>

            {showPopup && (
              <div className="popup">
                <div className="popup-content">
                  {/* <span className="close" onClick={handleClosePopup}>
                    &times;
                  </span> */}
                  <GroupMemberTable
                    groupName={groupName}
                    handleClosePopup={handleClosePopup}
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
                  {/* <span className="close" onClick={handleCloseMapPopup}>
                    &times;
                  </span> */}
                  <GroupMap
                    groupName={groupName}
                    handleCloseMapPopup={handleCloseMapPopup}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="chatRoot">
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
