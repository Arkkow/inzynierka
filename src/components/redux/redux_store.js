// General react imports
import {createStore, compose} from "redux";
import storeReducer from "./store_reducer";


//TEGO SIĘ NIGDY NIE RUSZA
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose();

export const store = createStore(storeReducer, composeEnhancers());
