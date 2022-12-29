import default_state from "./default_state";

export const calendar_content = (
  state = default_state.calendar_content,
  action
) => {
  switch (action.type) {
    case "DOWNLOAD_CALENDAR":
      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return state;
  }
};

export const user_content = (state = default_state.user_content, action) => {
  switch (action.type) {
    case "DOWNLOAD_USER":
      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return state;
  }
};

export const view_content = (state = default_state.view_content, action) => {
  switch (action.type) {
    case "ROUTE_STATE":

      return {
        ...state,
        data: { screen: action.payload.data },
      };

    case "TOURNAMENT_VIEW":
      return{
        ...state,
        data: { tournament_tab: action.payload.data },
      };
    default:
      return state;
  }
};

export const ladders_content = (state = default_state.ladders_content, action) => {
  switch(action.type){
    case "DOWNLOAD_LADDERS":
      return {
        ...state,
        // data: {ladders: action.payload.data}
        data: {
          ladders:
            {
              ALL: action.payload.data,
              1:action.payload.data.filter((e) => e.round_number.length === 1),
              2:action.payload.data.filter((e) => e.round_number.length === 2),
              3:action.payload.data.filter((e) => e.round_number.length === 3),
              4:action.payload.data.filter((e) => e.round_number.length === 4)
            }

        }

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
        data: {
          pairs:
              {
                DONE: action.payload.data.filter((e) => e.paymentstatus === "DONE" && e.paymentstatus2 === "DONE" ),
                ALL: action.payload.data
              }
        }
        // 4:action.payload.data.filter((e) => e.round_number.length === 4)

      };
    default:
      return state;
  }
};

export const my_tournaments_content = (state = default_state.my_tournaments_content, action) => {
  switch (action.type) {

    case "DOWNLOAD_MY_TOURNAMENTS":
      return {
        ...state,
        data: action.payload.data
      };
    default:
      return state;
  }
};
