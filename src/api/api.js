export function getToken(){
	if(localStorage.getItem("token") ===null){
		return null;
	}
return JSON.parse(localStorage.getItem("token")).token;
}
export function makeReq(endpoint, method,body){
	return new Promise(function(resolve) {
	   var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState === 4) {
		if(this.status === 200){
		try{
        resolve(JSON.parse(xhttp.responseText));
		}catch(e){
			        resolve(xhttp.responseText);
		}
    }else{
		Promise.reject("error");
	}
	}
};
xhttp.open(method, "https://dragonmaster.pl/inz/"+endpoint);
xhttp.send(body); 

  });
}
export function makeAuthedReq(endpoint, method,body){
		return new Promise(function(resolve) {
	   var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState === 4) {
		if(this.status === 200){
		try{
        resolve(JSON.parse(xhttp.responseText));
		}catch(e){
			        resolve(xhttp.responseText);
		}    }else{
		Promise.reject("error");
	}
	}
};
var token =getToken();
if(token ===null){
	resolve([]);
	return;
}
xhttp.open(method, "https://dragonmaster.pl/inz/"+endpoint);
xhttp.setRequestHeader("Authorization","Bearer "+token); 
xhttp.send(body); 

  });
}

/*
OUTPUT
"ok"
*/
export function getleaderboard() {
  return makeReq("leaderboard","GET",null);
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
  return makeAuthedReq("pendingApprovals","GET",null);
}



/*
ID
id of tournament
OUTPUT
{
    "id": 41042,
    "name": "asdczxc",
    "typeOfLadder": "DRABINKA KLASYCZNA",
    "pointsForTournament": 4,
    "places": 2,
    "creator": 797,
    "approved": 0,
    "state": 0,
    "currentRound": 0,
    "from": "2022-11-23",
    "to": "2022-11-30",
    "place": "xcc",
    "categotry": "OPEN",
    "rang": "CHALLENGER",
    "entryFee": 1229,
    "director": "asdczx",
    "phone": "12345678",
    "entriesTo": "2022-11-27",
    "additionalInformations": "asdcxz",
    "visibility": "TRUE"
}
*/
export function getTournamentById(id) {
	if (getToken() !== null) {
		return makeAuthedReq("tournament?id=" + id, "GET", null);
	}
	else {return makeReq("tournament?id=" + id, "GET", null);}
}



export function getMyTournaments() {
	return makeAuthedReq("/user/myTournaments","GET",null);
}