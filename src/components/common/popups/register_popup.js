import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import PFP_LOGO from "../../../assets/PFP_LOGO.png";
import "../../../styles/App.css";

const Register_popup = ({
  isRegisterOpen,
  setIsLoginOpen,
  setIsRegisterOpen,
}) => {
  const initialValues = {
    username: "",
    surname: "",
    name: "",
    mail: "",
    phone: "",
    password: "",
  };
  const [formErrors, setFormErrors] = useState({});
  const [formValues, setFormValues] = useState(initialValues);
  const [error, setError] = useState(null);
  const [isSended, setIsSended] = useState(false);
  const username = useRef(null);
  const surname = useRef(null);
  const nameOfUser = useRef(null);
  const mail = useRef(null);
  const phone = useRef(null);
  const password = useRef(null);
  let userData = "";

  const validate = (values) => {
    const errors = {};
    if (!values.nameOfUser) {
      errors.nameOfUser = "Wpisz swoje imię";
    }
    if (!values.username) {
      errors.username = "Wpisz swój login";
    }
    if (!values.surname) {
      errors.surname = "Wpisz swoje nazwisko";
    }
    if (!values.mail) {
      errors.mail = "Wpisz swój email";
    }
    if (!values.phone) {
      errors.phone = "Wpisz swój numer";
    }
    if (!values.password) {
      errors.password = "Wpisz swoje hasło";
    }
    if (values.password !== values.repeatPassword) {
      errors.repeatPassword = "Powtórzone hasło nie jest takie samo!";
    }
    setError(errors);

    return errors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleClick = async () => {
    await setFormErrors(validate(formValues));
    if (error.length > 0) {
      document.getElementById("errormsg").style.display = "block";
    } else {
      fetch("https://dragonmaster.pl/inz/user/create", {
        method: "PUT",
        body: JSON.stringify({
          name: nameOfUser.current.value,
          username: username.current.value,
          surname: surname.current.value,
          mail: mail.current.value,
          phone: phone.current.value,
          password: password.current.value,
        }),
      })
        .then((result) => {
          setIsSended(true);
          if (result.status === 200) {
            console.log("gituwa");
            document.getElementById("errormsg").style.display = "none";
          } else {
            document.getElementById("errormsg").style.display = "block";
          }
          // alert("Zweryfikuj adres e-mail, aby móc się zalogować");
          // setIsRegisterOpen(false);
        })
        .catch((error) => console.log("error:", error),  document.getElementById("errorInt").style.display = "block");
    }
  };

  return (
    <Modal show={isRegisterOpen} onHide={() => setIsRegisterOpen(false)}>
      <Modal.Header closeButton>
        <img
          src={PFP_LOGO}
          style={{ marginLeft: "auto", height: "8vh" }}
          alt="LOGO"
        />
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
          Rejestracja
        </h2>
        <Form style={{ width: "100%" }}>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Control
              type="text"
              placeholder="Imię"
              ref={nameOfUser}
              name="nameOfUser"
              autoFocus
              onChange={handleChange}
            />
            <big_para_sb
              style={{
                color: "red",
                display: "flex",
                alignItems: "center",
                marginLeft: "20px",
              }}
            >
              {formErrors.nameOfUser}
            </big_para_sb>
            <Form.Control
              style={{ marginTop: "1%" }}
              type="text"
              placeholder="Nazwisko"
              ref={surname}
              value={formValues.surname}
              name="surname"
              autoFocus
              onChange={handleChange}
            />
            <big_para_sb
              style={{
                color: "red",
                display: "flex",
                alignItems: "center",
                marginLeft: "20px",
              }}
            >
              {formErrors.surname}
            </big_para_sb>
            <Form.Control
              style={{ marginTop: "1%" }}
              type="text"
              placeholder="Login"
              ref={username}
              name="username"
              value={formValues.username}
              autoFocus
              onChange={handleChange}
            />
            <big_para_sb
              style={{
                color: "red",
                display: "flex",
                alignItems: "center",
                marginLeft: "20px",
              }}
            >
              {formErrors.username}
            </big_para_sb>
            <Form.Control
              style={{ marginTop: "1%" }}
              type="email"
              placeholder="Email"
              ref={mail}
              name="mail"
              value={formValues.mail}
              autoFocus
              onChange={handleChange}
            />
            <big_para_sb
              style={{
                color: "red",
                display: "flex",
                alignItems: "center",
                marginLeft: "20px",
              }}
            >
              {formErrors.mail}
            </big_para_sb>
            <Form.Control
              style={{ marginTop: "1%" }}
              type="tel"
              placeholder="Telefon"
              ref={phone}
              name="phone"
              value={formValues.phone}
              autoFocus
              onChange={handleChange}
            />
            <big_para_sb
              style={{
                color: "red",
                display: "flex",
                alignItems: "center",
                marginLeft: "20px",
              }}
            >
              {formErrors.phone}
            </big_para_sb>
            <Form.Control
              style={{ marginTop: "1%" }}
              type="password"
              placeholder="Hasło"
              ref={password}
              name="password"
              value={formValues.password}
              autoFocus
              onChange={handleChange}
            />
            <big_para_sb
              style={{
                color: "red",
                display: "flex",
                alignItems: "center",
                marginLeft: "20px",
              }}
            >
              {formErrors.password}
            </big_para_sb>
            <Form.Control
              style={{ marginTop: "1%" }}
              type="password"
              placeholder="Potwierdź hasło"
              name="repeatPassword"
              value={formValues.repeatPassword}
              autoFocus
              onChange={handleChange}
            />
            <big_para_sb
              style={{
                color: "red",
                display: "flex",
                alignItems: "center",
                marginLeft: "20px",
              }}
            >
              {formErrors.repeatPassword}
            </big_para_sb>
          </Form.Group>
        </Form>
        <div id={"errormsg"} style={{ display: "none" }}>
          <paragraph_sb style={{ color: "red" }}>
            Coś poszło nie tak. Spróbuj ponownie
          </paragraph_sb>
        </div>
          <div id={"errorInt"} style={{ display: "none" }}>
              <paragraph_sb style={{ color: "red" }}>
                  Coś poszło nie tak. Spróbuj ponownie, lub sprawdź swój internet
              </paragraph_sb>
          </div>
        <Button
          type="submit"
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
          ZAREJESTRUJ
        </Button>
        <h6
          style={{
            fontFamily: "Montserrat",
            fontWeight: "400",
            fontSize: "10px",
            lineHeight: "12px",
            color: "828282",
            marginTop: "3%",
            marginBottom: "0%",
          }}
        >
          Rejestrując się wyrażasz zgodę na przetwarzanie danych osobowych
        </h6>
      </Modal.Body>
      <Modal.Footer
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <paragraph>
          Masz już konto?
          <paragraph
            style={{
              textDecoration: "underline",
              marginLeft: "3px",
              cursor: "pointer",
            }}
            onClick={(e) => {
              e.preventDefault();
              setIsLoginOpen(true);
              setIsRegisterOpen(false);
            }}
          >
            Zaloguj się
          </paragraph>
        </paragraph>
      </Modal.Footer>
    </Modal>
  );
};

export default Register_popup;
