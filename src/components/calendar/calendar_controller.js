// General react imports

// Project specific files
import CalendarCard from "./calendar_card";
import {connect} from "react-redux";

// CSS files


export const Calendar_controller = (props) => {
    return (
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            {/*<Button onClick={props.handleDownloadCalendar}>ODŚWIEŻ</Button>*/}
            {props.calendar_list.length === 0 ? <h5>no results available</h5> : props.calendar_list.map((card)=>(
                <CalendarCard {...card}/>
            ))}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        calendar_list: state.calendar_content.data,
    }
}

//Wywołanie zmiany stanu (obsługa w store)
const mapDispatchToProps = (dispatch) => {
    return {
        handleDownloadCalendar: () => {
        //    API z kalendarza
            return dispatch({type: "DOWNLOAD_CALENDAR", payload: {
                data: [
                        {
                            "id": "1",
                            "name": "Turniej Listopadowy",
                            "typeOfLadder": "string",
                            "pointsForTournament": "string",
                            "places": "Poznań",
                            "roles": "string",
                            "approved": "string",
                            "from": "2023-11-15",
                            "to": "2023-11-17",
                            "rang": "rang1",
                            "entryFee": "5",
                            "director": "name",
                            "phone": "123123",
                            "entriesTo": "string",
                            "additionalInformations": "info",
                            "categotry": "cat1",
                            "visibility": "TRUE"
                        }
                    ]}})
        },

        handleCheckRole: () => {
            fetch('https://dragonmaster.pl/inz/user', {
                headers: {
                    Authorization: ("Bearer " + localStorage.getItem("token"))
                }
            })

            .then((res) => {
                    return dispatch({type: "DOWNLOAD_CALENDAR", payload: {data: res.json()}})
                }
            )
                .catch((err) => {console.log(err)})
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Calendar_controller)