import default_state from "./default_state";

export const calendar_content = (state = default_state.calendar_content, action) => {
  switch(action.type){
    case "DOWNLOAD_CALENDAR":
      return {
        ...state,
        data: action.payload.data
      }
    default:
      return state;
  }
};

export const user_content = (state = default_state.user_content, action) => {
  switch(action.type){
    case "DOWNLOAD_USER":
      return {
        ...state,
        data: action.payload.data
      }
    default:
      return state;
  }
};

export const view_content = (state = default_state.view_content, action) => {
  switch(action.type){
    case "ROUTE_STATE":

      return {
        ...state,
        data: {screen: action.payload.data}
      };

    case "TOURNAMENT_VIEW":
      return{
        ...state,
        data: { tournament_tab: action.payload.data }
      }
    default:
      return state;
  }
};

export const ladders_content = (state = default_state.ladders_content, action) => {
  switch(action.type){
    case "DOWNLOAD_LADDERS":
      return {
        ...state,
        data: {ladders: action.payload.data}
      };

    default:
      return state;
  }
};

export const pairs_content = (state = default_state.pairs_content, action) => {
  switch(action.type){

    case "DOWNLOAD_PAIRS":
      return {
        ...state,
        data: {pairs: action.payload.data, ladders: state.ladders}
      };

    default:
      return state;
  }
};