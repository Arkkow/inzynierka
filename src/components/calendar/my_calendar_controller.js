// General react imports
import {useEffect} from "react";
import { connect } from "react-redux";


// Project specific files
import {getMyTournaments, getPendingApprovals} from "../../api/api";
import {getUser} from "../../api/user_interaction/user_api";
import { Col, Row } from "react-bootstrap";
import CalendarCard from "./calendar_card/calendar_card";
import * as React from "react";


export const My_calendar_controller = (props) => {
    useEffect(() => {
        props.handleDownloadUser();
        props.getAllPendingApprovals();

        if (localStorage.getItem("token") === null) {
            console.log("unauthed")
            window.location.href="calendar"
        }
        else {
            console.log("authed")
            props.handleDownloadMyTournaments()
        }

    }, []);

    return (
        <Row className="justify-content-md-center">
            <Col lg={6}>
                {props.my_tournament_list.length === 0 ?
                    <my_h4 style={{backgroundColor:"white", display:"flex", alignItems:"center", justifyContent:"center", borderRadius:"10px", height:"50px", minWidth:"560px"}}>
                        Brak wyników
                    </my_h4> :
                    props.my_tournament_list.map(card =>
                        <CalendarCard key={card.id} {...card} user={props.user} view={props.view} my_tournament_list={props.my_tournament_list} />
                    )
                }
            </Col>
        </Row>
    );
};

// Przypisanie do Calendar_controller.props stanów
const mapStateToProps = (state) => {
    return {
        calendar_list: state.calendar_content.data,
        user: state.user_content.data,
        view: state.view_content.data,
        my_tournament_list: state.my_tournaments_content.data,
    };
};

//Wywołanie zmiany stanu (obsługa w store)
// Przekazanie data z API do stanu Calendar_controller
const mapDispatchToProps = (dispatch) => {
    // let token =
    // let token = JSON.parse(localStorage.getItem("token")).token
    return {
        handleDownloadCalendar: () => {
            //    API z kalendarza
            getMyTournaments()
                .then((res) => {
                    return dispatch({
                        type: "DOWNLOAD_CALENDAR",
                        payload: { data: res },
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        handleDownloadMyTournaments: () => {
            //    API z kalendarza
            getMyTournaments()
                .then((res) => {
                    return dispatch({
                        type: "DOWNLOAD_MY_TOURNAMENTS",
                        payload: { data: res },
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        },


        handleDownloadUser: () => {
            //    API z kalendarza
            getUser()
                .then((res) => {
                    console.log(res);
                    return dispatch({ type: "DOWNLOAD_USER", payload: { data: res } });
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        getAllPendingApprovals: () => {
            //    API z kalendarza
            getPendingApprovals()
                .then((res) => {
                    console.log(res);
                    return dispatch({ type: "DOWNLOAD_MY_TOURNAMENTS", payload: { data: res } });
                })
                .catch((err) => {
                    console.log(err);
                });
        },

        handleGOTO: (props) => {
            return dispatch({ type: "ROUTE_STATE", payload: { data: props } });
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(My_calendar_controller);
