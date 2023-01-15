// General React imports
import * as React from 'react';
import {Col, Form, Row} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import {getToken} from "../../../api/api";

// Project specific files

// CSS files

function saveData() {
    if (
        document.getElementById("dateFrom").value !== "" ||
        document.getElementById("dateTo").value !== ""
    ) {
        if (document.getElementById("dateFrom").value !== "") {
            localStorage.setItem(
                "dateFrom",
                document.getElementById("dateFrom").value
            );
        }
        if (document.getElementById("dateTo").value !== "") {
            localStorage.setItem("dateTo", document.getElementById("dateTo").value);
        }
        window.location.reload()
    }
    else {
        alert("Nie podano dat do filtracji");
    }
}

function deleteFilterData() {
    localStorage.removeItem("dateFrom");
    localStorage.removeItem("dateTo");
    window.location.reload();
}

export const DateFilter = (props) => {

    return (
        <Row style={{ marginTop: "1%", display:"grid", gridAutoFlow:"column" }}>
                <div>
                    <my_h4 style={{ paddingLeft: "10px" }}>Data rozpoczęcia od</my_h4>
                    <Form.Control
                        style={{
                            marginTop: "8px",
                            height: "80%",
                            borderRadius: "100px",
                            maxHeight:"52px"
                        }}
                        type="date"
                        id="dateFrom"
                        defaultValue={localStorage.getItem("dateFrom")}
                    />
                </div>
                <div>
                    <my_h4 style={{ paddingLeft: "10px" }}>Data rozpoczęcia do</my_h4>
                    <Form.Control
                        style={{
                            marginTop: "8px",
                            height: "80%",
                            borderRadius: "100px",
                            maxHeight:"52px"
                        }}
                        type="date"
                        id="dateTo"
                        defaultValue={localStorage.getItem("dateTo")}
                    />
                </div>
                <div style={{display:"flex", alignItems:"end", marginTop:"35px"}}>
                    <Button
                        style={{
                            fontFamily: "Montserrat",
                            fontWeight: "600",
                            fontSize: "18px",
                            color: "white",
                            borderRadius: "15px",
                            paddingBottom: "3%",
                            paddingTop: "3%",
                            paddingRight: "20px",
                            paddingLeft: "20px",
                            display: "flex",
                            maxWidth:"120px",
                            maxHeight:"40px",


                        }}
                        variant="success"
                        onClick={saveData}
                    >
                        FILTRUJ
                    </Button>
                </div>


                {localStorage.getItem("dateFrom") !== null ||
                localStorage.getItem("dateTo") ? (
                    <div style={{display:"flex", alignItems:"end"}}>
                        <Button
                            style={{
                                fontFamily: "Montserrat",
                                fontWeight: "600",
                                fontSize: "18px",
                                color: "white",
                                borderRadius: "15px",
                                paddingBottom: "3%",
                                paddingTop: "3%",
                                paddingRight: "20px",
                                paddingLeft: "20px",
                                marginRight: "20px",
                                display: "flex",
                                maxWidth:"140px",
                                maxHeight:"40px"

                            }}
                            variant="success"
                            onClick={deleteFilterData}
                        >
                            WYCZYŚĆ
                        </Button>
                    </div>

                ) : null}

        </Row>
    )
};
export default DateFilter