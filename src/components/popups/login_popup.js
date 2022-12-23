import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import PFP_LOGO from "../../assets/PFP_LOGO.png";
import "../../styles/App.css";

function Login_popup({ isLoginOpen, setIsLoginOpen, setIsRegisterOpen }) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [response, setResponse] = useState([]);

  const username = useRef(null);
  const password = useRef(null);

  const handleClick = () => {
    fetch("https://dragonmaster.pl/inz/user/login", {
      method: "POST",
      body: JSON.stringify({
        username: username.current.value,
        password: password.current.value,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setResponse(result);
		  if(result.token!=undefined){
          localStorage.setItem("token", JSON.stringify(result));
			setIsLoginOpen(false);
			window.location.reload();
			}else{
			document.getElementById("errormsg").style.display="block";	
			}},
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
    if (error) {
      alert("Coś poszło nie tak: " + error.message);
    }
  };

  return (
    <Modal show={isLoginOpen} onHide={() => setIsLoginOpen(false)}>
      <Modal.Header closeButton>
        <img src={PFP_LOGO} style={{ marginLeft: "auto", height:"8vh"}} alt="LOGO" />
      </Modal.Header>
      <Modal.Body
        style={{
          backgroundColor: "#EBEBEB",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h2
          style={{
            color: "var(--black)",
            fontFamily: "Montserrat",
            fontWeight: "600",
            fontSize: "28px",
            lineHeight: "42px",
            textAlign: "center",
          }}
        >
          Logowanie
        </h2>
        <Form style={{ width: "100%" }}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              placeholder="Tutaj wpisz e-mail lub nick"
              ref={username}
              autoFocus
            />
            <Form.Control
              style={{ marginTop: "1%" }}
              type="password"
              placeholder="Tutaj wpisz hasło"
              ref={password}
              autoFocus
            />
          </Form.Group>
        </Form>
        <Button
          style={{
            fontFamily: "Montserrat",
            fontWeight: "600",
            fontSize: "18px",
            lineHeight: "25px",
            color: "white",
            borderRadius: "13px",
          }}
          variant="success"
          onClick={handleClick}
        >
          ZALOGUJ
        </Button>
      </Modal.Body>
      <Modal.Footer
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
	  <div id={"errormsg"} style={{display:"none"}}>
	  Wrong login or password
	  </div>
        <paragraph>
          Nie masz konta?
          <paragraph style={{ textDecoration: "underline", marginLeft: "3px" }}>
            <paragraph
              style={{
                textDecoration: "underline",
                marginLeft: "3px",
                cursor: "pointer",
              }}
              onClick={(e) => {
                e.preventDefault();
                setIsLoginOpen(false);
                setIsRegisterOpen(true);
              }}
            >
              Zarejestruj się
            </paragraph>
          </paragraph>
        </paragraph>
      </Modal.Footer>
    </Modal>
  );
}

export default Login_popup;
