// General react imports

// Project specific files
import CalendarCard from "./calendar_card";
import {connect} from "react-redux";
import {Col, Row} from "react-bootstrap";
import {Button} from "react-bootstrap";

// CSS files


export const Calendar_controller = (props) => {
    return (
        <Row className="justify-content-md-center">
            <Col sm={6} >
            {/*<div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>*/}
                <Button onClick={() => {
                    props.handleDownloadCalendar();
                    props.handleDownloadUser();
                }
                }>ODŚWIEŻ</Button>


                {console.log(props.calendar_list)}


                {props.calendar_list.length === 0 ?
                  <h5>no results available</h5> :
                  props.calendar_list.map((card)=>(
                    <CalendarCard {...card}/>
                    ))
                }
            {/*</div>*/}
            </Col>
        </Row>
    )
}

// Przypisanie do Calendar_controller.props stanów
const mapStateToProps = (state) => {
    return {
        calendar_list: state.calendar_content.data,
        user: state.user_content.data
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
                // params: params //byId?id=10
            //    data: {} lub body
            })
              .then((res) => {
                  // console.log("dupa")
                    return dispatch({type: "DOWNLOAD_CALENDAR", payload: {data: res.json()}})
                }
              )
              .catch((err) => {console.log(err)});
        },
        handleDownloadUser: (params) => {
            //    API z kalendarza
            fetch('https://dragonmaster.pl/inz/' + "user", {
                headers: {
                    Authorization: ("Bearer " + "kdmVPQQI53atDhT3EAt8OFsxpRBL3RUIA6AL10KsMAs11itgw1WxODvamH4OO3E1b6WuzXsamXvbJLZ7")
                },
                method: "GET",
                params: params //byId?id=10
                //    data: {} lub body
            })
              .then((res) => {
                    return dispatch({type: "DOWNLOAD_USER", payload: {data: res.json()}})
                }
              )
              .catch((err) => {console.log(err)});
        },
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Calendar_controller)