import React, { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { loginAPI } from "../services/LoginService.js";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [hideU, setHideU] = useState(true);
  const [hideP, setHideP] = useState(true);
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async () => {
    let response = await loginAPI(username, password);
    if (response && response.token) {
      console.log(response);
      localStorage.setItem("token", response.token);
      navigate("/");
    } else if (
      response &&
      response.data.message === "Người dùng không tồn tại"
    ) {
      console.log(response);
      setHideU(false);
      setHideP(true);
    } else if (response && response.data.message === "Mật khẩu không đúng") {
      console.log(response);
      setHideU(true);
      setHideP(false);
    } else {
      console.log(response);
      alert(response);
    }
  };
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    navigate("/");
  };
  useEffect(() => {
    show === false && setShow(true);
  }, [show]);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <br />
              {hideU === false && (
                <Form.Text className="text-danger">
                  Người dùng không tồn tại
                </Form.Text>
              )}
              <Form.Control
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
                type="email"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <br />
              {hideP === false && (
                <Form.Text className="text-danger">
                  Mật khẩu không đúng
                </Form.Text>
              )}
              <Form.Control
                value={password}
                type="password"
                autoComplete="on"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            disabled={username && password ? false : true}
            onClick={() => {
              handleLogin();
            }}
          >
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
