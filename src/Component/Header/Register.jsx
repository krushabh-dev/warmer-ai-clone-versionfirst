import React, { useState } from "react";
import { auth } from "../../Config/fire";
import {createUserWithEmailAndPassword, onAuthStateChanged} from "firebase/auth";
import "../../Assets/Styles/login.css";

function Login() {
  const [details, setDetails] = useState(0);

  const HandleChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setDetails({ ...details, [name]: value });
  };

  const SubmitFunc = () => {
    createUserWithEmailAndPassword(auth, details.email, details.psw)
  .then((userCredential) => {
      const user = userCredential.user;
  })
  .catch((error) => {
    alert("Error Occured: Make Sure You Have Proper Internet Connection")
  });
  };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      window.location.href = "/dash"
    }
  });


  return (
    <>
      <div className="mx-auto" id="authSectionArea">
        <div className="card card0">
          <div className="d-flex flex-lg-row flex-column-reverse">
            <div className="card card1">
              <div className="row justify-content-center my-auto">
                <div className="col-md-8 col-10 my-5">
                  <div className="row justify-content-center px-3 mb-3">
                    <h3 className="logo-styling text-center">NavBar</h3>
                  </div>
                  {/* <p className="mb-5 text-center heading">Sign in to your account </p> */}
                  <h6 className="msg-info text-center">
                    Create new account
                  </h6>
                  <div className="google-btn mb-3">
                    <div className="google-icon-wrapper">
                      <img
                        className="google-icon"
                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                      />
                    </div>
                    <p className="btn-text">
                      <b>Sign in with Google</b>
                    </p>
                  </div>
                  <div className="form-group">
                    <label className="form-control-label text-muted">
                      Username
                    </label>
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder="Enter Username"
                      className="form-control"
                      onChange={HandleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-control-label text-muted">
                      Email
                    </label>
                    <input
                      type="text"
                      id="email"
                      name="email"
                      placeholder="Email Address"
                      className="form-control"
                      onChange={HandleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-control-label text-muted">
                      Password
                    </label>
                    <input
                      type="password"
                      id="psw"
                      name="psw"
                      placeholder="Password"
                      className="form-control"
                      onChange={HandleChange}
                    />
                  </div>
                  {/* <div className="row justify-content-center my-2">
                    <a href="#">
                      <small className="text-muted">Forgot Password?</small>
                    </a>
                  </div> */}
                  <div className="row justify-content-center my-2 px-3">
                    <button className="btn-block btn-color" onClick={SubmitFunc}>
                      Let's Begin!
                    </button>
                  </div>
                  <div className="row justify-content-center my-3">
                    <span className="text-center">OR</span>
                    <a className="text-center text-decoration-none" href="/login">
                      <small>Login Account</small>
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="card card2">
              <div className="my-auto mx-md-5 px-md-5 right">
                <h3 className="text-white">We are more than just a company</h3>
                <small className="text-white">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
                </small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
