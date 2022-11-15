import React from "react";
import "../profile_input_box/input_box.css";

function InputBox() {
    return (
        <div className="mb-3" style={{paddingTop: "3%", paddingLeft: "3%", fontFamily: 'Montserrat', fontWeight: "600", fontSize: "18px", lineHeight: "22px", color: "var(--dark_grey)"}}>

            <label style={{display: "block", textAlign: "left"}} htmlFor="exampleFormControlInput1" className="form-label">Twoje ID</label>
            <input style={{width:"33%"}} type="text" readOnly className="form-control-plaintext" id="staticID" value="ID z bazy danych"></input>


            <label style={{display: "block", textAlign: "left", marginTop: "1%"}} htmlFor="exampleFormControlInput1" className="form-label">Login</label>
            <input style={{width: "33%"}} type="text" readOnly className="form-control-plaintext" id="staticLogin" value="Login z bazy danych"></input>

            <label style={{display: "block", textAlign: "left", width:"33%", marginTop: "1%"}} htmlFor="exampleFormControlInput1" className="form-label">E-mail</label>
            <input style={{width:"33%"}} type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"></input>

            <label style={{display: "block", textAlign: "left", width:"33%", marginTop: "1%"}} htmlFor="exampleFormControlInput1" className="form-label">Imię</label>
            <input style={{width:"33%"}} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Adam"></input>

            <label style={{display: "block", textAlign: "left", width:"33%", marginTop: "1%"}} htmlFor="exampleFormControlInput1" className="form-label">Nazwisko</label>
            <input style={{width:"33%"}} type="text" className="form-control" id="exampleFormControlInput1" placeholder="Kowalski"></input>

            <label style={{display: "block", textAlign: "left", width:"33%", marginTop: "1%"}} htmlFor="exampleFormControlInput1" className="form-label">Telefon</label>
            <input style={{width:"33%"}} type="tel" className="form-control" id="exampleFormControlInput1" placeholder="123456789"></input>

            <label style={{display: "block", textAlign: "left", width:"33%", marginTop: "1%"}} htmlFor="exampleFormControlInput1" className="form-label">Nowe hasło</label>
            <input style={{width:"33%"}} type="password" className="form-control" id="exampleFormControlInput1"></input>

            <label style={{display: "block", textAlign: "left", width:"33%", marginTop: "1%"}} htmlFor="exampleFormControlInput1" className="form-label">Powtórz nowe hasło</label>
            <input style={{width:"33%"}} type="password" className="form-control" id="exampleFormControlInput1"></input>

                <div style={{marginTop: "5%"}}>
                        <button style={{fontFamily: 'Montserrat', fontWeight: "600", fontSize: "18px", lineHeight: "25px", color: "white"}} type="button" className="btn btn-success">WPROWADŹ ZMIANY</button>
                </div>


        </div>

    );
}

export default InputBox;