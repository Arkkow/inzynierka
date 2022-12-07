// General react imports

// Project specific files
import CalendarCard from "./calendar_card";
import { connect } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { useEffect } from "react";
// import { getPendingApprovals } from "../api/api";

// CSS files

export const Calendar_controller = (props) => {
  useEffect(() => {
    props.handleDownloadCalendar();
    props.handleDownloadUser();
    props.getPendingApprovals();
  }, []);

  return (
    <Row className="justify-content-md-center">
      <Col sm={6}>
        {props.calendar_list.length === 0 ? (
          <h5>no results available</h5>
        ) : (
          props.calendar_list.map((card) => (
            <CalendarCard {...card} user={props.user} view={props.view} my_tournaments={props.my_tournament_list}/>
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
      fetch("https://dragonmaster.pl/inz/" + "tournaments", {
        headers: {
          Authorization:
            "Bearer " +
            "kdmVPQQI53atDhT3EAt8OFsxpRBL3RUIA6AL10KsMAs11itgw1WxODvamH4OO3E1b6WuzXsamXvbJLZ7",
        },
        method: "GET",
      })
        .then((res) => res.json())
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
      fetch("https://dragonmaster.pl/inz/" + "user", {
        headers: {
          Authorization:
            "Bearer " +
            "kdmVPQQI53atDhT3EAt8OFsxpRBL3RUIA6AL10KsMAs11itgw1WxODvamH4OO3E1b6WuzXsamXvbJLZ7",
        },
        method: "GET",
      })
        .then((res) => res.json())
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
      fetch("https://dragonmaster.pl/inz/" + "pendingApprovals", {
        headers: {
          Authorization:
              "Bearer " +
              "kdmVPQQI53atDhT3EAt8OFsxpRBL3RUIA6AL10KsMAs11itgw1WxODvamH4OO3E1b6WuzXsamXvbJLZ7"
        },
        method: "GET",
      })
          .then((res) => res.json())
          .then((res) => {
            console.log(res);
            return dispatch({ type: "DOWNLOAD_MY_TOURNAMENTS", payload: { data: res } });
          })
          .catch((err) => {
            console.log(err);
          });
    },

    // getPendingApprovals: () => {
    //   //    API z kalendarza
    //   fetch(getPendingApprovals())
    //       .then((res) => res.json())
    //       .then((res) => {
    //         console.log(res);
    //         return dispatch({ type: "DOWNLOAD_MY_TOURNAMENTS", payload: { data: res } });
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    // },

    handleGOTO: (props) => {
      return dispatch({ type: "ROUTE_STATE", payload: { data: props } });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Calendar_controller);
