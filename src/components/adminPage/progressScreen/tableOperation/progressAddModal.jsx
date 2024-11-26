import React from "react";
import ProgressInputForm from "./progressInputForm";

function ProgressInputModal(props) {
  return (
    <>
      <div className="backDrop"></div>
      <ProgressInputForm setModalState={props.setModalState} />
    </>
  );
}

export default ProgressInputModal;
