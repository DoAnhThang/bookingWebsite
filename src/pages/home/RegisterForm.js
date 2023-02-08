import React from "react";
import "./RegisterForm.css";

function RegisterForm() {
  return (
    <div className="register-form__container">
      <div className="register-form">
        <h1>Save time, save money!</h1>
        <p>Sign up and we'll send the best deals to you</p>
        <form>
          <input type="text" placeholder="Your Email"></input>
          <button type="button">Subscribe</button>
        </form>
      </div>
    </div>
  );
}

export default RegisterForm;
