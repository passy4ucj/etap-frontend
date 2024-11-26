import React, { useRef } from "react";
import { BiXCircle } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import * as actionTypes from "../../../../store/actions/actionTypes";
import * as loginTokenConstants from "../../../../constants/shared/loginTokenConstants";
import { baseUrl } from "../../../../constants/shared/baseUrl"

function SubjectInputForm(props) {
  const fname = useRef();
  const telDescription = useRef();

  const registerSubject = async (newSubject) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${window.localStorage.getItem(loginTokenConstants.TOKEN)}`
    );

    var raw = JSON.stringify(newSubject);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseUrl}/api/v1/subjects`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let res = JSON.parse(result);
        let msg = res?.message ?? "Subject is Added";
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
    const newSubject = {
      name: fname.current.value,
      description: telDescription.current.value,
    };

    console.log(e, value, "forms value");
    // Sending user data to backend
    registerSubject(newSubject);
  };

  return (
    <form className="userInputForm" onSubmit={handleFormSubmit}>
      <BiXCircle
        className="close-model"
        onClick={() => props.setModalState(false)}
      />
      <h1>Add Subject Info:</h1>
      <input ref={fname} type="text" placeholder="Name" required />
      <input ref={telDescription} type="test" placeholder="Description" required />
      <input type="submit" value={"Submit"} />
    </form>
  );
}

export default SubjectInputForm;
