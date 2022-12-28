import {Col} from "react-bootstrap";
import React from "react";

export const WinnerInput = () => {

    return (
        <>
            {/** KOLUMNA 2 **/}
            <Col>
                <paragraph_sb style={{display: "flex",
                    justifyContent: "center",
                    margin: "auto",
                    alignItems: "center",
                    paddingTop:"4px",
                    color: "var(--black)"}}>
                    ZWYCIĘZCA
                </paragraph_sb>
                <div>
                    <div className="form-check"
                         style={{display: "flex",
                             justifyContent: "center",
                             margin: "auto",
                             alignItems: "center",
                             backgroundColor:"white",
                             borderRadius:"10px",
                             marginTop:"4px",
                             height:"48px",
                             borderStyle:"solid",
                             borderColor:"#CED4DA",
                             borderWidth:"thin"
                         }}>
                        <input className="form-check-input" type="radio" name="flexRadioDefault"
                               id="flexRadioDefault1"></input>
                    </div>
                    <div className="form-check"
                         style={{display: "flex",
                             justifyContent: "center",
                             margin: "auto",
                             alignItems: "center", backgroundColor:"white", height:"48px", borderRadius:"10px", marginTop:"20px",
                             borderStyle:"solid",
                             borderColor:"#CED4DA",
                             borderWidth:"thin"}}>
                        <input className="form-check-input" type="radio" name="flexRadioDefault"
                               id="flexRadioDefault2" checked></input>
                    </div>
                </div>
            </Col>
        </>
    )
}
export default WinnerInput