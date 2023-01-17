import React, { useRef } from "react";
import "./input_box.css";

import { useEffect, useState } from "react";

function InputBox() {
  const [error, setError] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userData, setUserData] = useState([]);
  const Token = JSON.parse(localStorage.getItem("token")).token;
  const name = useRef("initial");
  const surname = useRef("initial");
  const password = useRef("initial");
  const repeatPassword = useRef("initial");
  const phone = useRef("initial");
  const mail = useRef("initial");
  let body = 0;

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  const handleClick = () => {
      if (password.current.value == repeatPassword.current.value) {
              if (name.current.value == null) {
                  name.current.value = userData.name;
              } else if (surname.current.value == null) {
                  surname.current.value = userData.surname;
              } else if (mail.current.value == null) {
                  mail.current.value = userData.mail;
              } else if (phone.current.value == null) {
                  phone.current.value = userData.phone;
              }

              if (password.current.value !== ""){
                  body = JSON.stringify({
                      name: name.current.value,
                      surname: surname.current.value,
                      mail: mail.current.value,
                      phone: phone.current.value,
                      password: password.current.value,
                  })
              }
              else{
                  body = JSON.stringify({
                      name: name.current.value,
                      surname: surname.current.value,
                      mail: mail.current.value,
                      phone: phone.current.value,
                  })
              }

              fetch("https://dragonmaster.pl/inz/user", {
                  method: "POST",
                  body: body,
                  headers: {
                      Accept: "application/json",
                      Authorization: "Bearer " + Token,
                  },
              })
                  .then((res) => res.json())
                  .then(
                      (result) => {
                          console.log(result);
                          window.location.reload();
                      },
                      (error) => {
                          setError(error);
                          window.location.reload();
                      }
                  );
              if (error) {
                  alert("Coś poszło nie tak: " + error.message);
              }
          } else {
              alert("Powtórzone hasło nie jest takie samo!");
  }};

  useEffect(() => {
    fetch("https://dragonmaster.pl/inz/user", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + Token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setUserData(result);
          console.log(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Proszę czekać...</div>;
  } else if (!isLoaded) {
    return <div>Proszę czekać...</div>;
  } else {
    return (
      <div
        className="mb-3"
        style={{
          paddingTop: "3%",
          paddingLeft: "3%",
          fontFamily: "Montserrat",
          fontWeight: "600",
          fontSize: "18px",
          lineHeight: "22px",
          color: "var(--dark_grey)",
        }}
      >
        <label
          style={{ display: "block", textAlign: "left" }}
          htmlFor="exampleFormControlInput1"
          className="form-label"
        >
          Twoje ID
        </label>
        <input
          style={{ width: "33%" }}
          type="text"
          readOnly
          className="form-control-plaintext"
          id="staticID"
          defaultValue={userData.id}
        ></input>

        <label
          style={{ display: "block", textAlign: "left", marginTop: "1%" }}
          htmlFor="exampleFormControlInput1"
          className="form-label"
        >
          Login
        </label>
        <input
          style={{ width: "33%" }}
          type="text"
          readOnly
          className="form-control-plaintext"
          id="staticLogin"
          disabled={true}
          defaultValue={userData.login}
        ></input>

        <label
          style={{ display: "block", textAlign: "left", marginTop: "1%" }}
          htmlFor="exampleFormControlInput1"
          className="form-label"
        >
          Email
        </label>
        <input
          style={{ width: "33%" }}
          type="text"
          readOnly
          className="form-control-plaintext"
          id="staticEmail"
          disabled={true}
          defaultValue={userData.mail}
          ref={mail}
        ></input>

        <label
          style={{
            display: "block",
            textAlign: "left",
            width: "33%",
            marginTop: "1%",
          }}
          htmlFor="exampleFormControlInput1"
          className="form-label"
        >
          Imię
        </label>
        <input
          style={{ width: "33%" }}
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          defaultValue={userData.name}
          ref={name}
        ></input>

        <label
          style={{
            display: "block",
            textAlign: "left",
            width: "33%",
            marginTop: "1%",
          }}
          htmlFor="exampleFormControlInput1"
          className="form-label"
        >
          Nazwisko
        </label>
        <input
          style={{ width: "33%" }}
          type="text"
          className="form-control"
          id="exampleFormControlInput1"
          defaultValue={userData.surname}
          ref={surname}
        ></input>

        <label
          style={{
            display: "block",
            textAlign: "left",
            width: "33%",
            marginTop: "1%",
          }}
          htmlFor="exampleFormControlInput1"
          className="form-label"
        >
          Telefon
        </label>
        <input
          style={{ width: "33%" }}
          type="tel"
          className="form-control"
          id="exampleFormControlInput1"
          defaultValue={userData.phone}
          ref={phone}
        ></input>

        <label
          style={{
            display: "block",
            textAlign: "left",
            width: "33%",
            marginTop: "1%",
          }}
          htmlFor="exampleFormControlInput1"
          className="form-label"
        >
          Nowe hasło
        </label>
        <input
          style={{ width: "33%" }}
          type="password"
          className="form-control"
          id="exampleFormControlInput1"
          ref={password}
        ></input>

        <label
          style={{
            display: "block",
            textAlign: "left",
            width: "33%",
            marginTop: "1%",
          }}
          htmlFor="exampleFormControlInput1"
          className="form-label"
        >
          Powtórz nowe hasło
        </label>
        <input
          style={{ width: "33%" }}
          type="password"
          className="form-control"
          id="exampleFormControlInput1"
          ref={repeatPassword}
        ></input>

        <div style={{ marginTop: "5%" }}>
          <button
            style={{
              fontFamily: "Montserrat",
              fontWeight: "600",
              fontSize: "18px",
              lineHeight: "25px",
              color: "white",
            }}
            onClick={handleClick}
            type="button"
            className="btn btn-success"
          >
            WPROWADŹ ZMIANY
          </button>
        </div>
      </div>
    );
  }
}

export default InputBox;
