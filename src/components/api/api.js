function getToken() {
  return "kdmVPQQI53atDhT3EAt8OFsxpRBL3RUIA6AL10KsMAs11itgw1WxODvamH4OO3E1b6WuzXsamXvbJLZ7";
}
function makeReq(endpoint, method, body) {
  return new Promise(function (resolve) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          try {
            resolve(JSON.parse(xhttp.responseText));
          } catch (e) {
            resolve(xhttp.responseText);
          }
        } else {
          Promise.reject("error");
        }
      }
    };
    xhttp.open(method, "https://dragonmaster.pl/inz/" + endpoint);
    xhttp.send(body);
  });
}
function makeAuthedReq(endpoint, method, body) {
  return new Promise(function (resolve) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4) {
        if (this.status == 200) {
          try {
            resolve(JSON.parse(xhttp.responseText));
          } catch (e) {
            resolve(xhttp.responseText);
          }
        } else {
          Promise.reject("error");
        }
      }
    };
    xhttp.open(method, "https://dragonmaster.pl/inz/" + endpoint);
    xhttp.setRequestHeader("Authorization", "Bearer " + getToken());
    xhttp.send(body);
  });
}
/*
  OUTPUT
  [
    {
      "id": "string",
      "name": "string",
      "typeOfLadder": "string",
      "pointsForTournament": "string",
      "places": "string",
      "approved": "string",
      "from": "string",
      "to": "string",
      "rang": "rang1",
      "entryFee": "5",
      "director": "name",
      "phone": "123123",
      "entriesTo": "string",
      "additionalInformations": "info",
      "categotry": "cat1",
      "visibility": "TRUE"
    }
  ]
  */
export function getTournaments() {
  return makeReq("tournaments", "GET", null);
}
/*
  INPUT
  {
    "id": "string", //required
    "name": "string",
    "typeOfLadder": "string",
    "pointsForTournament": "string",
    "places": "string",
    "roles": "string",
    "from": "string",
    "to": "string",
    "rang": "rang1",
    "entryFee": "5",
    "director": "name",
    "phone": "123123",
    "entriesTo": "string",
    "additionalInformations": "info",
    "categotry": "cat1",
    "visibility": "TRUE"
  }
  
  OUTPUT
  {}
  */
export function postTournaments(input) {
  return makeAuthedReq("tournament", "POST", JSON.stringify(input));
}
/*
  INPUT
  {
    "name": "string",
    "typeOfLadder": "string",
    "pointsForTournament": "1",
    "places": "1",
    "ranked": "0",
    "place": "place",
    "from": "string",
    "to": "string",
    "rang": "rang1",
    "entryFee": "5",
    "director": "name",
    "phone": "123123",
    "entriesTo": "string",
    "additionalInformations": "info",
    "categotry": "cat1",
    "visibility": "TRUE"
  }
  
  OUTPUT
  {"id":"1234"}
  */
export function putTournaments(input) {
  return makeAuthedReq("tournament", "PUT", JSON.stringify(input));
}
/*
  ID
  id of tournamnet
  
  
  OUTPUT
  "ok"
  */
export function deleteTournaments(id) {
  return makeAuthedReq(
    "tournament",
    "DELETE",
    JSON.stringify({
      id: id.toString(),
    })
  );
}
/*
  ID
  id of tournamnet
  
  OUTPUT
  "ok"
  */
export function closeRegistrations(id) {
  return makeAuthedReq(
    "tournament/closeRegistrations",
    "POST",
    JSON.stringify({
      id: id.toString(),
    })
  );
}
/*
  ID
  id of tournamnet
  
  OUTPUT
  "ok"
  */
export function startTournament(id) {
  return makeAuthedReq(
    "tournament/startTournament",
    "POST",
    JSON.stringify({
      id: id.toString(),
    })
  );
}
/*
  INPUT
  {
    "id": "123",
      "results": [ // when ranked
      {
        "rid": 0,
        "points": 0
      }
    ]
  }
  
  OUTPUT
  "ok"
  */
export function endTournament(input) {
  return makeAuthedReq(
    "tournament/endTournament",
    "POST",
    JSON.stringify(input)
  );
}
/*
  ID
  id of tournamnet
  
  OUTPUT
  "ok"
  */
export function cancelTournament(id) {
  return makeAuthedReq(
    "tournament/cancelTournament",
    "POST",
    JSON.stringify({
      id: id.toString(),
    })
  );
}

/*
  ID
  tournament id
  IMAGE
  bytes of image
  OUTPUT
  "ok"
  */
export function postImage(id, image) {
  return makeAuthedReq("tournament/image?id=" + id, "POST", image);
}
/*
  ID
  tournament id
  
  OUTPUT
  {
    "name": "string",
    "surname": "string"
  }
  */
export function getUserById(id) {
  return makeReq("user/byId?id=" + id, "POST", null);
}
/*
  OUTPUT
  {
    "id": "string",
    "name": "string",
    "surname": "string",
    "role": "1",
    "login": "string",
    "phone": "string",
    "mail": "string"
  }
  */
export function getUser() {
  return makeAuthedReq("user", "GET", null);
}

/*
  OUTPUT
  {}
  */
export function getUserSettings() {
  return makeAuthedReq("user/settings", "GET", null);
}

/*
  INPUT
  {}
  */
export function postUserSettings(input) {
  return makeAuthedReq("user/settings", "POST", JSON.stringify(input));
}

/*
  INPUT
  {
    "name": "string",
    "surname": "string",
    "password": "string",
    "phone": "string",
    "mail": "string"
  }
  
  OUTPUT
  "ok"
  */
export function postUser(input) {
  return makeAuthedReq("user", "POST", JSON.stringify(input));
}

/*
  OUTPUT
  "ok"
  */
export function getleaderboard() {
  return makeReq("leaderboard", "GET", null);
}

/*
  OUTPUT
  [
    {
      "id": "string",
      "ladderid": "string",
      "tournamnet": "string"
    }
  ]
  */
export function getPendingApprovals() {
  return makeAuthedReq("pendingApprovals", "GET", null);
}

/*
  ID
  od of user
  */
export function postAcceptInvite(id) {
  return makeAuthedReq(
    "acceptInvite",
    "POST",
    JSON.stringify({
      id: id.toString(),
    })
  );
}

/*
  ID
  od of user
  */
export function postRejectInvite(id) {
  return makeAuthedReq(
    "rejectInvite",
    "POST",
    JSON.stringify({
      id: id.toString(),
    })
  );
}

/*
  OUTPUT
  [
    {
      "id": "string",
      "ladderid": "string",
      "winner": "A",
      "score": "string",
      "proposer": 0,
      "approver": 0
    }
  ]
  */
export function getPendingProposals() {
  return makeAuthedReq("proposals/pending", "GET", null);
}

/*
  INPUT
  {
    "ladderid": "string",
    "winner": "A",
    "score": "string"
  }
  OUTPUT
  "ok"
  */
export function putProposal(input) {
  return makeAuthedReq("proposal", "PUT", JSON.stringify(input));
}

/*
  ID
  id of proposal
  OUTPUT
  "ok"
  */
export function postAcceptProposal(id) {
  return makeAuthedReq(
    "proposal/approve",
    "POST",
    JSON.stringify({
      id: id.toString(),
    })
  );
}

/*
  INPUT
  {
    "tournamentid": "string",
    "inAtype": "R",
    "inA": "string",
    "inBtype": "R",
    "inB": "string",
    "round": "string"
  }
  OUTPUT
  "ok"
  */
export function putLadder(input) {
  return makeAuthedReq("ladder", "PUT", JSON.stringify(input));
}

/*
  INPUT
  {
    "id": "string",
    "inAtype": "R",
    "inA": "string",
    "inBtype": "R",
    "inB": "string",
    "round": "string",
    "winner": "string",
    "scores": "string"
  }
  OUTPUT
  "ok"
  */
export function postLadder(input) {
  return makeAuthedReq("ladder", "POST", JSON.stringify(input));
}

/*
  ID
  id of ladder
  OUTPUT
  "ok"
  */
export function deleteLadder(id) {
  return makeAuthedReq(
    "ladder",
    "DELETE",
    JSON.stringify({
      id: id.toString(),
    })
  );
}

/*
  tournamentid
  id of tournamnt
  OUTPUT
  [
    {
      "id": "string",
      "inAtype": "R",
      "inA": "string",
      "inBtype": "R",
      "inB": "string",
      "round": "string",
      "winner": "string",
      "scores": "string",
      "tournamentid": "string"
    }
  ]
  */
export function getladders(tournamentid) {
  return makeAuthedReq("ladders/raw?tournamentid=" + tournamentid, "GET", null);
}
/*
  tournamentid
  id of ladder
  OUTPUT
  {
    "id": "string",
    "inAtype": "R",
    "inA": "string",
    "inBtype": "R",
    "inB": "string",
    "round": "string",
    "winner": "string",
    "scores": "string",
    "tournamentid": "string"
  }
  */
export function getLaddersSolved(id) {
  return makeAuthedReq("ladders/raw?id =" + id, "GET", null);
}

/*
  ID
  id of tournament
  OUTPUT
  [
    {
      "id": "string",
      "userid": "string",
      "tournamentid": "string",
      "paymenttype": "string",
      "paymentstatus": "string",
      "approvals": "string"
    }
  ]
  */
export function getRegistrations(id) {
  return makeAuthedReq("registrations?id=" + id, "GET", null);
}

/*
  ID
  id of regiostartion
  OUTPUT
  {
    "status": "string"
  }
  */
export function getRegistrationPaymentStatus(id) {
  return makeAuthedReq("registration/paymentstatus?id=" + id, "GET", null);
}

/*
  INPUT
  {
    "tournament": "1",
    "partner": "1"
  }
  OUTPUT
  {
    "id": "string"
  }
  */
export function putRegistration(input) {
  return makeAuthedReq("registration", "PUT", JSON.stringify(input));
}

/*
  INPUT
  {
    "id": "string",
    "paymentmethod": "cash"
  }
  OUTPUT
  {
    "url": "string" //optional
  }
  */
export function postPayForRegistration(input) {
  return makeAuthedReq("payForRegistration", "POST", JSON.stringify(input));
}

/*
  INPUT
  {
    "id": "string",
    "ownerOrInvited": "owner"
  }
  */
export function postPayedUsingCash(input) {
  return makeAuthedReq(
    "registration/payedUsingCash",
    "POST",
    JSON.stringify(input)
  );
}
/*
  id
  id of registartion
  */
export function postRegistrationApprove(id) {
  return makeAuthedReq(
    "registration/approve",
    "POST",
    JSON.stringify({
      id: id.toString(),
    })
  );
}
