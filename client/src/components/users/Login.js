import React, { useState, useEffect } from "react";
// import axios from "axios";
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
const host =
  process.env.NODE_ENV === "development" ? "http://127.0.0.1:80" : "";

const Login = () => {
  const serverMsg = useStoreState(state => state.serverMsg);
  const { setAuthed, setServerMsg } = useStoreActions(actions => ({
    setServerMsg: actions.setServerMsg,
    setAuthed: actions.setAuthed
  }));
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [modal, setModal] = useState(false);

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
          console.log("Success:", JSON.stringify(response));
          localStorage.setItem("BookStoreToken", response.token);
          setAuthed();
          window.location.reload();
        } else {
          console.log("Error:", JSON.stringify(response));
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
    // msgRef.current = serverMsg;
  }, [serverMsg]);
  useEffect(() => {}, [serverMsg]);
  return (
    <div>
      <NavLink onClick={() => setModal(!modal)} href="#">
        Login
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
    </div>
  );
};

export default Login;
