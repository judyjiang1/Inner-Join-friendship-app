const GroupMemberTable = ({ groupName, handleClosePopup }) => {
  const [users, setUsers] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch("/api/get-group-members", {
      method: "POST",
      body: JSON.stringify({
        group_name: groupName,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);
};
