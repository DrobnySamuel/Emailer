import React, { useEffect, useState } from "react";

function App() {
    const [emails, setEmails] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState(null);

    useEffect(() => {
        fetch("http://localhost:8080/emails")
            .then((res) => res.json())
            .then((data) => setEmails(data))
            .catch((err) => console.error("Error fetching emails:", err));
    }, []);

    return (
        <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>
            {/* LEFT COLUMN: Sidebar */}
            <div
                style={{
                    width: "200px",
                    backgroundColor: "#f5f5f5",
                    padding: "15px",
                    borderRight: "1px solid #ddd",
                }}
            >
                <h3>Folders</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    <li style={{ marginBottom: "10px", cursor: "pointer" }}>Delivered</li>
                    <li style={{ marginBottom: "10px", cursor: "pointer" }}>Important</li>
                </ul>
            </div>

            {/* MIDDLE COLUMN: Email list */}
            <div
                style={{
                    flex: 1,
                    borderRight: "1px solid #ddd",
                    overflowY: "auto",
                    padding: "10px",
                }}
            >
                <h3>Inbox</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {emails.map((email) => (
                        <li
                            key={email.id}
                            onClick={() => setSelectedEmail(email)}
                            style={{
                                marginBottom: "15px",
                                padding: "10px",
                                borderBottom: "1px solid #eee",
                                cursor: "pointer",
                                backgroundColor:
                                    selectedEmail?.id === email.id ? "#e6f0ff" : "transparent",
                            }}
                        >
                            <strong>{email.subject}</strong> <br />
                            <span>{email.sender}</span> <br />
                            <small style={{ color: "gray" }}>
                                {new Date(email.delivered).toLocaleString()}
                            </small>
                        </li>
                    ))}
                </ul>
            </div>

            {/* RIGHT COLUMN: Email details */}
            <div style={{ flex: 2, padding: "20px" }}>
                {selectedEmail ? (
                    <>
                        <h2>{selectedEmail.subject}</h2>
                        <p>
                            <strong>From:</strong> {selectedEmail.sender}
                        </p>
                        <p>
                            <strong>Received:</strong>{" "}
                            {new Date(selectedEmail.delivered).toLocaleString()}
                        </p>
                        <hr />
                        <p>{selectedEmail.body}</p>
                        <p>
                            <em>Category: {selectedEmail.category}</em>
                        </p>
                        <p>
                            <em>Importance: {selectedEmail.importance}</em>
                        </p>
                    </>
                ) : (
                    <p>Select an email to read</p>
                )}
            </div>
        </div>
    );
}

export default App;
