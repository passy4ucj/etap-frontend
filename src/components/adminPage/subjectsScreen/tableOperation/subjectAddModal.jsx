import React from "react";
import SubjectInputForm from "./subjectInputForm";

function SubjectInputModal(props) {
  return (
    <>
      <div className="backDrop"></div>
      <SubjectInputForm setModalState={props.setModalState} />
    </>
  );
}

export default SubjectInputModal;
