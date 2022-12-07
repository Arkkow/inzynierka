const default_state = {
  calendar_content: {
    data: [
      {
        id: "1",
        name: "Turniej bez bazy",
        typeOfLadder: "string",
        pointsForTournament: "string",
        places: "Poznań",
        roles: "string",
        approved: "string",
        from: "24 listopada 2023",
        to: "27 listopada 2023",
        rang: "rang1",
        entryFee: "5",
        director: "name",
        phone: "123123",
        entriesTo: "string",
        additionalInformations: "info",
        categotry: "cat1",
        visibility: "TRUE",
      },
    ],
  },
  user_content: {
    data: {
      role: "default",
      //"tu będzie puste na razie, to jest default, to się nadpisze"
    },
  },
  view_content: {
    data: {
      screen: "calendar",
      tournament_tab: "info",
    },
  },
  tournament_content: {
    data: {
      players: {
        id: "10",
      },
      pairs: {
        id: "simpleID",
        inAtype: "info",
        inA: "",
        inBtype: "",
      },
    },
  },
  my_tournaments_content: {
    data: {
      id: "1",
      inviter: "1",
      tournamnet: "1"
    },
  }
};
export default default_state;
