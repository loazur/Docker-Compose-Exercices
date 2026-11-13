import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

function App() {
    const [etat, setEtat] = useState("Chargement...");
    useEffect(() => {
        fetch("http://localhost:5000/status")
            .then(res => res.json())
            .then(data => setEtat(JSON.stringify(data, null, 2)))
            .catch(err => setEtat("Erreur API: " + err.message));
    }, []); 
    return <div style={{ padding: "2rem", fontFamily: "sans-serif"}}><h1>Test Multi-Services</h1><pre>{etat}</pre></div>;
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);