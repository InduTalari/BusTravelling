import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/RegisterForm.css";

const RegisterForm = () => {
    const [form, setForm] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8000/api/register/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Registration Successful");
            } else {
                setMessage("Registration Failed: " + JSON.stringify(data));
            }
        } catch (error) {
            setMessage("Registration Failed: " + error.message);
        }
    };

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="register-container">
            <div className="register-card">
                <h2>Create Account</h2>

                <form onSubmit={handleSubmit} className="register-form">

                    <label>Username</label>
                    <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                    />

                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
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
                        Register
                    </button>
                </form>

                {message && <p className="message">{message}</p>}

                <p className="login-text">
                    Already have an account?{" "}
                    <span onClick={() => navigate("/")}>
                        Login
                    </span>
                </p>
            </div>
        </div>
    );
};

export default RegisterForm;