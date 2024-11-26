import React, { useRef, useState, useEffect } from "react";
import { BiXCircle } from "react-icons/bi";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import * as actionTypes from "../../../../store/actions/actionTypes";
import * as loginTokenConstants from "../../../../constants/shared/loginTokenConstants";
import { baseUrl } from "../../../../constants/shared/baseUrl"


function TopicInputForm(props) {
  const fTitle = useRef();
  const fDescription = useRef();
  const fVideoUrl = useRef();
  const fSubject = useRef();
  const [subjects, setSubjects] = useState([]);

  // Fetch all subjects on component mount
  useEffect(() => {
    const fetchSubjects = async () => {
      try {

        const res = await axios({
          method: 'get',
          url: `${baseUrl}/api/v1/subjects`,
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              loginTokenConstants.TOKEN
            )}`,
          }
        });

        setSubjects(res.data.data || []); // Assuming the response contains a `subjects` array
      } catch (error) {
        console.error("Error fetching subjects:", error);
        toast("Failed to fetch subjects.");
      }
    };

    fetchSubjects();
  }, []);

  const registerTopic = async (newTopic) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${window.localStorage.getItem(loginTokenConstants.TOKEN)}`
    );

    var raw = JSON.stringify(newTopic);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseUrl}/api/v1/topics`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let res = JSON.parse(result);
        let msg = res?.message ?? "Topic is Added";
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
    const newTopic = {
      title: fTitle.current.value,
      description: fDescription.current.value,
      videoUrl: fVideoUrl.current.value,
      subjectId: fSubject.current.value,
    };

    console.log(e, value, "forms value");
    // Sending user data to backend
    registerTopic(newTopic);
  };

  return (
    <form className="userInputForm" onSubmit={handleFormSubmit}>
      <BiXCircle
        className="close-model"
        onClick={() => props.setModalState(false)}
      />
      <h1>Add Topic Info:</h1>
      <input ref={fTitle} type="text" placeholder="Title" required />
      <input ref={fDescription} type="text" placeholder="Description" required />
      <input ref={fVideoUrl} type="text" placeholder="Video URL" required />
      <select ref={fSubject} required>
        <option value="" disabled selected>
          Select Subject
        </option>
        {subjects.map((subject) => (
          <option key={subject.id} value={subject.id}>
            {subject.name}
          </option>
        ))}
      </select>
      <input type="submit" value={"Submit"} />
    </form>
  );
}

export default TopicInputForm;
