// General React imports
import * as React from 'react';

// Project specific files

// CSS files
import Button from 'react-bootstrap/Button';
import {Col} from "react-bootstrap";
import {getToken} from "../../../api/api";

export const MyAllFilter = (props) => {

    let isViewMyTournaments = window.location.href.split("/")[3] === "myTournaments"

    return (
        <>
            {getToken() !== null ? (
                <Col
                    sm={6}
                    style={{
                        display: "flex",
                        justifyContent: "flex-start",
                        alignItems: "center",
                        marginTop: "2%"
                    }}
                >
                        <Button
                            className="btn btn-primary"
                            href="calendar"
                            style={{
                                maxHeight: "40px",
                                marginRight: "25px",
                                borderColor: "var(--medium_grey)",
                                backgroundColor: "white",
                                color: isViewMyTournaments?"var(--dark_grey)":"var(--black)",
                            }}
                        >
                            <my_h4>WSZYSTKIE</my_h4>
                        </Button>
                        <Button
                            className="btn btn-primary"
                            style={{
                                maxHeight: "40px",
                                borderColor: "var(--medium_grey)",
                                backgroundColor: "white",
                                color: isViewMyTournaments?"var(--black)":"var(--dark_grey)",
                            }}
                            href="myTournaments"
                        >
                            <my_h4>MOJE</my_h4>
                        </Button>

                </Col>
            ):null
            }
        </>

    );
};

export default MyAllFilter;