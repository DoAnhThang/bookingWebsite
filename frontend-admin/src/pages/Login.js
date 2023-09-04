/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { SERVER_URL } from "../api";

function Login({ setIsLogin }) {
  const navigate = useNavigate();
  const [enteredEmail, setEnteredEmail] = useState("");
  const [enteredPassword, setEnteredPassword] = useState("");
  const [response, setResponse] = useState({
    isAuthenticated: null,
  });
  const [loading, setLoading] = useState(false);

  const postLogin = async () => {
    const res = await fetch(`${SERVER_URL}/admin/login`, {
      method: "POST",
      body: JSON.stringify({ email: enteredEmail, password: enteredPassword }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    // console.log("Login response: ", data);
    if (!res.ok) {
      throw new Error("Could not login!");
    }
    setResponse(data);
    setLoading(false);
    return null;
  };

  const postLoginHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    if (enteredEmail && enteredPassword) {
      postLogin();
    } else {
      alert("Please enter all fields!");
    }
  };

  useEffect(() => {
    if (response.isAuthenticated) {
      setIsLogin(true);
      setEnteredEmail("");
      setEnteredPassword("");
      localStorage.setItem("adminInfo", JSON.stringify({ isLogin: true }));
      navigate("/");
    } else {
      setEnteredPassword("");
    }
  }, [response]);

  return (
    <>
      <h4 className="text-dark fw-bold mb-4">Log In</h4>

      <form
        className="w-25 text-end mt-2"
        style={{ minWidth: "14.5rem" }}
        onSubmit={postLoginHandler}
      >
        <input
          type="email"
          placeholder="Enter email"
          className="form-control d-block w-100 fs-7 mb-2"
          value={enteredEmail}
          onChange={(e) => setEnteredEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Enter password"
          className="form-control d-block w-100 fs-7 mb-2"
          value={enteredPassword}
          onChange={(e) => setEnteredPassword(e.target.value)}
        />
        {response.isAuthenticated === false && (
          <p className="fs-7 text-danger mb-0">Password is incorrect!</p>
        )}
        <button
          type="submit"
          className="btn btn-outline-primary btn-sm fs-7"
          disabled={loading}
        >
          {loading ? "Loading..." : "Log in"}
        </button>
      </form>
    </>
  );
}

export default Login;
