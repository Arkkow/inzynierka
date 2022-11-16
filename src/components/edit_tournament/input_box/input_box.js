import React from "react";
import "../input_box/input_box.css";
import PFP_LOGO from '../../../assets/PFP_LOGO.png';

function InputBox() {
    return (
        <div className="mb-3" style={{paddingTop: "3%", paddingLeft: "3%", fontFamily: 'Montserrat', fontWeight: "600", fontSize: "18px", lineHeight: "22px", color: "var(--dark_grey)"}}>

            <label style={{display: "block", textAlign: "left", width:"33%"}} htmlFor="exampleFormControlInput1" className="form-label">Nazwa turnieju</label>
            <input style={{width:"33%"}} type="text" className="form-control" id="exampleFormControlInput1" defaultValue="Turniej majowy 22"></input>

            <label style={{display: "block", textAlign: "left", marginTop: "1%"}} htmlFor="exampleFormControlInput1" className="form-label">Data rozpoczęcia turnieju</label>
            <input style={{width:"33%"}} type="date" className="form-control" id="exampleFormControlInput1" defaultValue="2022-05-28"></input>
            <label style={{display: "block", textAlign: "left", marginTop: "1%"}} htmlFor="exampleFormControlInput1" className="form-label">Data zakończenia turnieju</label>
            <input style={{width:"33%"}} type="date" className="form-control" id="exampleFormControlInput1" defaultValue="2022-05-29"></input>

            <label style={{display: "block", textAlign: "left", marginTop: "1%"}} htmlFor="exampleFormControlInput1" className="form-label">Miejsce</label>
            <input style={{width:"33%"}} type="text" className="form-control" id="exampleFormControlInput1" defaultValue="Propadel, Warszawa"></input>

            <label style={{display: "block", textAlign: "left", marginTop: "1%"}} htmlFor="exampleFormControlInput1" className="form-label">Kategorie</label>
            <input style={{width:"10%", textAlign: "center"}} className="form-control" type="text" value="OPEN" aria-label="Disabled input example" disabled readOnly></input>

            <div className="form-group">
                <label style={{display: "block", textAlign: "left", marginTop: "1%"}} htmlFor="exampleFormControlInput1" className="form-label">Ranga</label>
                <select style={{width:"33%"}} className="form-select" id="sel1">
                    <option selected>CHALLENGER</option>
                    <option value="1">MASTER</option>
                </select>
            </div>

            <div className="form-group">
                <label style={{display: "block", textAlign: "left", marginTop: "1%"}} htmlFor="exampleFormControlInput1" className="form-label">System turniejowy</label>
                <select style={{width:"33%"}} className="form-select" id="sel1">
                    <option selected>DRABINKA KLASYCZNA</option>
                    <option value="1">DRABINKA O MIEJSCA</option>
                    <option value="2">GRUPY + DRABINKA</option>
                </select>
            </div>

            <label style={{display: "block", textAlign: "left", marginTop: "1%"}} htmlFor="exampleFormControlInput1" className="form-label">Wpisowe</label>
            <input style={{width:"33%"}} type="number" className="form-control" id="exampleFormControlInput1" defaultValue="80"></input>

            <label style={{display: "block", textAlign: "left", marginTop: "1%"}} htmlFor="exampleFormControlInput1" className="form-label">Dyrektor turnieju</label>
            <input style={{width:"33%"}} type="text" className="form-control" id="exampleFormControlInput1" defaultValue="Adam Kowalski"></input>

            <label style={{display: "block", textAlign: "left", marginTop: "1%"}} htmlFor="exampleFormControlInput1" className="form-label">Telefon</label>
            <input style={{width:"33%"}} type="tel" className="form-control" id="exampleFormControlInput1" defaultValue="605432123"></input>

            <label style={{display: "block", textAlign: "left", marginTop: "1%"}} htmlFor="exampleFormControlInput1" className="form-label">Zapisy do</label>
            <input style={{width:"33%"}} type="date" className="form-control" id="exampleFormControlInput1" defaultValue="2022-05-20"></input>

            <label style={{display: "block", textAlign: "left", marginTop: "1%"}} htmlFor="exampleFormControlTextarea1" className="form-label">Dodatkowe informacje</label>
            <textarea style={{width:"66%", height:"25vh", resize: "none"}} className="form-control" id="exampleFormControlTextarea1" rows="3" defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam tortor lectus, pretium sed nibh sed, interdum euismod orci. Maecenas feugiat, nisi a viverra volutpat, nulla enim cursus enim, nec mollis augue dui eget magna. Mauris non rhoncus sem. Proin rhoncus lobortis neque, non fringilla magna gravida eget. Integer vehicula suscipit arcu nec tincidunt. Integer malesuada lorem sit amet massa ullamcorper, et faucibus est venenatis. Sed maximus pellentesque mauris, eget malesuada risus eleifend vitae. Duis sollicitudin sit amet metus suscipit lobortis. Integer massa erat, ultrices non augue eu, suscipit ultricies nisl. Donec ultricies augue eu enim laoreet, in tristique nulla pharetra. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Donec nec rutrum mauris. Aliquam congue ligula eu dictum lobortis. Aenean suscipit pulvinar diam at ultrices. In vestibulum sagittis libero, id ultrices ante placerat sed. Ut porttitor commodo tincidunt. Aliquam eu neque eget nulla tempor feugiat at vitae velit. Donec eleifend venenatis eleifend. Cras mi ex, scelerisque cursus dignissim ac, commodo eu elit. In hac habitasse platea dictumst. Vestibulum sed urna id magna venenatis ornare ut in erat. Nulla nulla justo, porttitor ut tempus egestas, vestibulum eget diam. In non orci enim."></textarea>

            <label style={{display: "block", textAlign: "left", marginTop: "1%"}} htmlFor="exampleFormControlTextarea1" className="form-label">Widoczność turnieju</label>
            <div style={{display: "block", textAlign: "left"}} className="form-check form-switch">
                <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" defaultChecked={true}></input>
            </div>

            <label style={{display: "block", textAlign: "left", marginTop: "1%"}} htmlFor="exampleFormControlTextarea1" className="form-label">Logo turnieju</label>
            <input style={{width:"33%"}} className="form-control" type="file" id="formFile"></input>

            <div style={{borderStyle: "solid", marginTop:"1%", width:"110px"}}>
                <img src={PFP_LOGO} style={{width:"100px", height:"100px"}}/>
            </div>


            <div style={{marginTop: "3%"}}>
            <button style={{marginRight: "2%", fontFamily: 'Montserrat', fontWeight: "600", fontSize: "18px", lineHeight: "25px", color: "white"}} type="button" className="btn btn-secondary">ANULUJ</button>
            <button style={{fontFamily: 'Montserrat', fontWeight: "600", fontSize: "18px", lineHeight: "25px", color: "white"}} type="button" className="btn btn-success">EDYTUJ TURNIEJ</button>
            </div>

        </div>

    );
}

export default InputBox;