import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/LoginForm.css";

const LoginForm = () => {
    const [form, setForm] = useState({
        username: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/api/login/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user_id", data.user_id);

                setMessage("Login Successful");

                navigate("/buses");
            } else {
                setMessage(data.error || "Login Failed");
            }
        } catch (error) {
            setMessage("Login Failed: " + error.message);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>Hanuman Travels</h2>

                <form onSubmit={handleSubmit} className="login-form">

                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                    />

                    <label>Password</label>
                    <input
                        type="password"
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                    />

                    <button type="submit">
                        Login
                    </button>
                </form>

                {message && <p className="message">{message}</p>}

                <p className="register-text">
                    Don't have an account?{" "}
                    <span onClick={() => navigate("/register")}>
                        Register
                    </span>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;