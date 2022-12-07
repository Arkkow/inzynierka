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

    case "TOURNAMENT":
      return {
        ...state,
        data: { tournament_tab: action.payload.data },
      };
    default:
      return state;
  }
};

export const tournament_content = (
  state = default_state.tournament_content,
  action
) => {
  switch (action.type) {
    case "DOWNLOAD_TOURNAMENT":
      return {
        ...state,
        data: { pairs: action.payload.data },
      };

    case "DOWNLOAD_PLAYERS":
      return {
        ...state,
        data: { players: action.payload.data },
      };

    default:
      return state;
  }
};

export const my_tournaments_content = (
  state = default_state.my_tournaments_content,
  action
) => {
  switch (action.type) {
    case "DOWNLOAD_MY_TOURNAMENTS":
      return {
        ...state,
        data: action.payload.data,
      };
    default:
      return state;
  }
};
