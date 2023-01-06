
const default_state = {
  calendar_content: {
    data: [
      {
        id: "1",
        name: "ERROR 404 - SERWER PADŁ",
        typeOfLadder: "string",
        pointsForTournament: "string",
        places: "Poznań",
        roles: "string",
        // approved to rankingowość
        approved: "FALSE",
        from: "pewnego czasu serwer nie działa",
        to: "tego czasu musisz poczekać",
        rang: "rang1",
        entryFee: "5",
        director: "name",
        phone: "123123",
        entriesTo: "string",
        additionalInformations: "info",
        categotry: ":(",
        visibility: "FALSE",
        creator: "",

      },
    ],
  },

  user_content: {
    data: {
      id: 819,
      name: "Name",
      surname: "Surname",
      role: "default",
      login: "login",
      phone: "phone",
      mail: "adres@email.com",
      ranking: 0
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
        0:{
          "id": "100",
          "inAtype": "R",
          "inA": "100",
          "inBtype": "R",
          "inB": "100",
          "round_number": "1",
          "winner": "A",
          "scores": "000000",
          "tournamentid": "1000",
          "inAname1": "NameA1",
          "inAsurname1": "SurnameA1",
          "inAname2": "NameA2",
          "inAsurname2": "SurnameA2",
          "inBname1": "NameB1",
          "inBsurname1": "SurnameB1",
          "inBname2": "NameB2",
          "inBsurname2": "SurnameB2",
      }
      },
    },
  },

  pairs_content: {
    data: {
      pairs: {
        DONE: {},
        ALL: {
          id: "0",
          userid: "100",
          tournamentid: "41000",
          paymenttype: "btc",
          paymentstatus: "DONE",
          paymenttype2: "cash",
          paymentstatus2: "PENDING",
          approval: "0",
          partner: "102",
          name1: "Name1",
          surname1: "Surname1",
          name2: "Name2",
          surname2: "Surname2",
          rankingsum: "1000",
          partnerAcceptance: "0",
        },
      },
    }
  },

  my_tournaments_content: {
    data: [

          ],
  },


};
export default default_state