import { useEffect, useState, useRef } from "react";

function Message() {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const chatEndRef = useRef(null);

  useEffect(() => {
    fetch("https://www.gurukrupaeducation.com/api/get-users.php")
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const fetchChat = async (userId) => {
    const res = await fetch(
      `https://www.gurukrupaeducation.com/api/get-messages.php?user_id=${userId}`
    );
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    if (!selectedUser) return;

    fetchChat(selectedUser.id);

    const interval = setInterval(() => {
      fetchChat(selectedUser.id);
    }, 2000);

    return () => clearInterval(interval);
  }, [selectedUser]);

  // 🔥 auto scroll
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    await fetch("https://www.gurukrupaeducation.com/api/send-message.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_id: selectedUser.id,
        user_email: selectedUser.email,
        message: text,
        from_admin: 1
      })
    });

    setText("");
    fetchChat(selectedUser.id);
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "sans-serif" }}>

      {/* SIDEBAR */}
      <div style={{
        width: "250px",
        borderRight: "1px solid #eee",
        background: "#fff"
      }}>
        <h3 style={{ padding: 15 }}>Messages</h3>

        {users.map((u) => (
          <div
            key={u.id}
            onClick={() => setSelectedUser(u)}
            style={{
              padding: 12,
              cursor: "pointer",
              borderBottom: "1px solid #f0f0f0",
              background: selectedUser?.id === u.id ? "#f5f5f5" : "#fff"
            }}
          >
            {u.name}
          </div>
        ))}
      </div>

      {/* CHAT AREA */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

        {selectedUser ? (
          <>
            {/* HEADER */}
            <div style={{
              padding: 15,
              borderBottom: "1px solid #eee",
              fontWeight: "bold"
            }}>
              {selectedUser.name}
            </div>

            {/* MESSAGES */}
            <div style={{
              flex: 1,
              padding: 20,
              overflowY: "auto",
              background: "#fafafa"
            }}>
              {messages.map((m) => (
                <div key={m.id}
                  style={{
                    display: "flex",
                    justifyContent: m.from_admin == 1 ? "flex-end" : "flex-start",
                    marginBottom: 10
                  }}>
                  <div style={{
                    maxWidth: "60%",
                    padding: "10px 15px",
                    borderRadius: "20px",
                    background: m.from_admin == 1 ? "#0095f6" : "#e4e6eb",
                    color: m.from_admin == 1 ? "#fff" : "#000"
                  }}>
                    {m.message}
                  </div>
                </div>
              ))}
              <div ref={chatEndRef}></div>
            </div>

            {/* INPUT */}
            <div style={{
              padding: 10,
              borderTop: "1px solid #eee",
              display: "flex"
            }}>
              <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Message..."
                style={{
                  flex: 1,
                  padding: 10,
                  borderRadius: 20,
                  border: "1px solid #ccc",
                  outline: "none"
                }}
              />
              <button onClick={sendMessage}
                style={{
                  marginLeft: 10,
                  background: "#0095f6",
                  color: "#fff",
                  border: "none",
                  padding: "10px 15px",
                  borderRadius: "20px"
                }}>
                Send
              </button>
            </div>

          </>
        ) : (
          <div style={{ margin: "auto", color: "#999" }}>
            Select a user to start chat
          </div>
        )}

      </div>
    </div>
  );
}

export default Message;