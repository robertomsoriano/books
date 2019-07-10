import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody
  //   Form,
  //   FormGroup,
  //   Label,
  //   Input
  //   NavLink,
  //   Alert
} from "reactstrap";
const WelcomeModal = ({ opened }) => {
  const [modal, setModal] = opened;
  return (
    <div>
      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>
          Are you new to the Book Store?
        </ModalHeader>
        <ModalBody
          style={{
            display: "flex",
            flexDirection: "column",
            JustifyContent: "center",
            alignItems: "center",
            margin: "auto"
          }}
        >
          <ModalHeader>Sign up for an account!</ModalHeader>
          <Button
            color="primary"
            onClick={() => window.location.replace("/register")}
          >
            Register
          </Button>
          <ModalHeader>Already have an account?</ModalHeader>
          <Button
            color="secondary"
            onClick={() => window.location.replace("/signin")}
          >
            Sign in
          </Button>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default WelcomeModal;
