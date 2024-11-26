import React, { useRef, useEffect, useState } from "react";
import axios from "axios";
import { BiXCircle } from "react-icons/bi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { connect } from "react-redux";
import * as actionTypes from "../../../../store/actions/actionTypes";
import * as loginTokenConstants from "../../../../constants/shared/loginTokenConstants";
import { baseUrl } from "../../../../constants/shared/baseUrl"

function ProgressInputForm(props) {
  const fname = useRef();
  const telDescription = useRef();
  const fSubject = useRef();
  const fIsCompleted = useRef();
  const [subjects, setSubjects] = useState([]);
  const fTopic = useRef();
  const [topics, setTopics] = useState([]);
  const fUser = useRef();
  const [users, setUsers] = useState([]);

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
        console.log('input', res.data.data);

        setSubjects(res.data.data || []); // Assuming the response contains a `subjects` array
      } catch (error) {
        console.error("Error fetching subjects:", error);
        toast("Failed to fetch subjects.");
      }
    };

    const fetchTopics = async () => {
      try {

        const res = await axios({
          method: 'get',
          url: `${baseUrl}/api/v1/topics`,
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              loginTokenConstants.TOKEN
            )}`,
          }
        });
        console.log('input', res.data.data);

        setTopics(res.data.data || []); // Assuming the response contains a `subjects` array
      } catch (error) {
        console.error("Error fetching topics:", error);
        toast("Failed to fetch topics.");
      }
    };

    const fetchUsers = async () => {
      try {

        const res = await axios({
          method: 'get',
          url: `${baseUrl}/api/v1/auth/users`,
          headers: {
            Authorization: `Bearer ${window.localStorage.getItem(
              loginTokenConstants.TOKEN
            )}`,
          }
        });

        setUsers(res.data.data || []); // Assuming the response contains a `subjects` array
      } catch (error) {
        console.error("Error fetching users:", error);
        toast("Failed to fetch users.");
      }
    };

    fetchSubjects();
    fetchTopics();
    fetchUsers();
  }, []);

  const registerProgress = async (newProgress) => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      `Bearer ${window.localStorage.getItem(loginTokenConstants.TOKEN)}`
    );

    var raw = JSON.stringify(newProgress);

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch(`${baseUrl}/api/v1/progress`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        let res = JSON.parse(result);
        let msg = res?.message ?? "Progress is Added";
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
    const newProgress = {
      subjectId: fSubject.current.value,
      userId: fUser.current.value,
      topicId: fTopic.current.value,
      isCompleted: true,
    };

    console.log(e, value, "forms value");
    // Sending user data to backend
    registerProgress(newProgress);
  };

  return (
    <form className="userInputForm" onSubmit={handleFormSubmit}>
      <BiXCircle
        className="close-model"
        onClick={() => props.setModalState(false)}
      />
      <h1>Add Progress Info:</h1>
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
      <select ref={fUser} required>
        <option value="" disabled selected>
          Select User
        </option>
        {users.map((user) => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>
      <select ref={fTopic} required>
        <option value="" disabled selected>
          Select Topic
        </option>
        {topics.map((topic) => (
          <option key={topic.id} value={topic.id}>
            {topic.title}
          </option>
        ))}
      </select>
      {/* <div className="genCon">
        <select ref={fIsCompleted} required>
          <option value="" disabled selected>
            Select IsCompleted
          </option>
          {completed.map((complete) => (
            <option key={complete} value={complete}>
              {complete}
            </option>
          ))}
        </select>
      </div> */}
      <input type="submit" value={"Submit"} />
    </form>
  );
}

export default ProgressInputForm;
