function canHaveBody(method) {
  let m = method.toLowerCase();
  return !(m === "get" || m === "head");
}

async function sendRequest({ url, method, data }) {
  return fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: canHaveBody(method) ? JSON.stringify(data) : null,
  }).then((response) => {
    return response.ok ? response.json() : response.text();
  });
}

async function authCheck() {
  return sendRequest({ url: "/api/user/echo", method: "get", data: {} });
}

async function getChatRoomInitInfo({ group_name, category_name }) {
  return sendRequest({
    url: "/api/open-chatroom",
    method: "POST",
    data: { group_name, category_name, action: "init" },
  });
}

async function logoutUser() {
  return sendRequest({ url: "/api/user/logout", method: "get", data: {} });
}
