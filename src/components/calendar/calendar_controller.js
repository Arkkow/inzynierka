// General react imports

// Project specific files
import CalendarCard from "./calendar_card";
import {connect} from "react-redux";
import {Col, Row} from "react-bootstrap";
import {useEffect} from "react";

// CSS files


export const Calendar_controller = (props) => {

    useEffect(() => {

            props.handleDownloadCalendar();
            props.handleDownloadUser();
        },
    []
    )


    return (
        <Row className="justify-content-md-center">
            <Col sm={6} >
                {props.calendar_list.length === 0 ?
                  <h5>no results available</h5> :
                  props.calendar_list.map((card)=>(
                    <CalendarCard {...card} user = {props.user} view = {props.view}/>
                    ))
                }
            </Col>
        </Row>
    )
}

// Przypisanie do Calendar_controller.props stanów
const mapStateToProps = (state) => {
    return {
        calendar_list: state.calendar_content.data,
        user: state.user_content.data,
        view: state.view_content.data
    }
}

//Wywołanie zmiany stanu (obsługa w store)
// Przekazanie data z API do stanu Calendar_controller
const mapDispatchToProps = (dispatch) => {
    return {
        handleDownloadCalendar: () => {
        //    API z kalendarza
            fetch('https://dragonmaster.pl/inz/' + "tournaments", {
                headers: {
                    Authorization: ("Bearer " + "kdmVPQQI53atDhT3EAt8OFsxpRBL3RUIA6AL10KsMAs11itgw1WxODvamH4OO3E1b6WuzXsamXvbJLZ7")
                },
                method: "GET",
            })
                .then((res) => res.json())
                .then( res => {
                  return dispatch({type: "DOWNLOAD_CALENDAR", payload: {data: res}});
                  }
                )
              .catch((err) => {console.log(err)});
        },
        handleDownloadUser: () => {
            //    API z kalendarza
            fetch('https://dragonmaster.pl/inz/' + "user", {
                headers: {
                    Authorization: ("Bearer " + "kdmVPQQI53atDhT3EAt8OFsxpRBL3RUIA6AL10KsMAs11itgw1WxODvamH4OO3E1b6WuzXsamXvbJLZ7")
                },
                method: "GET",
            })
              .then((res) => res.json())
              .then( res => {
                  console.log(res)
                    return dispatch({type: "DOWNLOAD_USER", payload: {data: res}});
                }
              )
              .catch((err) => {console.log(err)});
        },
        handleDownloadMyInvites: () => {
            //    API z kalendarza
            fetch('https://dragonmaster.pl/inz/' + "user", {
                headers: {
                    Authorization: ("Bearer " + "kdmVPQQI53atDhT3EAt8OFsxpRBL3RUIA6AL10KsMAs11itgw1WxODvamH4OO3E1b6WuzXsamXvbJLZ7")
                },
                method: "GET",
            })
                .then((res) => res.json())
                .then( res => {
                        console.log(res)
                        return dispatch({type: "DOWNLOAD_USER", payload: {data: res}});
                    }
                )
                .catch((err) => {console.log(err)});
        },
        handleGOTO: (props) => {

            return dispatch({type: "ROUTE_STATE", payload: {data: props}});
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Calendar_controller)