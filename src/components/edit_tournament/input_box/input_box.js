import React, { useState, useRef } from "react";
import "../input_box/input_box.css";
import PFP_LOGO from "../../../assets/PFP_LOGO.png";
import {getTournaments} from "../../api/api";

function InputBox() {



  const [tournament, getTournament] = useState({"fetched":false,data:[]});
  if(tournament.fetched === false){
    getTournaments().then((dane)=>{getTournament({"fetched":true,data:dane});})
  }


  const id = window.location.href.split('?')[1].split('=')[1];
  const [error, setError] = useState(null);
  const [isSended, setIsSended] = useState(false);
  const [response, setResponse] = useState([]);
  const Token = JSON.parse(localStorage.getItem("token")).token;
  const name = useRef("1");
  const typeOfLadder = useRef("1");
  const pointsForTournament = useRef("50");
  const places = useRef("1");
  const roles = useRef("1");
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

    const id = window.location.href.split('?')[1].split('=')[1]

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
        visibility: visibility.current.value,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsSended(true);
          setResponse(result);
          console.log(result);
          window.location.href = "http://localhost:3000/calendar"
        },
        (error) => {
          setIsSended(true);
          setError(error);
        }
      );

    if (error) {
      console.log("Coś poszło nie tak: " + error.message);
    }

  };


  return (
      <>
      {tournament.fetched === false ?
            <h5>no results available</h5> :
            tournament.data.map((data)=>(

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
        defaultValue={data.name}
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
        defaultValue="2022-05-28"
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
        defaultValue="2022-05-29"
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
        defaultValue="Propadel, Warszawa"
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
        <select
          style={{ width: "33%" }}
          className="form-select"
          id="sel1"
          ref={places}
        >
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
        defaultValue="80"
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
        defaultValue="Adam Kowalski"
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
        defaultValue="605432123"
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
        defaultValue="2022-05-20"
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
        defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tortor lectus, pretium sed nibh sed, interdum euismod orci. Maecenas feugiat, nisi a viverra volutpat, nulla enim cursus enim, nec mollis augue dui eget magna. Mauris non rhoncus sem. Proin rhoncus lobortis neque, non fringilla magna gravida eget. Integer vehicula suscipit arcu nec tincidunt. Integer malesuada lorem sit amet massa ullamcorper, et faucibus est venenatis. Sed maximus pellentesque mauris, eget malesuada risus eleifend vitae. Duis sollicitudin sit amet metus suscipit lobortis. Integer massa erat, ultrices non augue eu, suscipit ultricies nisl. Donec ultricies augue eu enim laoreet, in tristique nulla pharetra. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec nec rutrum mauris. Aliquam congue ligula eu dictum lobortis. Aenean suscipit pulvinar diam at ultrices. In vestibulum sagittis libero, id ultrices ante placerat sed. Ut porttitor commodo tincidunt. Aliquam eu neque eget nulla tempor feugiat at vitae velit. Donec eleifend venenatis eleifend. Cras mi ex, scelerisque cursus dignissim ac, commodo eu elit. In hac habitasse platea dictumst. Vestibulum sed urna id magna venenatis ornare ut in erat. Nulla nulla justo, porttitor ut tempus egestas, vestibulum eget diam. In non orci enim."
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
          defaultChecked={true}
          ref={visibility}
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

      <div style={{ borderStyle: "solid", marginTop: "1%", width: "110px" }}>
        <img src={PFP_LOGO} style={{ width: "100px", height: "100px" }} />
      </div>

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
          EDYTUJ TURNIEJ
        </button>
      </div>
    </div>))}</>
  );
}

export default InputBox;
