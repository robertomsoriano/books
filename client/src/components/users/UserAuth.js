import React, { useState, useEffect } from "react";
// import { Redirect } from "react-router-dom";
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
const host =
  process.env.NODE_ENV === "development" ? "http://127.0.0.1:80" : "";

const UserAuth = () => {
  const authed = useStoreState(state => state.authed);
  // const loading = useStoreState(state => state.loading);
  const serverMsg = useStoreState(state => state.serverMsg);
  // const loading = useStoreState(state => state.loading);
  const { setAuthed, logUser, setServerMsg } = useStoreActions(actions => ({
    setAuthed: actions.setAuthed,
    logUser: actions.logUser,
    setServerMsg: actions.setServerMsg
  }));
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [modal, setModal] = useState(true);

  // const getUser = () => {
  //   async function authUser() {
  //     const result = await axios.post(
  //       `${host}/api/auth`,
  //       JSON.stringify({ email, password }),
  //       {
  //         headers: { "Content-type": "application/json" }
  //       }
  //     );
  //     console.log(result.msg);
  //     await localStorage.setItem("BookStoreToken", result.data.token);
  //     await setAuthed();
  //     await setLoading();
  //   }
  //   authUser();
  // };
  const getUser = () => {
    fetch(`${host}/api/auth`, {
      method: "POST", // or 'PUT'
      body: JSON.stringify({ email, password }), // data can be `string` or {object}!
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(res => res.json())
      .then(response => {
        if (response.token) {
          // console.log("Success:", JSON.stringify(response));
          localStorage.setItem("BookStoreToken", response.token);
          setAuthed();
          window.location.reload();
        } else {
          // console.log("Error:", JSON.stringify(response));
          setServerMsg(response.msg);
        }
      })
      .catch(error => console.error("Error:", error));
  };

  const onSubmit = e => {
    e.preventDefault();
    getUser();
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
        <Button>Login</Button>
      </NavLink>

      <Modal isOpen={modal} toggle={() => setModal(!modal)}>
        <ModalHeader toggle={() => setModal(!modal)}>Login</ModalHeader>
        <ModalBody>
          {serverMsg ? <Alert color="danger">{serverMsg}</Alert> : null}
          <Form onSubmit={e => onSubmit(e)}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                className="mb-3"
                value={email}
                onChange={e => setemail(e.target.value)}
              />

              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                className="mb-3"
                value={password}
                onChange={e => setpassword(e.target.value)}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                Login
              </Button>
              <span>
                Dont have an account? <a href="/register">Sign Up</a>
              </span>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default UserAuth;
