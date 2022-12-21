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
        // approved to rankingowość
        approved: "FALSE",
        from: "24 listopada 2023",
        to: "27 listopada 2023",
        rang: "rang1",
        entryFee: "5",
        director: "name",
        phone: "123123",
        entriesTo: "string",
        additionalInformations: "info",
        categotry: "cat1",
        visibility: "FALSE",
        creator: ""
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

  ladders_content: {
    data: {
      ladders: {
        "id": "string",
        "inAtype": "R",
        "inA": "string",
        "inBtype": "R",
        "inB": "string",
        "round_number": "string",
        "winner": "string",
        "scores": "string",
        "tournamentid": "string",
        "inAname1": "string",
        "inAsurname1": "string",
        "inAname2": "string",
        "inAsurname2": "string",
        "inBname1": "string",
        "inBsurname1": "string",
        "inBname2": "string",
        "inBsurname2": "string"
      },
    },
  },

  pairs_content: {
    data: {
      pairs: {
        id:"344",
        userid:"806",
        tournamentid:"41008",
        paymenttype:"btc",
        paymentstatus:"DONE",
        paymenttype2:"",
        paymentstatus2:"",
        approval:"0",
        partner:"102",
        name1:"Adam",
        surname1:"Kowalski",
        name2:"Łukasik",
        surname2:"Paweł",
        rankingsum:"1272",
        partnerAcceptance: "0",
      },
    }
  },

  my_tournaments_content: {
    data: {
      id: "1",
      inviter: "1",
      tournamnet: "1"
    },
  },

  tournament_ready_content: {
    data: [
        {
          idA: "1",
          nameA: "Adam",
          surnameA: "Kowalski",
          idB: "1",
        }
    ]
  }

};
export default default_state