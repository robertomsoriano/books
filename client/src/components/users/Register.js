import React, { useState, useEffect } from "react";
import useForm from "../hooks/useForm";
import { useStoreState, useStoreActions } from "easy-peasy";
import {
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

const Register = ({ opened }) => {
  const serverMsg = useStoreState(state => state.serverMsg);
  const { register } = useStoreActions(actions => ({
    register: actions.register
  }));

  const [user, handleChange] = useForm({ name: "", email: "", password: "" });

  const [modal, setModal] = useState(opened);
  const onSubmit = e => {
    e.preventDefault();
    register(user);
  };

  useEffect(() => {
    // msgRef.current = serverMsg;
  }, [serverMsg]);

  return (
    <div>
      <NavLink onClick={() => setModal(!modal)} href="#">
        Register
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
    </div>
  );
};

export default Register;
