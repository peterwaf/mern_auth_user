// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/login",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success("Login successful");
      localStorage.setItem("user", response.data.firstName);
      localStorage.setItem("token", response.data.token);
      navigate("/dashboard");
      setError("");
    } catch (error) {
      toast.error(error.response.data.error);
      setError(error.response.data.error);
    }
  };

  return (
    <div
      id="Login"
      className="flex flex-col justify-center align-center h-screen"
    >
      <div className="w-[400px] h-[auto] flex flex-col items-center pt-4 pb-4 bg-white rounded mx-auto">
        <form className="p-4" onSubmit={handleSubmit}>
          <h1 className="text-2xl text-center">Login Form</h1>
          <br />
          <input
            type="email"
            className="mb-2 p-2 w-full border-b-2"
            placeholder="Email"
            name="email"
            onChange={handleChange}
            value={formData.email}
          />
          <input
            type="password"
            className="p-2 mb-4 w-full border-b-2"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={formData.password}
          />
          {error && (
            <div id="errorHolder" className="p-2">
              <p id="error" className="text-red-500">
                {error}
              </p>
            </div>
          )}
          <button className="bg-purple-800 text-white p-2 w-full rounded">
            LogIn
          </button>
          <span className="pt-2 pb-2">
            Don&apos;t have an account?{" "}
            <Link to="/sign-up" className="text-purple-800">
              Sign Up
            </Link>
          </span>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
