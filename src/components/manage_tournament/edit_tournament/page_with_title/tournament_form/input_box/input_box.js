import React, { useState, useRef } from "react";
import PFP_LOGO from "../../../../../../assets/PFP_LOGO.png";
import { getTournamentById } from "../../../../../../api/api";

function InputBox() {
  const id = window.location.href.split("?")[1].split("=")[1];

  const [tournament, getTournament] = useState({ fetched: false, data: [] });
  if (tournament.fetched === false) {
    getTournamentById(id).then((dane) => {
      getTournament({ fetched: true, data: dane });
    });
  }

  const [error, setError] = useState(null);
  const Token = JSON.parse(localStorage.getItem("token")).token;
  const name = useRef("1");
  const typeOfLadder = useRef("1");
  const pointsForTournament = useRef("50");
  const places = useRef("1");
  const roles = useRef("1");
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
  let ranked = "";
  let visibility = ""

  function sendData() {
    if (document.getElementById("visibility_var").checked) {
      visibility = "TRUE";
    } else {
      visibility = "FALSE";
    }

    if (
      places.current.value == "8" &&
      categotry.current.value == "CHALLENGER"
    ) {
      pointsForTournament.value = "250";
      roles.value = "8";
    } else if (
      places.current.value == "16" &&
      categotry.current.value == "CHALLENGER"
    ) {
      pointsForTournament.value = "500";
      roles.value = "16";
    } else if (
      places.current.value == "8" &&
      categotry.current.value == "MASTER"
    ) {
      pointsForTournament.value = "500";
      roles.value = "8";
    } else {
      pointsForTournament.value = "1000";
      roles.value = "16";
    }

    const id = window.location.href.split("?")[1].split("=")[1];

    fetch("https://dragonmaster.pl/inz/tournament", {
      headers: {
        Authorization: "Bearer " + Token,
      },
      method: "POST",
      body: JSON.stringify({
        id: id,
        name: name.current.value,
        typeOfLadder: typeOfLadder.current.value,
        pointsForTournament: pointsForTournament.value,
        places: places.current.value,
        roles: roles.value,
        ranked: ranked,
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
        visibility: visibility,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          window.location.href = "calendar";
        },
        (error) => {
          setError(error);
        }
      );

    if (error) {
      console.log("Coś poszło nie tak: " + error.message);
      alert("Coś nie tak");
    }
  }

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
        defaultValue={tournament.data.name}
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
        defaultValue={tournament.data.from}
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
        defaultValue={tournament.data.to}
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
        defaultValue={tournament.data.place}
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
        value={tournament.data.categotry}
        aria-label="Disabled input example"
        ref={categotry}
        disabled
        readOnly
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
          className="form-select"
          id="sel1"
          ref={rang}
        >
          {tournament.data.rang === "CHALLENGER" ? (
            <option selected>CHALLENGER</option>
          ) : (
            <option value="CHALLENGER">CHALLENGER</option>
          )}
          {tournament.data.rang === "MASTER" ? (
            <option selected>MASTER</option>
          ) : (
            <option value="MASTER">MASTER</option>
          )}
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
          {tournament.data.typeOfLadder == "DRABINKA KLASYCZNA" ? (
            <option selected>DRABINKA KLASYCZNA</option>
          ) : (
            <option value="DRABINKA KLASYCZNA">DRABINKA KLASYCZNA</option>
          )}
          {tournament.data.typeOfLadder == "DRABINKA O MIEJSCA" ? (
            <option selected>DRABINKA O MIEJSCA</option>
          ) : (
            <option value="DRABINKA O MIEJSCA">DRABINKA O MIEJSCA</option>
          )}
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
        <select
          style={{ width: "33%" }}
          className="form-select"
          id="sel1"
          ref={places}
        >
          {tournament.data.places == "8" ? (
            <option selected>8</option>
          ) : (
            <option value="8">8</option>
          )}
          {tournament.data.places == "16" ? (
            <option selected>16</option>
          ) : (
            <option value="16">16</option>
          )}
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
        defaultValue={tournament.data.entryFee}
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
        defaultValue={tournament.data.director}
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
        defaultValue={tournament.data.phone}
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
        defaultValue={tournament.data.entriesTo}
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
        defaultValue={tournament.data.additionalInformations}
        ref={additionalInformations}
      ></textarea>

      {/*{tournament.data.visibility === "FALSE"?*/}
      {/*    <>*/}
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
          id="visibility_var"
          defaultChecked={tournament.data.visibility !== "FALSE"}
        />
      </div>
      {/*    </>*/}
      {/*    :null*/}
      {/*}*/}

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
      <div id="uploadmsg"></div>
      {/*<div style={{ borderStyle: "solid", marginTop: "1%", width: "110px" }}>*/}
      {/*  <img src={PFP_LOGO} style={{ width: "100px", height: "100px" }} />*/}
      {/*</div>*/}

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
          onClick={() => {
            if (document.getElementById("formFile").files.length != 0) {
              var reader = new FileReader();
              reader.onload = function () {
                var arrayBuffer = this.result;
                var xhttp = new XMLHttpRequest();
                xhttp.upload.addEventListener("progress", function (e) {
                  let percent_complete = Math.round((e.loaded / e.total) * 100);

                  // percentage of upload completed
                  document.getElementById("uploadmsg").innerText =
                    "PRZESYŁANIE: " + percent_complete;
                });
                xhttp.onreadystatechange = function () {
                  if (this.readyState === 4) {
                    if (this.status === 200) {
                      document.getElementById("uploadmsg").innerText =
                        "PRZESŁANO";
                      sendData();
                    } else {
                    }
                  }
                };
                xhttp.responseType = "blob";
                xhttp.open(
                  "POST",
                  "https://dragonmaster.pl/inz/tournament/image?id=" +
                    window.location.href.split("?")[1].split("=")[1]
                );
                xhttp.setRequestHeader("Authorization", "Bearer " + Token);
                xhttp.send(arrayBuffer);
              };
              reader.readAsArrayBuffer(
                document.getElementById("formFile").files[0]
              );
            } else {
              sendData();
            }
          }}
        >
          EDYTUJ TURNIEJ
        </button>
      </div>
    </div>
  );
}

export default InputBox;
