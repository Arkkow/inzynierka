// General react imports
import {combineReducers} from "redux";

// Project specific files
import {
    calendar_content,
    ladders_content,
    user_content,
    view_content,
    pairs_content,
} from "./states/states";

// CSS files


//W przypadku wielu stanów dodaje kolejną warstwę struktury - head reducer, który zarządza reducerami
export default combineReducers({calendar_content, user_content, view_content, ladders_content, pairs_content});