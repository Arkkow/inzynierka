// General react imports
import { useEffect } from "react";
import { connect } from "react-redux";


// Project specific files
import CalendarCard from "./calendar_card/calendar_card";
import {getPendingApprovals} from "../api/api";
import {getAuthedTournaments, getTournaments} from "../api/tournament/tournament_CRUD_api";
import {getUser} from "../api/user_interaction/user_api";
import { Col, Row } from "react-bootstrap";
import Header from "./calendarNavbar/calNav";


export const Calendar_controller = (props) => {
  useEffect(() => {
    props.handleDownloadUser();
    props.getPendingApprovals();

    if (props.user.role !== "default") {
        console.log("authed")
        props.handleDownloadAuthedCalendar();
    }
    else {
        console.log("unauthed")
        props.handleDownloadCalendar();
    }

  }, []);

  useEffect(() => {

  })

  return (
    <Row className="justify-content-md-center">
      <Col lg={6}>
        {props.calendar_list.length === 0 ? (
          <h5>no results available</h5>
        ) : (
          props.calendar_list.map((card) => (
            <CalendarCard key={card.id} {...card} user={props.user} view={props.view} my_tournaments={props.my_tournament_list} />
          ))
        )}
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
    // my_tournament_list: state.my_tournaments_content.data,
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
        getTournaments()
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

    handleDownloadAuthedCalendar: () => {
      //    API z kalendarza
      getAuthedTournaments()
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

    getPendingApprovals: () => {
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
)(Calendar_controller);
