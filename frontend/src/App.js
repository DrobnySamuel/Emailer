import React, { useEffect, useState } from "react";

function App() {
    const [emails, setEmails] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [activeTab, setActiveTab] = useState("delivered");

    // load emails on first render
    useEffect(() => {
        fetch("http://localhost:8080/emails")
            .then((res) => res.json())
            .then((data) => {
                setEmails(data);

                // trigger async importance assignment for -1 emails
                if (data.some((email) => email.importance === -1)) {
                    fetch("http://localhost:8080/emails/assign-importance")
                        .then(() => {
                            // silently updates DB, no need to overwrite state yet
                            console.log("Importance calculation started...");
                        })
                        .catch((err) => console.error("Error assigning importance:", err));
                }
            })
            .catch((err) => console.error("Error fetching emails:", err));
    }, []);

    // handler for switching tabs
    const switchTab = (tab) => {
        setActiveTab(tab);

        if (tab === "delivered") {
            fetch("http://localhost:8080/emails")
                .then((res) => res.json())
                .then((data) => setEmails(data));
        }

        if (tab === "important") {
            fetch("http://localhost:8080/emails/important?threshold=7")
                .then((res) => res.json())
                .then((data) => setEmails(data));
        }
    };

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
                    <li
                        style={{ marginBottom: "10px", cursor: "pointer" }}
                        onClick={() => switchTab("delivered")}
                    >
                        Delivered
                    </li>
                    <li
                        style={{ marginBottom: "10px", cursor: "pointer" }}
                        onClick={() => switchTab("important")}
                    >
                        Important
                    </li>
                    <li
                        style={{ marginBottom: "10px", cursor: "pointer" }}
                        onClick={() => {
                            fetch("http://localhost:8080/test-gemini", { method: "GET" })
                                .then((res) => res.text())       // get the response as text
                                .then((data) => console.log("data: " + data)) // log it to console
                                .catch((err) => console.error("error: " + err));
                        }}
                    >
                        Test Gemini
                    </li><li
                        style={{ marginBottom: "10px", cursor: "pointer" }}
                        onClick={() => {
                            fetch("http://localhost:8080/test-gpt", { method: "GET" })
                                .then((res) => res.text())       // get the response as text
                                .then((data) => console.log("data: " + data)) // log it to console
                                .catch((err) => console.error("error: " + err));
                        }}
                    >
                        Test ChatGPT
                    </li>
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
                <h3>{activeTab === "important" ? "Important Emails" : "Inbox"}</h3>
                <ul style={{ listStyle: "none", padding: 0 }}>
                    {emails.map((email) => (
                        <li
                            key={email.id}
                            onClick={() => {
                                fetch(`http://localhost:8080/emails/${email.id}/seen`, {
                                    method: "PUT",
                                })
                                    .then((res) => res.json())
                                    .then((updated) => {
                                        setEmails((prev) =>
                                            prev.map((e) => (e.id === updated.id ? updated : e))
                                        );
                                        setSelectedEmail(updated);
                                    });
                            }}
                            style={{
                                marginBottom: "15px",
                                padding: "10px",
                                borderBottom: "1px solid #eee",
                                cursor: "pointer",
                                backgroundColor:
                                    selectedEmail?.id === email.id
                                        ? "#e6f0ff" // selected
                                        : email.seen
                                            ? "rgba(241,241,241,0.95)" // seen
                                            : "transparent", // unseen
                            }}
                        >
                            <strong>{email.subject}</strong> <br />
                            <span>{email.sender}</span> <br />
                            <small style={{ color: "gray" }}>
                                {new Date(email.delivered).toLocaleString()}
                            </small>
                            <br />
                            <small>
                                Importance:{" "}
                                {email.importance === -1 ? "Pending…" : email.importance}
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
                            <em>
                                Importance:{" "}
                                {selectedEmail.importance === -1
                                    ? "Pending…"
                                    : selectedEmail.importance}
                            </em>
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
