// General react imports
import {combineReducers} from "redux";

const default_state = {

};

function common_content(state = default_state, action) {
    return state;
}

export default combineReducers({common_content})