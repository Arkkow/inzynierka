import React from "react";
import "../input_box/input_box.css";

function InputBox() {
    return (
        <div className="mb-3" style={{paddingTop: "3%", paddingLeft: "3%", fontFamily: 'Montserrat', fontWeight: "600", fontSize: "18px", lineHeight: "22px", color: "var(--dark_grey)"}}>

            <button style={{fontFamily: 'Montserrat', fontWeight: "600", fontSize: "18px", lineHeight: "25px", color: "white", float: "right", marginRight: "5%"}} type="button" className="btn btn-success">STWÓRZ SZABLON TURNIEJU</button>

            <label style={{display: "block", textAlign: "left", width:"33%"}} htmlFor="exampleFormControlInput1" className="form-label">Nazwa turnieju</label>
            <input style={{width:"33%"}} type="text" className="form-control" id="exampleFormControlInput1"></input>

            <label style={{display: "block", textAlign: "left", marginTop: "1%"}} htmlFor="exampleFormControlInput1" className="form-label">Data rozpoczęcia turnieju</label>
            <input style={{width:"33%"}} type="date" className="form-control" id="exampleFormControlInput1"></input>
            <label style={{display: "block", textAlign: "left", marginTop: "1%"}} htmlFor="exampleFormControlInput1" className="form-label">Data zakończenia turnieju</label>
            <input style={{width:"33%"}} type="date" className="form-control" id="exampleFormControlInput1"></input>

            <label style={{display: "block", textAlign: "left", marginTop: "1%"}} htmlFor="exampleFormControlInput1" className="form-label">Miejsce</label>
            <input style={{width:"33%"}} type="text" className="form-control" id="exampleFormControlInput1"></input>

            <label style={{display: "block", textAlign: "left", marginTop: "1%"}} htmlFor="exampleFormControlInput1" className="form-label">Kategorie</label>
            <input style={{width:"10%", textAlign: "center"}} className="form-control" type="text" value="OPEN" aria-label="Disabled input example" disabled readOnly></input>

            <div className="form-group">
                <label style={{display: "block", textAlign: "left", marginTop: "1%"}} htmlFor="exampleFormControlInput1" className="form-label">Ranga</label>
                <select style={{width:"33%"}} className="form-control" id="sel1">
                    <option selected>CHALLENGER</option>
                    <option value="1">MASTER</option>
                </select>
            </div>

            <div className="form-group">
                <label style={{display: "block", textAlign: "left", marginTop: "1%"}} htmlFor="exampleFormControlInput1" className="form-label">System turniejowy</label>
                <select style={{width:"33%"}} className="form-control" id="sel1">
                    <option selected>DRABINKA KLASYCZNA</option>
                    <option value="1">DRABINKA O MIEJSCA</option>
                    <option value="2">GRUPY + DRABINKA</option>
                </select>
            </div>

            <label style={{display: "block", textAlign: "left", marginTop: "1%"}} htmlFor="exampleFormControlInput1" className="form-label">Wpisowe</label>
            <input style={{width:"33%"}} type="number" className="form-control" id="exampleFormControlInput1"></input>

            <label style={{display: "block", textAlign: "left", marginTop: "1%"}} htmlFor="exampleFormControlInput1" className="form-label">Dyrektor turnieju</label>
            <input style={{width:"33%"}} type="text" className="form-control" id="exampleFormControlInput1"></input>

            <label style={{display: "block", textAlign: "left", marginTop: "1%"}} htmlFor="exampleFormControlInput1" className="form-label">Telefon</label>
            <input style={{width:"33%"}} type="tel" className="form-control" id="exampleFormControlInput1"></input>

            <label style={{display: "block", textAlign: "left", marginTop: "1%"}} htmlFor="exampleFormControlInput1" className="form-label">Zapisy do</label>
            <input style={{width:"33%"}} type="date" className="form-control" id="exampleFormControlInput1"></input>

            <label style={{display: "block", textAlign: "left", marginTop: "1%"}} htmlFor="exampleFormControlTextarea1" className="form-label">Dodatkowe informacje</label>
            <textarea style={{width:"66%", height:"25vh", resize: "none"}} className="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>

            <label style={{display: "block", textAlign: "left", marginTop: "1%"}} htmlFor="exampleFormControlTextarea1" className="form-label">Widoczność turnieju</label>
            <div style={{display: "block", textAlign: "left"}} className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"></input>
            </div>

            <label style={{display: "block", textAlign: "left", marginTop: "1%"}} htmlFor="exampleFormControlTextarea1" className="form-label">Rankingowość turnieju</label>
            <div style={{display: "block", textAlign: "left"}} className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"></input>
            </div>

            <label style={{display: "block", textAlign: "left", marginTop: "1%"}} htmlFor="exampleFormControlTextarea1" className="form-label">Logo turnieju</label>
            <input style={{width:"33%"}} className="form-control" type="file" id="formFile"></input>

            <div style={{marginTop: "3%"}}>
            <button style={{marginRight: "2%", fontFamily: 'Montserrat', fontWeight: "600", fontSize: "18px", lineHeight: "25px", color: "white"}} type="button" className="btn btn-secondary">ANULUJ</button>
            <button style={{fontFamily: 'Montserrat', fontWeight: "600", fontSize: "18px", lineHeight: "25px", color: "white"}} type="button" className="btn btn-success">STWÓRZ TURNIEJ</button>
            </div>

        </div>

    );
}

export default InputBox;