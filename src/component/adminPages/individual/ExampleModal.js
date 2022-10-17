import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";

const ExampleModal = (props) => {
//   const [show, setShow] = useState(false);

  const handleClose = () => {
    // console.log("example modal handleclose is show : ", show);
    // setShow(false);
    props.onClose(false)

};
  useEffect(() => {
    // console.log("example modal useeffect is show : ", props.show);
    // setShow(props.show);
  }, []);

  return (
    <div>
      <Modal show='true' onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default ExampleModal;
