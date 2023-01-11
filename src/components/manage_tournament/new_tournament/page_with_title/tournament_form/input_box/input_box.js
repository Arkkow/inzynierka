import React, { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import { postImage } from "../../../../../../api/tournament/tournament_CRUD_api.js";
import { wait } from "@testing-library/user-event/dist/utils";

//import {getElement} from "bootstrap/js/src/util";

function InputBox() {
  const initialValues = {
    tournamentName: "",
    miejsce: "",
    wpisowe: "",
    dyrektor: "",
    telefon: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isLoading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validate = (values) => {
    const errors = {};
    if (!values.tournamentName) {
      errors.tournamentName = "Wpisz nazwę turnieju";
    }
    if (!values.miejsce) {
      errors.miejsce = "Wpisz miejsce turnieju";
    }
    if (!values.wpisowe) {
      errors.wpisowe = "Wpisz wartość wpisowego";
    }
    if (!values.dyrektor) {
      errors.dyrektor = "Wpisz dyrektora turnieju";
    }
    if (!values.telefon) {
      errors.telefon = "Wpisz numer telefonu dyrektora turnieju";
    }
    if (!from.current.value) {
      errors.from = "Podaj datę rozpoczęcia turnieju";
    }
    if (!to.current.value) {
      errors.to = "Podaj datę zakończenia turnieju";
    }
    if (!entriesTo.current.value) {
      errors.entriesTo = "Podaj datę końca zapisów";
    }

    return errors;
  };

  const [error, setError] = useState(null);
  const Token = JSON.parse(localStorage.getItem("token")).token;
  const name = useRef("1");
  const typeOfLadder = useRef("1");
  const pointsForTournament = useRef(1);
  let places = useRef("8");
  // const roles = useRef("1");
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
  let visibility = "";
  let ranked = "";

  const handleClick = () => {
    setLoading(true);
    setFormErrors(validate(formValues));
    if (document.getElementById("visibility_var").checked) {
      visibility = "TRUE";
    } else {
      visibility = "FALSE";
    }

    if (document.getElementById("ranked_var").checked) {
      ranked = "1";
    } else {
      ranked = "0";
    }

    if (
      places.current.value === "8" &&
      categotry.current.value === "CHALLENGER"
    ) {
      pointsForTournament.value = "250";
    } else if (
      places.current.value === "16" &&
      categotry.current.value === "CHALLENGER"
    ) {
      pointsForTournament.value = "500";
    } else if (
      places.current.value === "8" &&
      categotry.current.value === "MASTER"
    ) {
      pointsForTournament.value = "500";
    } else {
      pointsForTournament.value = "1000";
    }

    if (
      !name.current.value ||
      !entryFee.current.value ||
      !place.current.value ||
      !phone.current.value ||
      !director.current.value ||
      !from.current.value ||
      !to.current.value ||
      !entriesTo.current.value
    ) {
      alert("Nie wszystkie pola zostały wypełnione");
    }
    else if (to.current.value < from.current.value) {
      alert("Turniej nie może kończyć się przed rozpoczęciem!");
    }
    else if (!((from.current.value >= entriesTo.current.value)) ) {
      alert("Zapisy nie mogą zaczynać się po rozpoczęciu turnieju!");
    }
    else {
      fetch("https://dragonmaster.pl/inz/tournament", {
        headers: {
          Authorization: "Bearer " + Token,
        },
        method: "PUT",
        body: JSON.stringify({
          name: name.current.value,
          typeOfLadder: typeOfLadder.current.value,
          pointsForTournament: "4",
          places: places.current.value,
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
        .then((response) => {
          console.log(response);
          //usefulll link https://usefulangle.com/post/67/pure-javascript-ajax-file-upload-showing-progess-percent
          if (document.getElementById("formFile").files.length !== 0) {
            var reader = new FileReader();
            reader.onload = function () {
              var arrayBuffer = this.result;
              var xhttp = new XMLHttpRequest();
              xhttp.upload.addEventListener("progress", function (e) {
                let percent_complete = Math.round((e.loaded / e.total) * 100);

                // percentage of upload completed
                document.getElementById("uploadmsg").innerText =
                  "PRZESYŁANIE: " + percent_complete + " %";
              });
              xhttp.onreadystatechange = function () {
                if (this.readyState === 4) {
                  if (this.status === 200) {
                    document.getElementById("uploadmsg").innerText =
                      "PRZESŁANO";
                    window.location.href = "calendar";
                  } else {
                    document.getElementById("uploadmsg").innerText =
                        "Coś poszło nie tak";
                  }
                }
              };
              xhttp.responseType = "blob";
              xhttp.open(
                "POST",
                "https://dragonmaster.pl/inz/tournament/image?id=" +
                  response.id
              );
              xhttp.setRequestHeader("Authorization", "Bearer " + Token);
              xhttp.send(arrayBuffer);
            };
            reader.readAsArrayBuffer(
              document.getElementById("formFile").files[0]
            );
          }
          else {
            window.location.href = "calendar";
          }
        });
      if (error) {
        if (error !== "Failed to fetch") {
          alert(error);
        } else {
          console.log(error.message);
        }
      } else if (
        name.current.value &&
        entryFee.current.value &&
        place.current.value &&
        phone.current.value &&
        director.current.value &&
        from.current.value &&
        to.current.value &&
        entriesTo.current.value &&
        !error
      ) {
      }
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
      {/*<button*/}
      {/*  style={{*/}
      {/*    fontFamily: "Montserrat",*/}
      {/*    fontWeight: "600",*/}
      {/*    fontSize: "18px",*/}
      {/*    lineHeight: "25px",*/}
      {/*    color: "white",*/}
      {/*    float: "right",*/}
      {/*    marginRight: "5%",*/}
      {/*  }}*/}
      {/*  type="button"*/}
      {/*  className="btn btn-success"*/}
      {/*>*/}
      {/*  STWÓRZ SZABLON TURNIEJU*/}
      {/*</button>*/}

      <label
        style={{ display: "block", textAlign: "left", width: "33%" }}
        htmlFor="exampleFormControlInput1"
        className="form-label"
      >
        Nazwa turnieju
      </label>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <input
          style={{ width: "33%" }}
          type="text"
          className="form-control"
          name="tournamentName"
          value={formValues.tournamentName}
          ref={name}
          onChange={handleChange}
        ></input>
        <big_para_sb
          style={{
            color: "red",
            display: "flex",
            alignItems: "center",
            marginLeft: "20px",
          }}
        >
          {formErrors.tournamentName}
        </big_para_sb>
      </div>

      <label
        style={{ display: "block", textAlign: "left", marginTop: "1%" }}
        htmlFor="exampleFormControlInput1"
        className="form-label"
      >
        Data rozpoczęcia turnieju
      </label>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <input
          style={{ width: "33%" }}
          type="date"
          className="form-control"
          id="exampleFormControlInput1"
          ref={from}
        ></input>
        <big_para_sb
          style={{
            color: "red",
            display: "flex",
            alignItems: "center",
            marginLeft: "20px",
          }}
        >
          {formErrors.from}
        </big_para_sb>
      </div>

      <label
        style={{ display: "block", textAlign: "left", marginTop: "1%" }}
        htmlFor="exampleFormControlInput1"
        className="form-label"
      >
        Data zakończenia turnieju
      </label>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <input
          style={{ width: "33%" }}
          type="date"
          className="form-control"
          id="exampleFormControlInput1"
          ref={to}
        ></input>
        <big_para_sb
          style={{
            color: "red",
            display: "flex",
            alignItems: "center",
            marginLeft: "20px",
          }}
        >
          {formErrors.to}
        </big_para_sb>
      </div>

      <label
        style={{ display: "block", textAlign: "left", marginTop: "1%" }}
        htmlFor="exampleFormControlInput1"
        className="form-label"
      >
        Miejsce
      </label>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <input
          style={{ width: "33%" }}
          type="text"
          className="form-control"
          name="miejsce"
          value={formValues.miejsce}
          onChange={handleChange}
          ref={place}
        ></input>
        <big_para_sb
          style={{
            color: "red",
            display: "flex",
            alignItems: "center",
            marginLeft: "20px",
          }}
        >
          {formErrors.miejsce}
        </big_para_sb>
      </div>

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
          className="form-select"
          id="sel1"
          ref={rang}
        >
          <option selected>CHALLENGER</option>
          <option value="MASTER">MASTER</option>
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
          <option >DRABINKA O MIEJSCA</option>
          {/*<option value="2">GRUPY + DRABINKA</option>*/}
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
          <option selected>8</option>
          <option>16</option>
        </select>
      </div>

      <label
        style={{ display: "block", textAlign: "left", marginTop: "1%" }}
        htmlFor="exampleFormControlInput1"
        className="form-label"
      >
        Wpisowe
      </label>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <input
          style={{ width: "33%" }}
          type="number"
          className="form-control"
          name="wpisowe"
          value={formValues.wpisowe}
          onChange={handleChange}
          ref={entryFee}
        ></input>
        <big_para_sb
          style={{
            color: "red",
            display: "flex",
            alignItems: "center",
            marginLeft: "20px",
          }}
        >
          {formErrors.wpisowe}
        </big_para_sb>
      </div>

      <label
        style={{ display: "block", textAlign: "left", marginTop: "1%" }}
        htmlFor="exampleFormControlInput1"
        className="form-label"
      >
        Dyrektor turnieju
      </label>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <input
          style={{ width: "33%" }}
          type="text"
          className="form-control"
          name="dyrektor"
          value={formValues.dyrektor}
          onChange={handleChange}
          ref={director}
        ></input>
        <big_para_sb
          style={{
            color: "red",
            display: "flex",
            alignItems: "center",
            marginLeft: "20px",
          }}
        >
          {formErrors.dyrektor}
        </big_para_sb>
      </div>

      <label
        style={{ display: "block", textAlign: "left", marginTop: "1%" }}
        htmlFor="exampleFormControlInput1"
        className="form-label"
      >
        Telefon
      </label>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <input
          style={{ width: "33%" }}
          type="tel"
          className="form-control"
          name="telefon"
          value={formValues.telefon}
          onChange={handleChange}
          ref={phone}
        ></input>
        <big_para_sb
          style={{
            color: "red",
            display: "flex",
            alignItems: "center",
            marginLeft: "20px",
          }}
        >
          {formErrors.telefon}
        </big_para_sb>
      </div>

      <label
        style={{ display: "block", textAlign: "left", marginTop: "1%" }}
        htmlFor="exampleFormControlInput1"
        className="form-label"
      >
        Zapisy do
      </label>
      <div
        style={{ display: "flex", flexDirection: "row", alignItems: "center" }}
      >
        <input
          style={{ width: "33%" }}
          type="date"
          className="form-control"
          id="exampleFormControlInput1"
          ref={entriesTo}
        ></input>
        <big_para_sb
          style={{
            color: "red",
            display: "flex",
            alignItems: "center",
            marginLeft: "20px",
          }}
        >
          {formErrors.entriesTo}
        </big_para_sb>
      </div>

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

      {/** **************** **/}
      {/** SLIDERY **/}
      {/** **************** **/}

      {/*Widoczność*/}
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
        />
      </div>

      {/*Rankingowość*/}
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
          id="ranked_var"
        />
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
        accept="image/*"
      ></input>
      <div id="uploadmsg"></div>

      <div style={{ marginTop: "3%" }}>
        <Button
          href={"calendar"}
          style={{
            fontFamily: "Montserrat",
            fontWeight: "600",
            fontSize: "18px",
            lineHeight: "25px",
            color: "white",
            marginRight: "30px",
          }}
          className="btn btn-secondary"
        >
          ANULUJ
        </Button>
        <Button
          style={{
            fontFamily: "Montserrat",
            fontWeight: "600",
            fontSize: "18px",
            lineHeight: "25px",
            color: "white",
          }}
          className="btn btn-success"
          onClick={() => {
            handleClick();
          }}
        >
          STWÓRZ TURNIEJ
        </Button>
      </div>
    </div>
  );
}

export default InputBox;
