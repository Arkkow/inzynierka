import React, { useState, useRef } from "react";
import "../input_box/input_box.css";

function InputBox() {
  const [error, setError] = useState(null);
  const [isSended, setIsSended] = useState(false);
  const [response, setResponse] = useState([]);
  const Token = JSON.parse(localStorage.getItem("token")).token;
  const name = useRef("1");
  const typeOfLadder = useRef("1");
  const pointsForTournament = useRef(1);
  const places = useRef("1");
  // const roles = useRef("1");
  const ranked = useRef("1");
  const place = useRef("1");
  const from = useRef("1");
  const to = useRef("1");
  const rang = useRef("1");
  const entryFee = useRef("5");
  const director = useRef("1");
  const phone = useRef("1");
  const entriesTo = useRef("1");
  const additionalInformations = useRef("1");
  const categotry = useRef("OPEN");
  const visibility = useRef("TRUE");
  const handleClick = () => {
    if (visibility.current.value == "on") {
      visibility.current.value = "TRUE";
    } else {
      visibility.current.value = "FALSE";
    }

    if (ranked.current.value == "on") {
      ranked.current.value = "TRUE";
    } else {
      ranked.current.value = "FALSE";
    }

    if (places.current.value == "8") {
      pointsForTournament.value = "20";
    } else {
      pointsForTournament.value = "50";
    }
    fetch("https://dragonmaster.pl/inz/tournament", {
      headers: {
        Authorization: "Bearer " + Token,
      },
      method: "PUT",
      body: JSON.stringify({
        name: name.current.value,
        typeOfLadder: typeOfLadder.current.value,
        pointsForTournament: "4",
        places: "2",
        // roles: "dupa",
        ranked: ranked.current.value,
        place: place.current.value,
        from: from.current.value,
        to: to.current.value,
        rang: rang.current.value,
        entryFee: entryFee.current.value,
        director: director.current.value,
        phone: phone.current.value,
        entriesTo: entriesTo.current.value,
        additionalInformations: additionalInformations.current.value,
        categotry: categotry.current.value,
        visibility: "TRUE",
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsSended(true);
          setResponse(result);
          console.log(result);
        },
        (error) => {
          setIsSended(true);
          setError(error);
        }
      );
    if (error) {
      alert("Coś poszło nie tak: " + error.message);
    }
  };

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
      <button
        style={{
          fontFamily: "Montserrat",
          fontWeight: "600",
          fontSize: "18px",
          lineHeight: "25px",
          color: "white",
          float: "right",
          marginRight: "5%",
        }}
        type="button"
        className="btn btn-success"
      >
        STWÓRZ SZABLON TURNIEJU
      </button>

      <label
        style={{ display: "block", textAlign: "left", width: "33%" }}
        htmlFor="exampleFormControlInput1"
        className="form-label"
      >
        Nazwa turnieju
      </label>
      <input
        style={{ width: "33%" }}
        type="text"
        className="form-control"
        id="exampleFormControlInput1"
        ref={name}
      ></input>

      <label
        style={{ display: "block", textAlign: "left", marginTop: "1%" }}
        htmlFor="exampleFormControlInput1"
        className="form-label"
      >
        Data rozpoczęcia turnieju
      </label>
      <input
        style={{ width: "33%" }}
        type="date"
        className="form-control"
        id="exampleFormControlInput1"
        ref={from}
      ></input>
      <label
        style={{ display: "block", textAlign: "left", marginTop: "1%" }}
        htmlFor="exampleFormControlInput1"
        className="form-label"
      >
        Data zakończenia turnieju
      </label>
      <input
        style={{ width: "33%" }}
        type="date"
        className="form-control"
        id="exampleFormControlInput1"
        ref={to}
      ></input>

      <label
        style={{ display: "block", textAlign: "left", marginTop: "1%" }}
        htmlFor="exampleFormControlInput1"
        className="form-label"
      >
        Miejsce
      </label>
      <input
        style={{ width: "33%" }}
        type="text"
        className="form-control"
        id="exampleFormControlInput1"
        ref={place}
      ></input>

      <label
        style={{ display: "block", textAlign: "left", marginTop: "1%" }}
        htmlFor="exampleFormControlInput1"
        className="form-label"
      >
        Kategorie
      </label>
      <input
        style={{ width: "10%", textAlign: "center" }}
        className="form-control"
        type="text"
        value="OPEN"
        aria-label="Disabled input example"
        disabled
        readOnly
        ref={categotry}
      ></input>

      <div className="form-group">
        <label
          style={{ display: "block", textAlign: "left", marginTop: "1%" }}
          htmlFor="exampleFormControlInput1"
          className="form-label"
        >
          Ranga
        </label>
        <select
          style={{ width: "33%" }}
          className="form-control"
          id="sel1"
          ref={rang}
        >
          <option selected>CHALLENGER</option>
          <option value="1">MASTER</option>
        </select>
      </div>

      <div className="form-group">
        <label
          style={{ display: "block", textAlign: "left", marginTop: "1%" }}
          htmlFor="exampleFormControlInput1"
          className="form-label"
        >
          System turniejowy
        </label>
        <select
          style={{ width: "33%" }}
          className="form-select"
          id="sel1"
          ref={typeOfLadder}
        >
          <option selected>DRABINKA KLASYCZNA</option>
          <option value="1">DRABINKA O MIEJSCA</option>
          <option value="2">GRUPY + DRABINKA</option>
        </select>
      </div>

      <div className="form-group">
        <label
          style={{ display: "block", textAlign: "left", marginTop: "1%" }}
          htmlFor="exampleFormControlInput1"
          className="form-label"
        >
          Liczba par
        </label>
        <select style={{ width: "33%" }} className="form-select" id="sel1">
          <option selected>8</option>
          <option value="1">16</option>
        </select>
      </div>

      <label
        style={{ display: "block", textAlign: "left", marginTop: "1%" }}
        htmlFor="exampleFormControlInput1"
        className="form-label"
      >
        Wpisowe
      </label>
      <input
        style={{ width: "33%" }}
        type="number"
        className="form-control"
        id="exampleFormControlInput1"
        ref={entryFee}
      ></input>

      <label
        style={{ display: "block", textAlign: "left", marginTop: "1%" }}
        htmlFor="exampleFormControlInput1"
        className="form-label"
      >
        Dyrektor turnieju
      </label>
      <input
        style={{ width: "33%" }}
        type="text"
        className="form-control"
        id="exampleFormControlInput1"
        ref={director}
      ></input>

      <label
        style={{ display: "block", textAlign: "left", marginTop: "1%" }}
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
        ref={phone}
      ></input>

      <label
        style={{ display: "block", textAlign: "left", marginTop: "1%" }}
        htmlFor="exampleFormControlInput1"
        className="form-label"
      >
        Zapisy do
      </label>
      <input
        style={{ width: "33%" }}
        type="date"
        className="form-control"
        id="exampleFormControlInput1"
        ref={entriesTo}
      ></input>

      <label
        style={{ display: "block", textAlign: "left", marginTop: "1%" }}
        htmlFor="exampleFormControlTextarea1"
        className="form-label"
      >
        Dodatkowe informacje
      </label>
      <textarea
        style={{ width: "66%", height: "25vh", resize: "none" }}
        className="form-control"
        id="exampleFormControlTextarea1"
        rows="3"
        ref={additionalInformations}
      ></textarea>

      <label
        style={{ display: "block", textAlign: "left", marginTop: "1%" }}
        htmlFor="exampleFormControlTextarea1"
        className="form-label"
      >
        Widoczność turnieju
      </label>
      <div
        style={{ display: "block", textAlign: "left" }}
        className="form-check form-switch"
      >
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          ref={visibility}
        ></input>
      </div>

      <label
        style={{ display: "block", textAlign: "left", marginTop: "1%" }}
        htmlFor="exampleFormControlTextarea1"
        className="form-label"
      >
        Rankingowość turnieju
      </label>
      <div
        style={{ display: "block", textAlign: "left" }}
        className="form-check form-switch"
      >
        <input
          className="form-check-input"
          type="checkbox"
          role="switch"
          id="flexSwitchCheckDefault"
          ref={ranked}
        ></input>
      </div>

      <label
        style={{ display: "block", textAlign: "left", marginTop: "1%" }}
        htmlFor="exampleFormControlTextarea1"
        className="form-label"
      >
        Logo turnieju
      </label>
      <input
        style={{ width: "33%" }}
        className="form-control"
        type="file"
        id="formFile"
      ></input>

      <div style={{ marginTop: "3%" }}>
        <button
          style={{
            marginRight: "2%",
            fontFamily: "Montserrat",
            fontWeight: "600",
            fontSize: "18px",
            lineHeight: "25px",
            color: "white",
          }}
          type="button"
          className="btn btn-secondary"
        >
          ANULUJ
        </button>
        <button
          style={{
            fontFamily: "Montserrat",
            fontWeight: "600",
            fontSize: "18px",
            lineHeight: "25px",
            color: "white",
          }}
          type="button"
          className="btn btn-success"
          onClick={handleClick}
        >
          STWÓRZ TURNIEJ
        </button>
      </div>
    </div>
  );
}

export default InputBox;
