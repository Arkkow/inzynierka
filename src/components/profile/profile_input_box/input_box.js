import React, { useRef } from "react";
import "../profile_input_box/input_box.css";

import { useEffect, useState } from "react";

function InputBox() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSended, setIsSended] = useState(false);
  const [response, setResponse] = useState([]);
  const [userData, setUserData] = useState([]);
  const Token = JSON.parse(localStorage.getItem("token")).token;
  const name = useRef(null);
  const surname = useRef(null);
  const password = useRef(null);
  const phone = useRef(null);
  const mail = useRef(null);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  const handleClick = () => {
    if (name.current.value == null) {
      name.current.value = userData.name;
    } else if (surname.current.value == null) {
      surname.current.value = userData.surname;
    } else if (mail.current.value == null) {
      mail.current.value = userData.mail;
    } else if (phone.current.value == null) {
      phone.current.value = userData.phone;
    } else if (password.current.value == null) {
      password.current.value = userData.password;
    }
    fetch("https://dragonmaster.pl/inz/user", {
      method: "POST",
      body: JSON.stringify({
        name: name.current.value,
        surname: surname.current.value,
        mail: mail.current.value,
        phone: phone.current.value,
        password: password.current.value,
      }),
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + Token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsSended(true);
          setResponse(result);
          console.log(result);
          window.location.reload(false);
        },
        (error) => {
          setIsSended(true);
          setError(error);
          window.location.reload(false);
        }
      );
    if (error) {
      alert("Coś poszło nie tak: " + error.message);
    }
  };

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
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
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
          value={userData.id}
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
          value={userData.login}
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
          E-mail
        </label>
        <input
          style={{ width: "33%" }}
          type="email"
          className="form-control"
          id="exampleFormControlInput1"
          placeholder={userData.mail}
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
          placeholder={userData.name}
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
          placeholder={userData.surname}
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
          placeholder={userData.phone}
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
