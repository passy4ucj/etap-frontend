import React from "react";
import TopicInputForm from "./topicInputForm";

function TopicInputModal(props) {
  return (
    <>
      <div className="backDrop"></div>
      <TopicInputForm setModalState={props.setModalState} />
    </>
  );
}

export default TopicInputModal;
