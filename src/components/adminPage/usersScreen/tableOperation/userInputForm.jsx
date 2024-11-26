import React, { useRef } from "react";
import { BiXCircle } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import * as actionTypes from "../../../../store/actions/actionTypes";
import * as loginTokenConstants from "../../../../constants/shared/loginTokenConstants";
import { baseUrl } from "../../../../constants/shared/baseUrl"

function UserInputForm(props) {
  const fnameRef = useRef();
  const telRef = useRef();
  const emailRef = useRef();
  const maleRef = useRef();

  const registerUser = async (newUser) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${window.localStorage.getItem(loginTokenConstants.TOKEN)}`
    );

    var raw = JSON.stringify(newUser);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseUrl}/api/v1/auth/admin-register-user`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let res = JSON.parse(result);
        let msg = res?.message ?? "User is Added";
        toast(msg);
        props.setModalState(false);
      })
      .catch((error) => {
        toast(error.message);
        alert(error.message);
      });
  };

  const handleFormSubmit = async (e, value) => {
    e.preventDefault();
    const newUser = {
      email: emailRef.current.value,
      name: fnameRef.current.value,
      password: telRef.current.value,
    };

    console.log(e, value, "forms value");
    // Sending user data to backend
    registerUser(newUser);
  };

  return (
    <form className="userInputForm" onSubmit={handleFormSubmit}>
      <BiXCircle
        className="close-model"
        onClick={() => props.setModalState(false)}
      />
      <h1>Add User Info:</h1>
      <input ref={fnameRef} type="text" placeholder="User Name" required />
      <input ref={telRef} type="password" placeholder="Password" required />
      <input ref={emailRef} type="email" placeholder="Email" required />
      {/* <div className="genCon">
        <input
          ref={maleRef}
          type="radio"
          required
          defaultChecked
          name="gender"
          id="Male"
        />
        <label htmlFor="Male">Male</label>
        <input type="radio" required name="gender" id="Female" />
        <label htmlFor="Female">Female</label>
      </div> */}
      <input type="submit" value={"Submit"} />
    </form>
  );
}

export default UserInputForm;
