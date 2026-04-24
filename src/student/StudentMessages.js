import { useEffect, useState, useRef } from "react";

function StudentMessages() {
  const user = JSON.parse(localStorage.getItem("user"));

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  const chatEndRef = useRef(null);

  const fetchChat = async () => {
    const res = await fetch(
      `https://www.gurukrupaeducation.com/api/get-messages.php?user_id=${user.user_id}`
    );
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    fetchChat();
    const interval = setInterval(fetchChat, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    await fetch("https://www.gurukrupaeducation.com/api/send-message.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: user.user_id,
        user_email: user.email,
        message: text,
        from_admin: 0
      })
    });

    setText("");
    fetchChat();
  };

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column" }}>

      {/* HEADER */}
      <div style={{
        padding: 15,
        borderBottom: "1px solid #eee",
        fontWeight: "bold"
      }}>
        Chat with Admin
      </div>

      {/* CHAT */}
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
              justifyContent: m.from_admin == 1 ? "flex-start" : "flex-end",
              marginBottom: 10
            }}>
            <div style={{
              padding: "10px 15px",
              borderRadius: "20px",
              background: m.from_admin == 1 ? "#e4e6eb" : "#0095f6",
              color: m.from_admin == 1 ? "#000" : "#fff"
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
            border: "1px solid #ccc"
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

    </div>
  );
}

export default StudentMessages;