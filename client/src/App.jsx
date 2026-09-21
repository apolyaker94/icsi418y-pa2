import { useState } from "react";
import Signup from "./components/Signup.jsx";
import Login from "./components/Login.jsx";

function App() {
    const [page, setPage] = useState("login");

    return (
        <div className="container">
            <h1>PA2 - Login and Signup</h1>

            <div className="tabs">
                <button
                    className={page === "login" ? "active" : ""}
                    onClick={() => setPage("login")}
                >
                    Login
                </button>
                <button
                    className={page === "signup" ? "active" : ""}
                    onClick={() => setPage("signup")}
                >
                    Sign Up
                </button>
            </div>

            {page === "login" ? <Login /> : <Signup />}
        </div>
    );
}

export default App;
