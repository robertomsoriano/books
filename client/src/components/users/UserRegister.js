import React, { useState, useEffect } from "react";
import useForm from "../hooks/useForm";
// import axios from "axios";
import { useStoreState, useStoreActions } from "easy-peasy";
import {
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  NavLink,
  Alert
} from "reactstrap";
// const host =
//   process.env.NODE_ENV === "development" ? "http://127.0.0.1:80" : "";

const UserRegister = ({ opened }) => {
  const authed = useStoreState(state => state.authed);
  const serverMsg = useStoreState(state => state.serverMsg);
  const { logUser, register } = useStoreActions(actions => ({
    logUser: actions.logUser,
    register: actions.register
  }));

  const [user, handleChange] = useForm({ name: "", email: "", password: "" });
  const [modal, setModal] = useState(opened);

  const onSubmit = e => {
    e.preventDefault();
    register(user);
  };
  useEffect(() => {
    logUser();
    // msgRef.current = serverMsg;
  }, [serverMsg, authed, logUser]);
  return authed ? (
    window.location.replace("/")
  ) : (
    <Container>
      <NavLink onClick={() => window.location.replace("/")} href="#">
        <Button>Back to Main Dashboard</Button>
      </NavLink>
      <NavLink onClick={() => setModal(!modal)} href="#">
        <Button>Register</Button>
      </NavLink>

      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>Register</ModalHeader>
        <ModalBody>
          {serverMsg ? <Alert color="danger">{serverMsg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="name">Name</Label>
              <Input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="mb-3"
                value={user.name}
                onChange={handleChange}
              />

              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="mb-3"
                value={user.email}
                onChange={handleChange}
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                value={user.password}
                onChange={handleChange}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Register
              </Button>
              <span>
                Already have an account? <a href="/signin">Sign in</a>
              </span>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default UserRegister;
