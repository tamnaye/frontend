import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import ExampleModal from "./ExampleModal";

function Example() {
  const [show, setShow] = useState(false);
  console.log("Example handleShow : ", show);

  //   const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
  };
  const modalCloseHandler = (show)=>{
    setShow(show)
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
      {show ? <ExampleModal onClose={modalCloseHandler} /> : null}
    </>
  );
}

export default Example;
