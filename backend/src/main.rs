use lettre::transport::smtp::authentication::Credentials;
use lettre::{Message, SmtpTransport, Transport};
use std::collections::HashMap;
use serde_derive::{Serialize, Deserialize};
use mysql::*;
use mysql::prelude::*;
use std::convert::Infallible;
use std::net::SocketAddr;
use hyper::{Body, Client, Method, Request, Response, Server, StatusCode};
use hyper::service::{make_service_fn, service_fn};
use bcrypt::{DEFAULT_COST, hash, verify};
use rand::{OsRng, Rng};
use serde_json::Map;
use std::time::Duration;
use lettre::message::{header, MultiPart, SinglePart};
use tokio::time::sleep;
#[derive(Serialize, Deserialize)]
struct SearchResult {
    name: String,
    surname: String,
}
fn print_type_of<T>(_: &T) {
    println!("{}", std::any::type_name::<T>())
}
#[derive(Serialize, Deserialize)]
struct Proposal {
    id: i32,
    ladderid: i32,
    winner: String,
    proposer: i32,
    approver: i32,
    score: String,
}

#[derive(Serialize, Deserialize)]
struct pendingApprovals {
    id: i32,
    inviter: i32,
    tournament: String,
}

#[derive(Serialize, Deserialize)]
struct User {
    id: i32,
    name: String,
    surname: String,
    role: String,
    login: String,
    phone: String,
    mail: String,
    ranking: i32,
}

#[derive(Serialize, Deserialize)]
struct leaderboard {
    name: String,
    surname: String,
    ranking: i32,
}

#[derive(Serialize, Deserialize)]
struct ladderRaw {
    id: i32,
    inAtype: String,
    inA: String,
    inBtype: String,
    inB: String,
    winner: String,
    round_number: String,
    scores: String,
    inAname1:String,
    inAsurname1:String,
    inAname2:String,
    inAsurname2:String,
    inBname1:String,
    inBsurname1:String,
    inBname2:String,
    inBsurname2:String,
}

#[derive(Serialize, Deserialize)]
struct Registration {
    id: i32,
    userid: i32,
    tournamentid: String,
    paymenttype: String,
    paymentstatus: String,
    paymenttype2: String,
    paymentstatus2: String,
    approval: String,
    partner: i32,
    name1: String,
    surname1: String,
    name2: String,
    surname2: String,
    rankingsum: i32,
    partnerAcceptance: i32,
}

#[derive(Serialize, Deserialize)]
struct Usera {
    id: i32,
    name: String,
    surname: String,
    role: String,
    login: String,
    phone: String,
    mail: String,
    deleted: i32,
    ranking: i32,
}

#[derive(Serialize, Deserialize)]
struct tournament {
    id: i32,
    name: String,
    typeOfLadder: String,
    pointsForTournament: i32,
    places: i32,
    creator: i32,
    approved: i32,
    state: i32,
    currentRound: i32,
    from: String,
    to: String,
    place: String,
    categotry: String,
    rang: String,
    entryFee: i32,
    director: String,
    phone: String,
    entriesTo: String,
    additionalInformations: String,
    visibility: String,
    hasImage: i32
}
#[derive(Serialize, Deserialize)]
struct tournamentMyaction {
    id: i32,
    action: String,
}
#[derive(Serialize, Deserialize)]
struct tournamentMy {
    id: i32,
    name: String,
    typeOfLadder: String,
    pointsForTournament: i32,
    places: i32,
    creator: i32,
    approved: i32,
    state: i32,
    currentRound: i32,
    from: String,
    to: String,
    place: String,
    categotry: String,
    rang: String,
    entryFee: i32,
    director: String,
    phone: String,
    entriesTo: String,
    additionalInformations: String,
    visibility: String,
    actionRequired: Vec<tournamentMyaction>,
    hasImage: i32
}
#[derive(Serialize, Deserialize)]
struct tournamenta {
    id: i32,
    name: String,
    typeOfLadder: String,
    pointsForTournament: i32,
    places: i32,
    creator: i32,
    approved: i32,
    deleted: i32,
    state: i32,
    currentRound: i32,
    from: String,
    to: String,
    place: String,
    categotry: String,
    rang: String,
    entryFee: i32,
    director: String,
    phone: String,
    entriesTo: String,
    additionalInformations: String,
    visibility: String,
    hasImage: i32
}

thread_local!(static POOL: Pool = Pool::new(Opts::from_url("mysql://inz:HaLzqw68CbabS8Smz3Vx!@10.1.6.101:3306/inz").unwrap()).unwrap());

async fn hello_world(req: Request<Body>) -> Result<Response<Body>> {
    let smtp_server = "smtp.wp.pl";
    let smtp_username = "padelts@wp.pl";
    let smtp_password = "padel2024";
    let mut response = Response::new(Body::empty());
    response.headers_mut().insert("Access-Control-Allow-Origin", "*".parse().unwrap());
    response.headers_mut().insert("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE".parse().unwrap());
    response.headers_mut().insert("Access-Control-Allow-Headers", "*".parse().unwrap());
    if req.method() == &Method::OPTIONS {
        return Ok(response);
    }
    match (req.method(), req.uri().path()) {
        (&Method::GET, "/user/settings") => {
            if req.headers().contains_key("Authorization") {
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();

                POOL.with(|poola| {
                    let res1 :Option<Row> = poola.get_conn().unwrap().exec_first("select userSettings from users where id = (select user from sessions where token=?)", ( token,)).unwrap();
                    if !res1.is_none() {
                        let res = res1.unwrap();
                        if !res.is_empty() {
                            let tmp = res.get(0);
                            if tmp.is_some() {
                                let tmp2: Value = tmp.unwrap();
                                if tmp2 != Value::NULL {
                                    *response.body_mut() = from_value::<String>(tmp2).into();
                                }
                            }
                        }
                    }
                });
            }
        }
        (&Method::POST, "/user/settings") => {
            if req.headers().contains_key("Authorization") {
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();
                let byte_stream =String::from_utf8( hyper::body::to_bytes(req).await.unwrap().to_vec()).unwrap();

                POOL.with(|poola| {
                    poola.get_conn().unwrap().exec_drop("Update users set userSettings =? where id = (select user from sessions where token=?)", ( byte_stream,token)).unwrap();
                });
            }
        }
        (&Method::GET, "/tournament/image") => {
            let query: &str = req.uri().query().unwrap();
            let mut splited = query.split("=");

            let id = splited.next().unwrap();
            let val = splited.next().unwrap();
            if id != "id" {
                *response.body_mut() = "{\"error\":\"id required\"}".into();
                return Ok(response);
            }
            POOL.with(|poola| {
                let res1 :Option<Row> = poola.get_conn().unwrap()
                    .exec_first(
                        "SELECT image FROM tournaments where deleted =0 and id = ? ;", (&val, )
                    ).unwrap();
                if !res1.is_none() {
                    let res = res1.unwrap();
                    if !res.is_empty() {
                        let tmp = res.get(0);
                        if tmp.is_some() {
                            let tmp2: Value = tmp.unwrap();
                            if tmp2 != Value::NULL {
                                *response.body_mut() = from_value::<Vec<u8>>(tmp2).into();
                            }
                        }
                    }
                }
            });
        }
        (&Method::DELETE, "/tournament/image") => {
            let query: &str = req.uri().query().unwrap();
            let mut splited = query.split("=");

            let id = splited.next().unwrap();
            let val = splited.next().unwrap().to_string();

            if id != "id" {
                *response.body_mut() = "{\"error\":\"id required\"}".into();
                return Ok(response);
            }

            if req.headers().contains_key("Authorization") {
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();

                POOL.with(|poola| {
                    let mut con = poola.get_conn().unwrap();
                    let mut result = con.exec_iter("Select id,role from users where (role = '2' OR role = '3')AND id =(SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW());", (&token, )).unwrap();
                    let mut it = result.iter().unwrap();
                    let row = it.next();
                    if row.is_none() {
                        *response.status_mut() = StatusCode::FORBIDDEN;
                        return;
                    }
                    let urow = row.unwrap().unwrap();
                    let id: i32 = urow.get(0).unwrap();
                    let role: String = urow.get(1).unwrap();
                    let mut conn1 = poola.get_conn().unwrap();
                    let mut result1 = conn1.exec_iter("Select creator, state from tournaments where id = ?", (&val, )).unwrap();
                    let mut it1 = result1.iter().unwrap();
                    let row1 = it1.next();
                    let urow1 = row1.unwrap().unwrap();
                    let creator: i32 = urow1.get(0).unwrap();
                    let state: i32 = urow1.get(1).unwrap();
                    if role == "2" {
                        if creator != id {
                            *response.status_mut() = StatusCode::FORBIDDEN;
                            return;
                        }
                    }

                    poola.get_conn().unwrap().exec_drop("Update tournaments set image = null where id = ?", ( val,)).unwrap();

                });
            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::POST, "/tournament/image") => {
            let query: &str = req.uri().query().unwrap();
            let mut splited = query.split("=");

            let id = splited.next().unwrap();
            let val = splited.next().unwrap().to_string();

            if id != "id" {
                *response.body_mut() = "{\"error\":\"id required\"}".into();
                return Ok(response);
            }

            if req.headers().contains_key("Authorization") {
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();
                let byte_stream = hyper::body::to_bytes( req).await.unwrap().to_vec();

                POOL.with(|poola| {
                    let mut con = poola.get_conn().unwrap();
                    let mut result = con.exec_iter("Select id,role from users where (role = '2' OR role = '3')AND id =(SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW());", (&token, )).unwrap();
                    let mut it = result.iter().unwrap();
                    let row = it.next();
                    if row.is_none() {
                        *response.status_mut() = StatusCode::FORBIDDEN;
                        return;
                    }
                    let urow = row.unwrap().unwrap();
                    let id: i32 = urow.get(0).unwrap();
                    let role: String = urow.get(1).unwrap();
                    let mut conn1 = poola.get_conn().unwrap();
                    let mut result1 = conn1.exec_iter("Select creator, state from tournaments where id = ?", (&val, )).unwrap();
                    let mut it1 = result1.iter().unwrap();
                    let row1 = it1.next();
                    let urow1 = row1.unwrap().unwrap();
                    let creator: i32 = urow1.get(0).unwrap();
                    let state: i32 = urow1.get(1).unwrap();
                    if role == "2" {
                        if creator != id {
                            *response.status_mut() = StatusCode::FORBIDDEN;
                            return;
                        }
                    }

                    poola.get_conn().unwrap().exec_drop("Update tournaments set image =? where id = ?", ( byte_stream,val)).unwrap();

                });
            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::GET, "/user/byId") => {
            let query: &str = req.uri().query().unwrap();
            let mut splited = query.split("=");

            let id = splited.next().unwrap();
            let val = splited.next().unwrap();
            if id != "id" {
                *response.body_mut() = "{\"error\":\"id required\"}".into();
                return Ok(response);
            }
            POOL.with(|poola| {
                let res = poola.get_conn().unwrap()
                    .exec_map(
                        "SELECT name, surname FROM users where deleted =0 and id = ? ;", (&val, ),
                        |(name, surname)| {
                            SearchResult { name, surname }
                        },
                    );
                *response.body_mut() = serde_json::to_string(&res.unwrap().get(0)).unwrap().into();
            });
        }
        (&Method::GET, "/proposals/pending") => {
            if req.headers().contains_key("Authorization") {
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();
                POOL.with(|poola| {
                    let mut con = poola.get_conn().unwrap();
                    let mut result = con.exec_iter("Select id from users where id =(SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW());", (&token, )).unwrap();
                    let mut it = result.iter().unwrap();
                    let row = it.next();
                    let urow = row.unwrap().unwrap();
                    let uid: i32 = urow.get(0).unwrap();
                    let res = poola.get_conn().unwrap()
                        .exec_map(
                            "SELECT * FROM inz.winProposals where proposer in (Select id from registrations where ? = userid or ? = partner ) or approver in (Select id from registrations where ? = userid or ? = partner );", (&uid, &uid, &uid, &uid),
                            |(id, ladderid, winner, proposer, approver, score)| {
                                Proposal { id, ladderid, winner, proposer, approver, score }
                            },
                        );
                    *response.body_mut() = serde_json::to_string(&res.unwrap()).unwrap().into();
                });
            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::POST, "/proposal/approve") => {
            if req.headers().contains_key("Authorization") {
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();
                let byte_stream = hyper::body::to_bytes(req).await.unwrap();
                let s: HashMap<String, String> = serde_json::from_slice(&byte_stream).unwrap();
                let mut row: Option<Result<Row>> = None;
                let mut row2: Option<Result<Row>> = None;
                let mut row3: Option<Result<Row>> = None;
                if !s.contains_key("id") {
                    *response.body_mut() = "{\"error\":\"id is required\"}".into();
                    return Ok(response);
                }
                let id = s.get("id").unwrap().to_string();

                POOL.with(|poola| {
                    let mut con = poola.get_conn().unwrap();
                    let mut result = con.exec_iter("Select  id from users where id =(SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW());", (&token, )).unwrap();
                    let mut it = result.iter().unwrap();
                    row = it.next();
                    let mut con2 = poola.get_conn().unwrap();
                    let mut result2 = con2.exec_iter("Select ladderid, winner, score from winProposals where id =?;", (&id, )).unwrap();
                    let mut it2 = result2.iter().unwrap();
                    row2 = it2.next();
                    let mut con3 = poola.get_conn().unwrap();
                    let mut result3 = con3.exec_iter("Select userid, partner from registrations where id =(Select approver from winProposals where id =?);", (&id, )).unwrap();
                    let mut it3 = result3.iter().unwrap();
                    row3 = it3.next();
                });
                if row.is_none() {
                    *response.status_mut() = StatusCode::FORBIDDEN;
                    return Ok(response);
                }
                if row2.is_none() {
                    *response.status_mut() = StatusCode::BAD_REQUEST;
                    return Ok(response);
                }
                let urow = row.unwrap().unwrap();
                let urow2 = row2.unwrap().unwrap();
                let urow3 = row3.unwrap().unwrap();
                let uid: i32 = urow.get(0).unwrap();
                let user: i32 = urow3.get(0).unwrap();
                let partner: i32 = urow3.get(1).unwrap();
                if !(uid == user || uid == partner) {
                    *response.status_mut() = StatusCode::BAD_REQUEST;
                    return Ok(response);
                }
                let ladderid: i32 = urow2.get(0).unwrap();
                let winner: String = urow2.get(1).unwrap();
                let score: String = urow2.get(2).unwrap();
                POOL.with(|poola| {
                    poola.get_conn().unwrap().exec_drop("Update ladder set winner =?, scores=? where id = ?", (winner, score, ladderid)).unwrap();
                    poola.get_conn().unwrap().exec_drop("delete from winProposals where id = ?", (id, )).unwrap();
                });
            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::PUT, "/proposal") => {
            if req.headers().contains_key("Authorization") {
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();
                let byte_stream = hyper::body::to_bytes(req).await.unwrap();
                let s: HashMap<String, String> = serde_json::from_slice(&byte_stream).unwrap();
                let mut row: Option<Result<Row>> = None;
                let mut row2: Option<Result<Row>> = None;
                let ladderid = s.get("ladderid").unwrap().to_string();

                POOL.with(|poola| {
                    let mut con = poola.get_conn().unwrap();
                    let mut result = con.exec_iter("Select  id from users where id =(SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW());", (&token, )).unwrap();
                    let mut it = result.iter().unwrap();
                    row = it.next();
                    let mut con2 = poola.get_conn().unwrap();
                    let mut result2 = con2.exec_iter("Select inAtype, inA, inBtype, inB from ladder where deleted = 0 and id =? and winner ='0';", (&ladderid, )).unwrap();
                    let mut it2 = result2.iter().unwrap();
                    row2 = it2.next();
                });
                if row.is_none() {
                    *response.status_mut() = StatusCode::FORBIDDEN;
                    return Ok(response);
                }
                if row2.is_none() {
                    *response.status_mut() = StatusCode::BAD_REQUEST;
                    return Ok(response);
                }
                let urow = row.unwrap().unwrap();
                let urow2 = row2.unwrap().unwrap();
                let id: i32 = urow.get(0).unwrap();
                let inAtype: String = urow2.get(0).unwrap();
                let mut inA: String = urow2.get(1).unwrap();
                let inBtype: String = urow2.get(2).unwrap();
                let mut inB: String = urow2.get(3).unwrap();
                if s.contains_key("score") && s.contains_key("winner") {
                    if s.get("winner").unwrap() != "A" && s.get("winner").unwrap() != "B" {
                        *response.body_mut() = "{\"error\":\"winner must be A or B\"}".into();
                        return Ok(response);
                    }
                    if inAtype != "R" {
                        let mut res3: Option<Result<Row>> = None;
                        POOL.with(|poola| {
                            res3 = poola.get_conn().unwrap()
                                .exec_iter("WITH RECURSIVE menu_tree
    AS (
    SELECT if('A' ='A', inAtype, inBtype) as 'type', if('A' ='A', inA, inB) as 'val' from ladder where id =?
      UNION ALL
      SELECT if(mn.type ='W', if(la.winner ='A', inAtype, if(la.winner ='B', la.inBtype, null)), if(la.winner ='A', la.inBtype, if(la.winner ='B', la.inAtype, null))) , if(mn.type ='W', if(la.winner ='A', la.inA, if(la.winner ='B', la.inB, null)), if(la.winner ='A', la.inB, if(la.winner ='B', la.inA, null)))
      FROM menu_tree mn, inz.ladder la
      WHERE mn.val= la.id and mn.type != 'R'
    )
     SELECT * FROM menu_tree where type = 'R'", (&ladderid, ),
                                ).unwrap().iter().unwrap().next();
                        });
                        if !res3.is_none() {
                            let urow3 = res3.unwrap().unwrap();
                            inA = urow3.get(1).unwrap();
                        } else {
                            *response.status_mut() = StatusCode::BAD_REQUEST;
                            return Ok(response);
                        }
                    }
                    if inBtype != "R" {
                        let mut res3: Option<Result<Row>> = None;
                        POOL.with(|poola| {
                            res3 = poola.get_conn().unwrap()
                                .exec_iter("WITH RECURSIVE menu_tree
    AS (
    SELECT if('B' ='A', inAtype, inBtype) as 'type', if('B' ='A', inA, inB) as 'val' from ladder where id =?
      UNION ALL
      SELECT if(mn.type ='W', if(la.winner ='A', inAtype, if(la.winner ='B', la.inBtype, null)), if(la.winner ='A', la.inBtype, if(la.winner ='B', la.inAtype, null))) , if(mn.type ='W', if(la.winner ='A', la.inA, if(la.winner ='B', la.inB, null)), if(la.winner ='A', la.inB, if(la.winner ='B', la.inA, null)))
      FROM menu_tree mn, inz.ladder la
      WHERE mn.val= la.id and mn.type != 'R'
    )
     SELECT * FROM menu_tree where type = 'R'", (&ladderid, ),
                                ).unwrap().iter().unwrap().next();
                        });
                        if !res3.is_none() {
                            let urow3 = res3.unwrap().unwrap();
                            inB = urow3.get(1).unwrap();
                        } else {
                            *response.status_mut() = StatusCode::BAD_REQUEST;
                            return Ok(response);
                        }
                    }
                    let mut res3: Option<Result<Row>> = None;
                    let mut res4: Option<Result<Row>> = None;
                    POOL.with(|poola| {
                        res3 = poola.get_conn().unwrap()
                            .exec_iter("SELECT userid, partner FROM inz.registrations where id = ?;", (&inA, ),
                            ).unwrap().iter().unwrap().next();
                        res4 = poola.get_conn().unwrap()
                            .exec_iter("SELECT userid, partner FROM inz.registrations where id = ?;", (&inB, ),
                            ).unwrap().iter().unwrap().next();
                    });
                    let urow3 = res3.unwrap().unwrap();
                    let urow4 = res4.unwrap().unwrap();
                    let mut prop = "";
                    let mut acc = "";
                    let u1: i32 = urow3.get(0).unwrap();
                    let u2: i32 = urow3.get(1).unwrap();
                    let u3: i32 = urow4.get(0).unwrap();
                    let u4: i32 = urow4.get(1).unwrap();
                    if u1 == id || u2 == id {
                        prop = &inA;
                        acc = &inB;
                    } else {
                        if u3 == id || u4 == id {
                            prop = &inB;
                            acc = &inA;
                        } else {
                            *response.status_mut() = StatusCode::BAD_REQUEST;
                            return Ok(response);
                        }
                    }
                    POOL.with(|poola| {
                        let nid = "{\"id\":".to_owned() + &poola.get_conn().unwrap().exec_iter("INSERT INTO `inz`.`winProposals`(ladderid, winner, proposer, approver, score) VALUES (?,?,?,?,?);", (&ladderid, s.get("winner"), prop, acc, s.get("score"))).unwrap().last_insert_id().unwrap().to_string() + "\"}";
                        *response.body_mut() = nid.into();
                    });
                } else {
                    *response.body_mut() = "{\"error\":\"not all fields\"}".into();
                }
            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::GET, "/ladders/solved") => {
            let query: &str = req.uri().query().unwrap();
            let mut splited = query.split("=");

            let id = splited.next().unwrap();
            let val = splited.next().unwrap();
            if id != "id" {
                *response.body_mut() = "{\"error\":\"id required\"}".into();
                return Ok(response);
            }
            POOL.with(|poola| {
                let res = poola.get_conn().unwrap()
                    .exec_iter(
                        "SELECT  id, inAtype, inA, inBtype, inB, winner, round, scores,if(inAtype='R',(select `name` from users where id = (Select userid from registrations where id = inA)),'N/A'), if(inAtype='R',(select `surname` from users where id = (Select userid from registrations where id = inA)),'N/A'), if(inAtype='R',(select `name` from users where id = (Select partner from registrations where id = inA)),'N/A'), if(inAtype='R',(select `surname` from users where id = (Select partner from registrations where id = inA)),'N/A'), if(inBtype='R',(select `name` from users where id = (Select userid from registrations where id = inB)),'N/A'), if(inBtype='R',(select `surname` from users where id = (Select userid from registrations where id = inB)),'N/A'), if(inBtype='R',(select `name` from users where id = (Select partner from registrations where id = inB)),'N/A'), if(inBtype='R',(select `surname` from users where id = (Select partner from registrations where id = inB)),'N/A')  from ladder where deleted =0 and id = ?", (val, ),
                    ).unwrap().iter().unwrap().next();
                let res2 = poola.get_conn().unwrap()
                    .exec_iter("WITH RECURSIVE menu_tree
    AS (
    SELECT if('A' ='A', inAtype, inBtype) as 'type', if('A' ='A', inA, inB) as 'val' from ladder where id =?
      UNION ALL
      SELECT if(mn.type ='W', if(la.winner ='A', inAtype, if(la.winner ='B', la.inBtype, null)), if(la.winner ='A', la.inBtype, if(la.winner ='B', la.inAtype, null))) , if(mn.type ='W', if(la.winner ='A', la.inA, if(la.winner ='B', la.inB, null)), if(la.winner ='A', la.inB, if(la.winner ='B', la.inA, null)))
      FROM menu_tree mn, inz.ladder la
      WHERE mn.val= la.id and mn.type != 'R'
    )
     SELECT *,if(type='R',(select `name` from users where id = (Select userid from registrations where id = val)),'N/A'), if(type='R',(select `surname` from users where id = (Select userid from registrations where id = val)),'N/A'), if(type='R',(select `name` from users where id = (Select partner from registrations where id = val)),'N/A'), if(type='R',(select `surname` from users where id = (Select partner from registrations where id = val)),'N/A') FROM menu_tree where type = 'R'", (val, ),
                    ).unwrap().iter().unwrap().next();
                let res3 = poola.get_conn().unwrap()
                    .exec_iter("WITH RECURSIVE menu_tree
    AS (
    SELECT if('B' ='A', inAtype, inBtype) as 'type', if('B' ='A', inA, inB) as 'val' from ladder where id =?
      UNION ALL
      SELECT if(mn.type ='W', if(la.winner ='A', inAtype, if(la.winner ='B', la.inBtype, null)), if(la.winner ='A', la.inBtype, if(la.winner ='B', la.inAtype, null))) , if(mn.type ='W', if(la.winner ='A', la.inA, if(la.winner ='B', la.inB, null)), if(la.winner ='A', la.inB, if(la.winner ='B', la.inA, null)))
      FROM menu_tree mn, inz.ladder la
      WHERE mn.val= la.id and mn.type != 'R'
    )
     SELECT * ,if(type='R',(select `name` from users where id = (Select userid from registrations where id = val)),'N/A'), if(type='R',(select `surname` from users where id = (Select userid from registrations where id = val)),'N/A'), if(type='R',(select `name` from users where id = (Select partner from registrations where id = val)),'N/A'), if(type='R',(select `surname` from users where id = (Select partner from registrations where id = val)),'N/A') FROM menu_tree where type = 'R'", (val, ),
                    ).unwrap().iter().unwrap().next();
                let ur = res.unwrap().unwrap();
                let id1: i32 = ur.get(0).unwrap();
                let mut inAtype: String = ur.get(1).unwrap();
                let mut inA: String = ur.get(2).unwrap();
                let mut inBtype: String = ur.get(3).unwrap();
                let mut inB: String = ur.get(4).unwrap();
                let winner: String = ur.get(5).unwrap();
                let round: String = ur.get(6).unwrap();
                let scores: String = ur.get(7).unwrap();
                let mut inAname1: String = ur.get(8).unwrap();
                let mut inAsurname1: String = ur.get(9).unwrap();
                let mut inAname2: String = ur.get(10).unwrap();
                let mut inAsurname2: String = ur.get(11).unwrap();
                let mut inBname1: String = ur.get(12).unwrap();
                let mut inBsurname1: String = ur.get(13).unwrap();
                let mut inBname2: String = ur.get(14).unwrap();
                let mut inBsurname2: String = ur.get(15).unwrap();
                if !res2.is_none() {
                    let urow3 = res2.unwrap().unwrap();
                    inAtype = urow3.get(0).unwrap();
                    inA = urow3.get(1).unwrap();
                    inAname1 = urow3.get(2).unwrap();
                    inAsurname1 = urow3.get(3).unwrap();
                    inAname2 = urow3.get(4).unwrap();
                    inAsurname2 = urow3.get(5).unwrap();
                }
                if !res3.is_none() {
                    let urow4 = res3.unwrap().unwrap();
                    inBtype = urow4.get(0).unwrap();
                    inB = urow4.get(1).unwrap();
                    inBname1 = urow4.get(2).unwrap();
                    inBsurname1 = urow4.get(3).unwrap();
                    inBname2 = urow4.get(4).unwrap();
                    inBsurname2 = urow4.get(5).unwrap();
                }
                let res = ladderRaw { id: id1, inAtype: inAtype, inA: inA, inBtype: inBtype, inB: inB, winner: winner, round_number: round, scores: scores, inAname1: inAname1, inAsurname1: inAsurname1, inAname2:inAname2, inAsurname2: inAsurname2, inBname1: inBname1, inBsurname1: inBsurname1, inBname2: inBname2, inBsurname2: inBsurname2 };
                *response.body_mut() = serde_json::to_string(&res).unwrap().into();
            });
        }
        (&Method::GET, "/ladders/raw") => {
            let query: &str = req.uri().query().unwrap();
            let mut splited = query.split("=");

            let id = splited.next().unwrap();
            let val = splited.next().unwrap();
            if id != "tournamentid" {
                *response.body_mut() = "{\"error\":\"tournamentid required\"}".into();
                return Ok(response);
            }
            let mut res = Vec::new();

            POOL.with(|poola| {
                poola.get_conn().unwrap()
                    .exec_iter(
                        "SELECT  id, inAtype, inA, inBtype, inB, winner, round, scores, if(inAtype='R',(select `name` from users where id = (Select userid from registrations where id = inA)),'N/A'), if(inAtype='R',(select `surname` from users where id = (Select userid from registrations where id = inA)),'N/A'), if(inAtype='R',(select `name` from users where id = (Select partner from registrations where id = inA)),'N/A'), if(inAtype='R',(select `surname` from users where id = (Select partner from registrations where id = inA)),'N/A'), if(inBtype='R',(select `name` from users where id = (Select userid from registrations where id = inB)),'N/A'), if(inBtype='R',(select `surname` from users where id = (Select userid from registrations where id = inB)),'N/A'), if(inBtype='R',(select `name` from users where id = (Select partner from registrations where id = inB)),'N/A'), if(inBtype='R',(select `surname` from users where id = (Select partner from registrations where id = inB)),'N/A') from ladder where deleted =0 and tournamentid = ?", (val, ),

                    ).unwrap().for_each(|row| {
                    let result_set = row.unwrap();

                    res.push(ladderRaw {
                        id: from_value(result_set.get(0).unwrap()),
                        inAtype: from_value(result_set.get(1).unwrap()),
                        inA: from_value(result_set.get(2).unwrap()),
                        inBtype:from_value(result_set.get(3).unwrap()),
                        inB: from_value(result_set.get(4).unwrap()),
                        winner: from_value(result_set.get(5).unwrap()),
                        round_number: from_value(result_set.get(6).unwrap()),
                        scores:from_value(result_set.get(7).unwrap()),
                        inAname1: from_value(result_set.get(8).unwrap()),
                        inAsurname1: from_value(result_set.get(9).unwrap()),
                        inAname2: from_value(result_set.get(10).unwrap()),
                        inAsurname2: from_value(result_set.get(11).unwrap()),
                        inBname1: from_value(result_set.get(12).unwrap()),
                        inBsurname1: from_value(result_set.get(13).unwrap()),
                        inBname2: from_value(result_set.get(14).unwrap()),
                        inBsurname2: from_value(result_set.get(15).unwrap())
                    });
                });;
                *response.body_mut() = serde_json::to_string(&res).unwrap().into();
            });
        }
        (&Method::POST, "/ladder") => {
            if req.headers().contains_key("Authorization") {
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();
                let byte_stream = hyper::body::to_bytes(req).await.unwrap();
                let s: HashMap<String, String> = serde_json::from_slice(&byte_stream).unwrap();
                if !s.contains_key("id") {
                    *response.body_mut() = "{\"error\":\"id is required\"}".into();
                    return Ok(response);
                }

                let mut row: Option<Result<Row>> = None;
                let mut row3: Option<Result<Row>> = None;
                POOL.with(|poola| {
                    let mut con = poola.get_conn().unwrap();
                    let mut result = con.exec_iter("Select id, role from users where (role='2' or role='3' )and id =(SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW());", (&token, )).unwrap();
                    let mut it = result.iter().unwrap();
                    row = it.next();
                });
                if row.is_none() {
                    *response.status_mut() = StatusCode::FORBIDDEN;
                    return Ok(response);
                }

                let urow = row.unwrap().unwrap();
                let id: i32 = urow.get(0).unwrap();
                let role: String = urow.get(1).unwrap();
                let tournamentid = s.get("id");
                if role == "2" {
                    POOL.with(|poola| {
                        let mut con3 = poola.get_conn().unwrap();
                        let mut result3 = con3.exec_iter("Select creator from tournaments where id = (Select tournamentid from ladder where id =?);", (&tournamentid, )).unwrap();
                        let mut it3 = result3.iter().unwrap();
                        row3 = it3.next();
                    });
                    let urow3 = row3.unwrap().unwrap();
                    let creator: i32 = urow3.get(0).unwrap();
                    if creator != id {
                        *response.status_mut() = StatusCode::NOT_FOUND;
                        return Ok(response);
                    }
                }
                POOL.with(|poola| {
                    if s.contains_key("inAtype") {
                        if s.get("inAtype").unwrap() != "R" && s.get("inAtype").unwrap() != "W" && s.get("inAtype").unwrap() != "L" {
                            *response.body_mut() = "{\"error\":\"inAtype must be R, W or L\"}".into();
                            return;
                        }
                        poola.get_conn().unwrap().exec_drop("Update ladder set inAtype =? where id = ? and deleted =0", (s.get("inAtype"), &tournamentid)).unwrap();
                    }
                    if s.contains_key("inBtype") {
                        if s.get("inBtype").unwrap() != "R" && s.get("inBtype").unwrap() != "W" && s.get("inBtype").unwrap() != "L" {
                            *response.body_mut() = "{\"error\":\"inBtype must be R, W or L\"}".into();
                            return;
                        }
                        poola.get_conn().unwrap().exec_drop("Update ladder set inBtype =? where id = ? and deleted =0", (s.get("inBtype"), &tournamentid)).unwrap();
                    }
                    if s.contains_key("inA") {
                        poola.get_conn().unwrap().exec_drop("Update ladder set inA =? where id = ? and deleted =0", (s.get("inA"), &tournamentid)).unwrap();
                    }
                    if s.contains_key("inB") {
                        poola.get_conn().unwrap().exec_drop("Update ladder set inB =? where id = ? and deleted =0", (s.get("inB"), &tournamentid)).unwrap();
                    }
                    if s.contains_key("winner") {
                        poola.get_conn().unwrap().exec_drop("Update ladder set winner =? where id = ? and deleted =0", (s.get("winner"), &tournamentid)).unwrap();
                    }
                    if s.contains_key("round") {
                        poola.get_conn().unwrap().exec_drop("Update ladder set round =? where id = ? and deleted =0", (s.get("round"), &tournamentid)).unwrap();
                    }
                    if s.contains_key("scores") {
                        poola.get_conn().unwrap().exec_drop("Update ladder set scores =? where id = ? and deleted =0", (s.get("scores"), &tournamentid)).unwrap();
                    }
                });
            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::DELETE, "/ladder") => {
            if req.headers().contains_key("Authorization") {
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();
                let byte_stream = hyper::body::to_bytes(req).await.unwrap();
                let s: HashMap<String, String> = serde_json::from_slice(&byte_stream).unwrap();
                if !s.contains_key("id") {
                    *response.body_mut() = "{\"error\":\"id is required\"}".into();
                    return Ok(response);
                }

                let mut row: Option<Result<Row>> = None;
                let mut row3: Option<Result<Row>> = None;
                POOL.with(|poola| {
                    let mut con = poola.get_conn().unwrap();
                    let mut result = con.exec_iter("Select id, role from users where (role='2' or role='3' )and id =(SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW());", (&token, )).unwrap();
                    let mut it = result.iter().unwrap();
                    row = it.next();
                });
                if row.is_none() {
                    *response.status_mut() = StatusCode::FORBIDDEN;
                    return Ok(response);
                }

                let urow = row.unwrap().unwrap();
                let id: i32 = urow.get(0).unwrap();
                let role: String = urow.get(1).unwrap();
                let tournamentid = s.get("id");
                if role == "2" {
                    POOL.with(|poola| {
                        let mut con3 = poola.get_conn().unwrap();
                        let mut result3 = con3.exec_iter("Select creator from tournaments where id = (Select tournamentid from ladder where id =?);", (&tournamentid, )).unwrap();
                        let mut it3 = result3.iter().unwrap();
                        row3 = it3.next();
                    });
                    let urow3 = row3.unwrap().unwrap();
                    let creator: i32 = urow3.get(0).unwrap();
                    if creator != id {
                        *response.status_mut() = StatusCode::NOT_FOUND;
                        return Ok(response);
                    }
                }
                POOL.with(|poola| {
                    poola.get_conn().unwrap().exec_drop("Update ladder set deleted =1 where id = ?", (&s.get("id"), )).unwrap();
                });
            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::PUT, "/ladder") => {
            if req.headers().contains_key("Authorization") {
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();
                let byte_stream = hyper::body::to_bytes(req).await.unwrap();
                let s: HashMap<String, String> = serde_json::from_slice(&byte_stream).unwrap();
                if !s.contains_key("inAtype") || !s.contains_key("inA") || !s.contains_key("inBtype") || !s.contains_key("inB") || !s.contains_key("round") || !s.contains_key("tournamentid") {
                    *response.body_mut() = "{\"error\":\"no all fields\"}".into();
                    return Ok(response);
                }

                let mut row: Option<Result<Row>> = None;
                let mut row3: Option<Result<Row>> = None;
                POOL.with(|poola| {
                    let mut con = poola.get_conn().unwrap();
                    let mut result = con.exec_iter("Select id, role from users where (role='2' or role='3' )and id =(SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW());", (&token, )).unwrap();
                    let mut it = result.iter().unwrap();
                    row = it.next();
                });
                if row.is_none() {
                    *response.status_mut() = StatusCode::FORBIDDEN;
                    return Ok(response);
                }
                let tournamentid = s.get("tournamentid");

                if s.get("inBtype").unwrap() == "R" {
                    let mut row4: Option<Result<Row>> = None;
                    POOL.with(|poola| {
                        let mut con = poola.get_conn().unwrap();
                        let mut result = con.exec_iter("Select id from registrations where id= ? and informed = 1 and tournamentid =?", (&s.get("inB"), &tournamentid)).unwrap();
                        let mut it = result.iter().unwrap();
                        row4 = it.next();
                    });
                    if row4.is_none() {
                        *response.status_mut() = StatusCode::NOT_FOUND;
                        return Ok(response);
                    }
                } else {
                    if s.get("inBtype").unwrap() == "W" || s.get("inBtype").unwrap() == "L" {
                        let mut row4: Option<Result<Row>> = None;
                        POOL.with(|poola| {
                            let mut con = poola.get_conn().unwrap();
                            let mut result = con.exec_iter("Select id from ladder where id= ? and tournamentid=?", (&s.get("inB"), &tournamentid)).unwrap();
                            let mut it = result.iter().unwrap();
                            row4 = it.next();
                        });
                        if row4.is_none() {
                            *response.status_mut() = StatusCode::NOT_FOUND;
                            return Ok(response);
                        }
                    } else {
                        *response.body_mut() = "{\"error\":\"inBtype must be R, W or L\"}".into();
                        return Ok(response);
                    }
                }
                if s.get("inAtype").unwrap() == "R" {
                    let mut row4: Option<Result<Row>> = None;
                    POOL.with(|poola| {
                        let mut con = poola.get_conn().unwrap();
                        let mut result = con.exec_iter("Select id from registrations where id= ? and informed = 1 and tournamentid=?", (&s.get("inA"), &tournamentid)).unwrap();
                        let mut it = result.iter().unwrap();
                        row4 = it.next();
                    });
                    if row4.is_none() {
                        *response.status_mut() = StatusCode::NOT_FOUND;
                        return Ok(response);
                    }
                } else {
                    if s.get("inAtype").unwrap() == "W" || s.get("inAtype").unwrap() == "L" {
                        let mut row4: Option<Result<Row>> = None;
                        POOL.with(|poola| {
                            let mut con = poola.get_conn().unwrap();
                            let mut result = con.exec_iter("Select id from ladder where id= ? and tournamentid=?", (&s.get("inA"), &tournamentid)).unwrap();
                            let mut it = result.iter().unwrap();
                            row4 = it.next();
                        });
                        if row4.is_none() {
                            *response.status_mut() = StatusCode::NOT_FOUND;
                            return Ok(response);
                        }
                    } else {
                        *response.body_mut() = "{\"error\":\"inAtype must be R, W or L\"}".into();
                        return Ok(response);
                    }
                }
                let urow = row.unwrap().unwrap();
                let id: i32 = urow.get(0).unwrap();
                let role: String = urow.get(1).unwrap();
                if role == "2" {
                    POOL.with(|poola| {
                        let mut con3 = poola.get_conn().unwrap();
                        let mut result3 = con3.exec_iter("Select creator from tournaments where id = ?;", (&tournamentid, )).unwrap();
                        let mut it3 = result3.iter().unwrap();
                        row3 = it3.next();
                    });
                    let urow3 = row3.unwrap().unwrap();
                    let creator: i32 = urow3.get(0).unwrap();
                    if creator != id {
                        *response.status_mut() = StatusCode::NOT_FOUND;
                        return Ok(response);
                    }
                }
                POOL.with(|poola| {
                    let nid = "{\"id\":\"".to_owned() + &poola.get_conn().unwrap().exec_iter("INSERT INTO `inz`.`ladder`(`inAtype`,`inA`,`inBtype`,`inB`,`winner`,`round`,`scores`,`tournamentid`,`deleted`) VALUES (?,?,?,?,'0',?,'-1',?,0);", (s.get("inAtype"), s.get("inA"), s.get("inBtype"), s.get("inB"), s.get("round"), s.get("tournamentid"))).unwrap().last_insert_id().unwrap().to_string() + "\"}";
                    *response.body_mut() = nid.into();
                });
            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::GET, "/leaderboard") => {
            POOL.with(|poola| {
                let res = poola.get_conn().unwrap()
                    .query_map(
                        "SELECT  name, surname, ranking from users where deleted =0 order by ranking DESC",
                        |(name, surname, ranking)| {
                            leaderboard { name, surname, ranking }
                        },
                    );
                *response.body_mut() = serde_json::to_string(&res.unwrap()).unwrap().into();
            });
        }
        (&Method::POST, "/tournament/cancelTournament") => {
            if req.headers().contains_key("Authorization") {
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();
                let byte_stream = hyper::body::to_bytes(req).await.unwrap();
                let s: HashMap<String, String> = serde_json::from_slice(&byte_stream).unwrap();
                if !s.contains_key("id") {
                    *response.body_mut() = "{\"error\":\"id required\"}".into();
                    return Ok(response);
                }
                POOL.with(|poola| {
                    let mut con = poola.get_conn().unwrap();
                    let mut result = con.exec_iter("Select id,role from users where (role = '2' OR role = '3')AND id =(SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW());", (&token, )).unwrap();
                    let mut it = result.iter().unwrap();
                    let row = it.next();
                    if row.is_none() {
                        *response.status_mut() = StatusCode::FORBIDDEN;
                        return;
                    }
                    let urow = row.unwrap().unwrap();
                    let id: i32 = urow.get(0).unwrap();
                    let role: String = urow.get(1).unwrap();
                    let mut conn1 = poola.get_conn().unwrap();
                    let mut result1 = conn1.exec_iter("Select creator, state from tournaments where id = ?", (&s.get("id"), )).unwrap();
                    let mut it1 = result1.iter().unwrap();
                    let row1 = it1.next();
                    let urow1 = row1.unwrap().unwrap();
                    let creator: i32 = urow1.get(0).unwrap();
                    let state: i32 = urow1.get(1).unwrap();
                    if state == 3 {
                        *response.status_mut() = StatusCode::BAD_REQUEST;
                        return;
                    }
                    if role == "2" {
                        if creator != id {
                            return;
                        }
                        poola.get_conn().unwrap().exec_drop("Update tournaments set state =4 where id = ?", (&s.get("id"), )).unwrap();
                    } else {
                        poola.get_conn().unwrap().exec_drop("Update tournaments set state =4 where id = ?", (&s.get("id"), )).unwrap();
                    }
                });
            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::POST, "/tournament/endTournament") => {
            if req.headers().contains_key("Authorization") {
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();
                let byte_stream = hyper::body::to_bytes(req).await.unwrap();

                let parsed: serde_json::Value = serde_json::from_slice(&byte_stream).unwrap();
                if parsed.get("id").is_none() {
                    *response.body_mut() = "{\"error\":\"id required\"}".into();
                    return Ok(response);
                }
                POOL.with(|poola| {
                    let mut con = poola.get_conn().unwrap();
                    let mut result = con.exec_iter("Select id,role from users where (role = '2' OR role = '3')AND id =(SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW());", (&token, )).unwrap();
                    let mut it = result.iter().unwrap();
                    let row = it.next();
                    if row.is_none() {
                        *response.status_mut() = StatusCode::FORBIDDEN;
                        return;
                    }
                    let urow = row.unwrap().unwrap();
                    let id: i32 = urow.get(0).unwrap();
                    let role: String = urow.get(1).unwrap();
                    let mut conn1 = poola.get_conn().unwrap();
                    let mut result1 = conn1.exec_iter("Select creator, state, approved from tournaments where id = ?", (parsed.get("id").unwrap().as_str().unwrap(), )).unwrap();
                    let mut it1 = result1.iter().unwrap();
                    let row1 = it1.next();
                    let urow1 = row1.unwrap().unwrap();
                    let creator: i32 = urow1.get(0).unwrap();
                    let state: i32 = urow1.get(1).unwrap();
                    let approved: i32 = urow1.get(2).unwrap();
                    if state != 2 {
                        *response.status_mut() = StatusCode::BAD_REQUEST;
                        return;
                    }
                    if role == "2" {
                        if creator != id {
                            return;
                        }
                        poola.get_conn().unwrap().exec_drop("Update tournaments set state =3 where id = ?", (parsed.get("id"), )).unwrap();
                    } else {
                        poola.get_conn().unwrap().exec_drop("Update tournaments set state =3 where id = ?", (parsed.get("id"), )).unwrap();
                    }
                    if approved == 2 {
                        let arr: &Vec<serde_json::Value> = parsed.get("results").unwrap().as_array().unwrap();
                        for i in 0..arr.len() {
                            let cur: &Map<String, serde_json::Value> = arr.get(i).unwrap().as_object().unwrap();
                            poola.get_conn().unwrap().exec_drop("Update users set ranking =ranking+? where id = (Select userid from registrations where id = ?) or id = (Select partner from registrations where id = ?)", (&cur.get("points").unwrap().as_str().unwrap(), &cur.get("rid").unwrap().as_str().unwrap(), &cur.get("rid").unwrap().as_str().unwrap())).unwrap();
                        }
                    }
                });
            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::POST, "/tournament/startTournament") => {
            if req.headers().contains_key("Authorization") {
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();
                let byte_stream = hyper::body::to_bytes(req).await.unwrap();
                let s: HashMap<String, String> = serde_json::from_slice(&byte_stream).unwrap();
                if !s.contains_key("id") {
                    *response.body_mut() = "{\"error\":\"id required\"}".into();
                    return Ok(response);
                }
                POOL.with(|poola| {
                    let mut con = poola.get_conn().unwrap();
                    let mut result = con.exec_iter("Select id,role from users where (role = '2' OR role = '3')AND id =(SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW());", (&token, )).unwrap();
                    let mut it = result.iter().unwrap();
                    let row = it.next();
                    if row.is_none() {
                        *response.status_mut() = StatusCode::FORBIDDEN;
                        return;
                    }
                    let urow = row.unwrap().unwrap();
                    let id: i32 = urow.get(0).unwrap();
                    let role: String = urow.get(1).unwrap();
                    let mut conn1 = poola.get_conn().unwrap();
                    let mut result1 = conn1.exec_iter("Select creator, state from tournaments where id = ?", (&s.get("id"), )).unwrap();
                    let mut it1 = result1.iter().unwrap();
                    let row1 = it1.next();
                    let urow1 = row1.unwrap().unwrap();
                    let creator: i32 = urow1.get(0).unwrap();
                    let state: i32 = urow1.get(1).unwrap();
                    if state != 1 {
                        *response.status_mut() = StatusCode::BAD_REQUEST;
                        return;
                    }
                    if role == "2" {
                        if creator != id {
                            return;
                        }
                        poola.get_conn().unwrap().exec_drop("Update tournaments set state =2 where id = ?", (&s.get("id"), )).unwrap();
                    } else {
                        poola.get_conn().unwrap().exec_drop("Update tournaments set state =2 where id = ?", (&s.get("id"), )).unwrap();
                    }
                });
            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::POST, "/tournament/closeRegistrations") => {
            if req.headers().contains_key("Authorization") {
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();
                let byte_stream = hyper::body::to_bytes(req).await.unwrap();
                let s: HashMap<String, String> = serde_json::from_slice(&byte_stream).unwrap();
                if !s.contains_key("id") {
                    *response.body_mut() = "{\"error\":\"id required\"}".into();
                    return Ok(response);
                }
                POOL.with(|poola| {
                    let mut con = poola.get_conn().unwrap();
                    let mut result = con.exec_iter("Select id,role from users where (role = '2' OR role = '3')AND id =(SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW());", (&token, )).unwrap();
                    let mut it = result.iter().unwrap();
                    let row = it.next();
                    if row.is_none() {
                        *response.status_mut() = StatusCode::FORBIDDEN;
                        return;
                    }
                    let urow = row.unwrap().unwrap();
                    let id: i32 = urow.get(0).unwrap();
                    let role: String = urow.get(1).unwrap();
                    let mut conn1 = poola.get_conn().unwrap();
                    let mut result1 = conn1.exec_iter("Select creator, state from tournaments where id = ?", (&s.get("id"), )).unwrap();
                    let mut it1 = result1.iter().unwrap();
                    let row1 = it1.next();
                    let urow1 = row1.unwrap().unwrap();
                    let creator: i32 = urow1.get(0).unwrap();
                    let state: i32 = urow1.get(1).unwrap();
                    if state != 0 {
                        *response.status_mut() = StatusCode::BAD_REQUEST;
                        return;
                    }
                    if role == "2" {
                        if creator != id {
                            return;
                        }
                        poola.get_conn().unwrap().exec_drop("Update tournaments set state =1 where id = ?", (&s.get("id"), )).unwrap();
                    } else {
                        poola.get_conn().unwrap().exec_drop("Update tournaments set state =1 where id = ?", (&s.get("id"), )).unwrap();
                    }
                });
            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::POST, "/registration/approve") => {
            if req.headers().contains_key("Authorization") {
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();
                let byte_stream = hyper::body::to_bytes(req).await.unwrap();
                let s: HashMap<String, String> = serde_json::from_slice(&byte_stream).unwrap();
                if !s.contains_key("id") {
                    *response.body_mut() = "{\"error\":\"id required\"}".into();
                    return Ok(response);
                }
                POOL.with(|poola| {
                    let mut con = poola.get_conn().unwrap();
                    let mut result = con.exec_iter("Select id,role from users where (role = '2' OR role = '3')AND id =(SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW());", (&token, )).unwrap();
                    let mut it = result.iter().unwrap();
                    let row = it.next();
                    if row.is_none() {
                        *response.status_mut() = StatusCode::FORBIDDEN;
                        return;
                    }
                    let urow = row.unwrap().unwrap();
                    let id: i32 = urow.get(0).unwrap();
                    let role: String = urow.get(1).unwrap();
                    if role == "2" {
                        let mut conn1 = poola.get_conn().unwrap();
                        let mut result1 = conn1.exec_iter("Select userid,approval,partnerAcceptance,(Select mail from users where users.id = userid),(Select mail from users where users.id = partner) from registrations where id = ?", (&s.get("id"), )).unwrap();
                        let mut it1 = result1.iter().unwrap();
                        let row1 = it1.next();
                        let urow1 = row1.unwrap().unwrap();
                        let userid: i32 = urow1.get(0).unwrap();
                        let approval: String = urow1.get(1).unwrap();
                        let partnerAcceptance: i32 = urow1.get(2).unwrap();
                        let usermail: String = urow1.get(3).unwrap();
                        let partnermail: String = urow1.get(4).unwrap();
                        if userid != id {
                            return;
                        }
                        if approval == "0" && partnerAcceptance == 1 {
                            poola.get_conn().unwrap().exec_drop("Update registrations set approval ='1' where id = ?", (&s.get("id"), )).unwrap();
                        }
                    } else {
                        let mut conn1 = poola.get_conn().unwrap();
                        let mut result1 = conn1.exec_iter("Select userid,approval,partnerAcceptance,(Select mail from users where users.id = userid),(Select mail from users where users.id = partner) from registrations where id = ?", (&s.get("id"), )).unwrap();
                        let mut it1 = result1.iter().unwrap();
                        let row1 = it1.next();
                        let urow1 = row1.unwrap().unwrap();
                        let userid: i32 = urow1.get(0).unwrap();
                        let approval: String = urow1.get(1).unwrap();
                        let partnerAcceptance: i32 = urow1.get(2).unwrap();
                        let usermail: String = urow1.get(3).unwrap();
                        let partnermail: String = urow1.get(4).unwrap();
                        if approval == "0" && partnerAcceptance == 1 {
                            poola.get_conn().unwrap().exec_drop("Update registrations set approval ='1' where id = ?", (&s.get("id"), )).unwrap();
                        }
                    }
                });
            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::GET, "/registrations") => {
            if req.headers().contains_key("Authorization") {
                let query: &str = req.uri().query().unwrap();
                let mut splited = query.split("=");
                let id = splited.next().unwrap();
                let val = splited.next().unwrap();
                if id != "id" {
                    *response.body_mut() = "{\"error\":\"id required\"}".into();
                    return Ok(response);
                }

                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();
                POOL.with(|poola| {
                    let mut con = poola.get_conn().unwrap();
                    let mut result = con.exec_iter("Select id,role from users where id =(SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW());", (&token, )).unwrap();
                    let mut it = result.iter().unwrap();
                    let row = it.next();
                    if row.is_none() {
                        *response.status_mut() = StatusCode::FORBIDDEN;
                        return;
                    }

                    let urow = row.unwrap().unwrap();
                    let id: i32 = urow.get(0).unwrap();
                    let role: String = urow.get(1).unwrap();
                    if role == "1" {
                        let mut res = Vec::new();

                        POOL.with(|poola| {
                            poola.get_conn().unwrap()
                                .exec_iter(
                                    "SELECT `registrations`.`id`,`registrations`.`userid`,`registrations`.`tournamentid`,IF(userid=? or partner =?,`registrations`.`paymenttype`,'HIDDEN'),IF(userid=? or partner =?,`registrations`.`paymentstatus`,'HIDDEN'),IF(userid=? or partner =?,`registrations`.`paymenttype2`,'HIDDEN'),IF(userid=? or partner =?,`registrations`.`paymentstatus2`,'HIDDEN'),`registrations`.`approval`,`registrations`.`partner`,(select `name` from users where id =userid),(select `surname` from users where id =userid),(select `name` from users where id =partner),(select `surname` from users where id =partner),(select ranking from users where id =partner) +(select ranking from users where id =partner),partnerAcceptance FROM `inz`.`registrations` where tournamentid= ?;", ( id, id, id, id, id, id, id, id,&val)
                                ).unwrap().for_each(|row| {
                                let result_set = row.unwrap();

                                res.push(Registration {
                                    id: from_value(result_set.get(0).unwrap()),
                                    userid: from_value(result_set.get(1).unwrap()),
                                    tournamentid: from_value(result_set.get(2).unwrap()),
                                    paymenttype: from_value(result_set.get(3).unwrap()),
                                    paymentstatus: from_value(result_set.get(4).unwrap()),
                                    paymenttype2:from_value(result_set.get(5).unwrap()),
                                    paymentstatus2:from_value(result_set.get(6).unwrap()),
                                    approval: from_value(result_set.get(7).unwrap()),
                                    partner: from_value(result_set.get(8).unwrap()),
                                    name1: from_value(result_set.get(9).unwrap()),
                                    surname1: from_value(result_set.get(10).unwrap()),
                                    name2: from_value(result_set.get(11).unwrap()),
                                    surname2: from_value(result_set.get(12).unwrap()),
                                    rankingsum: from_value(result_set.get(13).unwrap()),
                                    partnerAcceptance: from_value(result_set.get(14).unwrap())
                                });
                            });
                        });
                        *response.body_mut() = serde_json::to_string(&res).unwrap().into();
                    } else {
                        if role == "2" {
                            let mut conn1 = poola.get_conn().unwrap();
                            let mut result1 = conn1.exec_iter("Select creator from tournaments where id = ?", (&val, )).unwrap();
                            let mut it1 = result1.iter().unwrap();
                            let row1 = it1.next();
                            let urow1 = row1.unwrap().unwrap();
                            let userid: i32 = urow1.get(0).unwrap();
                            if userid != id {
                                let mut res = Vec::new();

                                POOL.with(|poola| {
                                    poola.get_conn().unwrap()
                                        .exec_iter(
                                            "SELECT `registrations`.`id`,`registrations`.`userid`,`registrations`.`tournamentid`,`registrations`.`paymenttype`,`registrations`.`paymentstatus`,`registrations`.`paymenttype2`,`registrations`.`paymentstatus2`,`registrations`.`approval`,`registrations`.`partner`,(select `name` from users where id =userid),(select `surname` from users where id =userid),(select `name` from users where id =partner),(select `surname` from users where id =partner),(select ranking from users where id =partner) +(select ranking from users where id =partner),partnerAcceptance  FROM `inz`.`registrations` where tournamentid= ?;", (&val, ),
                                        ).unwrap().for_each(|row| {
                                        let result_set = row.unwrap();

                                        res.push(Registration {
                                            id: from_value(result_set.get(0).unwrap()),
                                            userid: from_value(result_set.get(1).unwrap()),
                                            tournamentid: from_value(result_set.get(2).unwrap()),
                                            paymenttype: from_value(result_set.get(3).unwrap()),
                                            paymentstatus: from_value(result_set.get(4).unwrap()),
                                            paymenttype2:from_value(result_set.get(5).unwrap()),
                                            paymentstatus2:from_value(result_set.get(6).unwrap()),
                                            approval: from_value(result_set.get(7).unwrap()),
                                            partner: from_value(result_set.get(8).unwrap()),
                                            name1: from_value(result_set.get(9).unwrap()),
                                            surname1: from_value(result_set.get(10).unwrap()),
                                            name2: from_value(result_set.get(11).unwrap()),
                                            surname2: from_value(result_set.get(12).unwrap()),
                                            rankingsum: from_value(result_set.get(13).unwrap()),
                                            partnerAcceptance: from_value(result_set.get(14).unwrap())
                                        });
                                    });
                                });
                                *response.body_mut() = serde_json::to_string(&res).unwrap().into();
                                return;
                            }


                            let mut res = Vec::new();

                            POOL.with(|poola| {
                                poola.get_conn().unwrap()
                                    .exec_iter(
                                        "SELECT `registrations`.`id`,`registrations`.`userid`,`registrations`.`tournamentid`,IF(userid=? or partner =?,`registrations`.`paymenttype`,'HIDDEN'),IF(userid=? or partner =?,`registrations`.`paymentstatus`,'HIDDEN'),IF(userid=? or partner =?,`registrations`.`paymenttype2`,'HIDDEN'),IF(userid=? or partner =?,`registrations`.`paymentstatus2`,'HIDDEN'),`registrations`.`approval`,`registrations`.`partner`,(select `name` from users where id =userid),(select `surname` from users where id =userid),(select `name` from users where id =partner),(select `surname` from users where id =partner),(select ranking from users where id =partner) +(select ranking from users where id =partner),partnerAcceptance FROM `inz`.`registrations` where tournamentid= ?;", ( id, id, id, id, id, id, id, id,&val)
                                    ).unwrap().for_each(|row| {
                                    let result_set = row.unwrap();

                                    res.push(Registration {
                                        id: from_value(result_set.get(0).unwrap()),
                                        userid: from_value(result_set.get(1).unwrap()),
                                        tournamentid: from_value(result_set.get(2).unwrap()),
                                        paymenttype: from_value(result_set.get(3).unwrap()),
                                        paymentstatus: from_value(result_set.get(4).unwrap()),
                                        paymenttype2:from_value(result_set.get(5).unwrap()),
                                        paymentstatus2:from_value(result_set.get(6).unwrap()),
                                        approval: from_value(result_set.get(7).unwrap()),
                                        partner: from_value(result_set.get(8).unwrap()),
                                        name1: from_value(result_set.get(9).unwrap()),
                                        surname1: from_value(result_set.get(10).unwrap()),
                                        name2: from_value(result_set.get(11).unwrap()),
                                        surname2: from_value(result_set.get(12).unwrap()),
                                        rankingsum: from_value(result_set.get(13).unwrap()),
                                        partnerAcceptance: from_value(result_set.get(14).unwrap())
                                    });
                                });
                            });
                            *response.body_mut() = serde_json::to_string(&res).unwrap().into();
                        } else {
                            let mut res = Vec::new();

                            POOL.with(|poola| {
                                poola.get_conn().unwrap()
                                    .exec_iter(
                                        "SELECT `registrations`.`id`,`registrations`.`userid`,`registrations`.`tournamentid`,`registrations`.`paymenttype`,`registrations`.`paymentstatus`,`registrations`.`paymenttype2`,`registrations`.`paymentstatus2`,`registrations`.`approval` ,`registrations`.`partner`,(select `name` from users where id =userid),(select `surname` from users where id =userid),(select `name` from users where id =partner),(select `surname` from users where id =partner) ,(select ranking from users where id =partner) +(select ranking from users where id =partner), partnerAcceptance FROM `inz`.`registrations` where tournamentid= ?;", (&val, ),
                                    ).unwrap().for_each(|row| {
                                    let result_set = row.unwrap();

                                    res.push(Registration {
                                        id: from_value(result_set.get(0).unwrap()),
                                        userid: from_value(result_set.get(1).unwrap()),
                                        tournamentid: from_value(result_set.get(2).unwrap()),
                                        paymenttype: from_value(result_set.get(3).unwrap()),
                                        paymentstatus: from_value(result_set.get(4).unwrap()),
                                        paymenttype2:from_value(result_set.get(5).unwrap()),
                                        paymentstatus2:from_value(result_set.get(6).unwrap()),
                                        approval: from_value(result_set.get(7).unwrap()),
                                        partner: from_value(result_set.get(8).unwrap()),
                                        name1: from_value(result_set.get(9).unwrap()),
                                        surname1: from_value(result_set.get(10).unwrap()),
                                        name2: from_value(result_set.get(11).unwrap()),
                                        surname2: from_value(result_set.get(12).unwrap()),
                                        rankingsum: from_value(result_set.get(13).unwrap()),
                                        partnerAcceptance: from_value(result_set.get(14).unwrap())
                                    });
                                });
                            });
                            *response.body_mut() = serde_json::to_string(&res).unwrap().into();
                        }
                    }
                });
            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::POST, "/admin/user") => {
            if req.headers().contains_key("Authorization") {
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();
                let byte_stream = hyper::body::to_bytes(req).await.unwrap();
                let s: HashMap<String, String> = serde_json::from_slice(&byte_stream).unwrap();
                let mut row: Option<Result<Row>> = None;
                POOL.with(|poola| {
                    let mut con = poola.get_conn().unwrap();
                    let mut result = con.exec_iter("Select id from users where role ='3' and id =(SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW());", (&token, )).unwrap();
                    let mut it = result.iter().unwrap();
                    row = it.next();
                    if row.is_none() {
                        *response.status_mut() = StatusCode::FORBIDDEN;
                        return;
                    }
                    if !s.contains_key("id") {
                        *response.body_mut() = Body::from("{\"error\":\"id is required\"}");
                        return;
                    }
                    let idi = s.get("id").unwrap();
                    if s.contains_key("name") {
                        poola.get_conn().unwrap().exec_drop("Update users set name =? where id = ?", (s.get("name"), idi)).unwrap();
                    }
                    if s.contains_key("surname") {
                        poola.get_conn().unwrap().exec_drop("Update users set surname =? where id = ?", (s.get("surname"), idi)).unwrap();
                    }
                    if s.contains_key("password") {
                        poola.get_conn().unwrap().exec_drop("Update users set password =? where id = ?", (hash(s.get("password").unwrap().to_string(), DEFAULT_COST - 6).unwrap(), idi)).unwrap();
                        poola.get_conn().unwrap().exec_drop("delete from sessions where user = ?", (idi,)).unwrap();
                    }
                    if s.contains_key("mail") {
                        poola.get_conn().unwrap().exec_drop("Update users set mail =? where id = ?", (s.get("mail"), idi)).unwrap();
                    }
                    if s.contains_key("phone") {
                        poola.get_conn().unwrap().exec_drop("Update users set phone =? where id = ?", (s.get("phone"), idi)).unwrap();
                    }
                    if s.contains_key("role") {
                        poola.get_conn().unwrap().exec_drop("Update users set role =? where id = ?", (s.get("role"), idi)).unwrap();
                    }
                });
            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::DELETE, "/admin/user") => {
            if req.headers().contains_key("Authorization") {
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();
                let byte_stream = hyper::body::to_bytes(req).await.unwrap();
                let s: HashMap<String, String> = serde_json::from_slice(&byte_stream).unwrap();
                let mut row: Option<Result<Row>> = None;
                POOL.with(|poola| {
                    let mut con = poola.get_conn().unwrap();
                    let mut result = con.exec_iter("Select id from users where role ='3' and id =(SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW());", (&token, )).unwrap();
                    let mut it = result.iter().unwrap();
                    row = it.next();
                    if row.is_none() {
                        *response.status_mut() = StatusCode::FORBIDDEN;
                        return;
                    }
                    if !s.contains_key("id") {
                        *response.body_mut() = Body::from("{\"error\":\"id is required\"}");
                        return;
                    }
                    poola.get_conn().unwrap().exec_drop("Update users set deleted =1 where id = ?", (&s.get("id"), )).unwrap();
                });
            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::GET, "/admin/users") => {
            if req.headers().contains_key("Authorization") {
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();
                let mut row: Option<Result<Row>> = None;
                POOL.with(|poola| {
                    let mut con = poola.get_conn().unwrap();
                    let mut result = con.exec_iter("Select id from users where role ='3' and id =(SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW());", (&token, )).unwrap();
                    let mut it = result.iter().unwrap();
                    row = it.next();
                    if row.is_none() {
                        *response.status_mut() = StatusCode::FORBIDDEN;
                        return;
                    }
                    let res = poola.get_conn().unwrap()
                        .query_map(
                            "SELECT `id`, `name`, `surname`, `role`, `login`, `mail`, `phone`,`deleted`, `ranking` from users ",
                            |(id, name, surname, role, login, mail, phone, deleted, ranking)| {
                                Usera { id, name, surname, role, login, mail, phone, deleted, ranking }
                            },
                        );
                    *response.body_mut() = serde_json::to_string(&res.unwrap()).unwrap().into();
                });
            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::DELETE, "/admin/tournament") => {
            if req.headers().contains_key("Authorization") {
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();
                let byte_stream = hyper::body::to_bytes(req).await.unwrap();
                let s: HashMap<String, String> = serde_json::from_slice(&byte_stream).unwrap();
                let mut row: Option<Result<Row>> = None;
                POOL.with(|poola| {
                    let mut con = poola.get_conn().unwrap();
                    let mut result = con.exec_iter("Select id from users where role ='3' and id =(SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW());", (&token, )).unwrap();
                    let mut it = result.iter().unwrap();
                    row = it.next();
                    if row.is_none() {
                        *response.status_mut() = StatusCode::FORBIDDEN;
                        return;
                    }
                    if !s.contains_key("id") {
                        *response.body_mut() = Body::from("{\"error\":\"id is required\"}");
                        return;
                    }
                    poola.get_conn().unwrap().exec_drop("Update tournaments set deleted =1 where id = ?", (&s.get("id"), )).unwrap();
                });
            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::POST, "/admin/tournament") => {
            if req.headers().contains_key("Authorization") {
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();
                let byte_stream = hyper::body::to_bytes(req).await.unwrap();
                let s: HashMap<String, String> = serde_json::from_slice(&byte_stream).unwrap();
                let mut row: Option<Result<Row>> = None;
                POOL.with(|poola| {
                    let mut con = poola.get_conn().unwrap();
                    let mut result = con.exec_iter("Select  id from users where role ='3' and id =(SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW());", (&token, )).unwrap();
                    let mut it = result.iter().unwrap();
                    row = it.next();
                    if row.is_none() {
                        *response.status_mut() = StatusCode::FORBIDDEN;
                        return;
                    }
                    if !s.contains_key("id") {
                        *response.body_mut() = Body::from("{\"error\":\"id is required\"}");
                        return;
                    }
                    if s.contains_key("name") {
                        poola.get_conn().unwrap().exec_drop("Update tournaments set name =? where id = ?", (s.get("name"), &s.get("id"))).unwrap();
                    }
                    if s.contains_key("typeOfLadder") {
                        poola.get_conn().unwrap().exec_drop("Update tournaments set typeOfLadder =? where id = ?", (s.get("typeOfLadder"), &s.get("id"))).unwrap();
                    }
                    if s.contains_key("pointsForTournament") {
                        poola.get_conn().unwrap().exec_drop("Update tournaments set pointsForTournament =? where id = ?", (s.get("pointsForTournament"), &s.get("id"))).unwrap();
                    }
                    if s.contains_key("places") {
                        poola.get_conn().unwrap().exec_drop("Update tournaments set places =? where id = ?", (s.get("places"), &s.get("id"))).unwrap();
                    }
                    if s.contains_key("currentRound") {
                        poola.get_conn().unwrap().exec_drop("Update tournaments set currentRound =? where id = ?", (s.get("currentRound"), &s.get("id"))).unwrap();
                    }
                    if s.contains_key("from") {
                        poola.get_conn().unwrap().exec_drop("Update tournaments set `from` =? where id = ? ", (s.get("from"), &s.get("id"))).unwrap();
                    }
                    if s.contains_key("to") {
                        poola.get_conn().unwrap().exec_drop("Update tournaments set `to` =? where id = ? ", (s.get("to"), &s.get("id"))).unwrap();
                    }
                    if s.contains_key("place") {
                        poola.get_conn().unwrap().exec_drop("Update tournaments set place =? where id = ? ", (s.get("place"), &s.get("id"))).unwrap();
                    }
                    if s.contains_key("categotry") {
                        poola.get_conn().unwrap().exec_drop("Update tournaments set categotry =? where id = ? ", (s.get("categotry"), &s.get("id"))).unwrap();
                    }
                    if s.contains_key("rang") {
                        poola.get_conn().unwrap().exec_drop("Update tournaments set rang =? where id = ? ", (s.get("rang"), &s.get("id"))).unwrap();
                    }
                    if s.contains_key("entryFee") {
                        poola.get_conn().unwrap().exec_drop("Update tournaments set entryFee =? where id = ? ", (s.get("entryFee"), &s.get("id"))).unwrap();
                    }
                    if s.contains_key("director") {
                        poola.get_conn().unwrap().exec_drop("Update tournaments set director =? where id = ? ", (s.get("director"), &s.get("id"))).unwrap();
                    }
                    if s.contains_key("phone") {
                        poola.get_conn().unwrap().exec_drop("Update tournaments set phone =? where id = ? ", (s.get("phone"), &s.get("id"))).unwrap();
                    }
                    if s.contains_key("entriesTo") {
                        poola.get_conn().unwrap().exec_drop("Update tournaments set entriesTo =? where id = ? ", (s.get("entriesTo"), &s.get("id"))).unwrap();
                    }
                    if s.contains_key("additionalInformations") {
                        poola.get_conn().unwrap().exec_drop("Update tournaments set additionalInformations =? where id = ? ", (s.get("additionalInformations"), &s.get("id"))).unwrap();
                    }
                    if s.contains_key("visibility") {
                        poola.get_conn().unwrap().exec_drop("Update tournaments set visibility =? where id = ? ", (s.get("visibility"), &s.get("id"))).unwrap();
                    }
                });
            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::GET, "/admin/tournaments") => {
            if req.headers().contains_key("Authorization") {
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();
                let mut row: Option<Result<Row>> = None;
                POOL.with(|poola| {
                    let mut con = poola.get_conn().unwrap();
                    let mut result = con.exec_iter("Select  id from users where role ='3' and id =(SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW());", (&token, )).unwrap();
                    let mut it = result.iter().unwrap();
                    row = it.next();
                    if row.is_none() {
                        *response.status_mut() = StatusCode::FORBIDDEN;
                        return;
                    }
                    let mut res = Vec::new();
                    poola.get_conn().unwrap()
                        .query_iter(
                            "SELECT id, name, typeOfLadder, pointsForTournament, places,  creator,approved,deleted, state, currentRound,`from`, `to`, place, categotry, rang, entryFee, director, phone,entriesTo, additionalInformations,visibility,image is not NULL from tournaments ",
                        ).unwrap().for_each(|row| {
                        let result_set = row.unwrap();
                        res.push(tournamenta { id: result_set.get(0).unwrap(), name: result_set.get(1).unwrap(), typeOfLadder: result_set.get(2).unwrap(), places: result_set.get(4).unwrap(), creator: result_set.get(5).unwrap(), pointsForTournament: result_set.get(3).unwrap(), approved: result_set.get(6).unwrap(), deleted: result_set.get(7).unwrap(), state: result_set.get(8).unwrap(), currentRound: result_set.get(9).unwrap(), from: result_set.get(10).unwrap(), to: result_set.get(11).unwrap(), place: result_set.get(12).unwrap(), categotry: result_set.get(13).unwrap(), rang: result_set.get(14).unwrap(), entryFee: result_set.get(15).unwrap(), director: result_set.get(16).unwrap(), phone: result_set.get(17).unwrap(), entriesTo: result_set.get(18).unwrap(), additionalInformations: result_set.get(19).unwrap(), visibility: result_set.get(20).unwrap(), hasImage: result_set.get(21).unwrap() });
                    });

                    *response.body_mut() = serde_json::to_string(&res).unwrap().into();
                });
            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::POST, "/admin/approveTurnament") => {
            if req.headers().contains_key("Authorization") {
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();
                let byte_stream = hyper::body::to_bytes(req).await.unwrap();
                let s: HashMap<String, String> = serde_json::from_slice(&byte_stream).unwrap();
                let mut row: Option<Result<Row>> = None;
                let mut row2: Option<Result<Row>> = None;
                if s.contains_key("id") {
                    POOL.with(|poola| {
                        let mut con = poola.get_conn().unwrap();
                        let mut result = con.exec_iter("Select  id from users where role ='3' and id =(SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW());", (&token, )).unwrap();
                        let mut it = result.iter().unwrap();
                        row = it.next();
                        let mut con2 = poola.get_conn().unwrap();
                        let mut result2 = con2.exec_iter("Select approved from tournaments where id =?;", (&s.get("id").unwrap(), )).unwrap();
                        let mut it2 = result2.iter().unwrap();
                        row2 = it2.next();
                    });
                    if row.is_none() {
                        *response.status_mut() = StatusCode::FORBIDDEN;
                        return Ok(response);
                    }
                    let urow2 = row2.unwrap().unwrap();
                    let approved: i32 = urow2.get(0).unwrap();
                    if approved == 1 {
                        POOL.with(|poola| {
                            poola.get_conn().unwrap().exec_drop("Update tournaments set approved =2 where id = ?", (s.get("id").unwrap(), )).unwrap();
                        });
                    } else {
                        *response.status_mut() = StatusCode::BAD_REQUEST;
                        return Ok(response);
                    }
                } else {
                    *response.body_mut() = "{\"error\":\"missing id\"}".into();
                }
            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::POST, "/admin/rejectTurnament") => {
            if req.headers().contains_key("Authorization") {
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();
                let byte_stream = hyper::body::to_bytes(req).await.unwrap();
                let s: HashMap<String, String> = serde_json::from_slice(&byte_stream).unwrap();
                let mut row: Option<Result<Row>> = None;
                let mut row2: Option<Result<Row>> = None;
                if s.contains_key("id") {
                    POOL.with(|poola| {
                        let mut con = poola.get_conn().unwrap();
                        let mut result = con.exec_iter("Select  id from users where role ='3' and id =(SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW());", (&token, )).unwrap();
                        let mut it = result.iter().unwrap();
                        row = it.next();
                        let mut con2 = poola.get_conn().unwrap();
                        let mut result2 = con2.exec_iter("Select approved from tournaments where id =?;", (&s.get("id").unwrap(), )).unwrap();
                        let mut it2 = result2.iter().unwrap();
                        row2 = it2.next();
                    });
                    if row.is_none() {
                        *response.status_mut() = StatusCode::FORBIDDEN;
                        return Ok(response);
                    }
                    let urow2 = row2.unwrap().unwrap();
                    let approved: i32 = urow2.get(0).unwrap();
                    if approved == 1 {
                        POOL.with(|poola| {
                            poola.get_conn().unwrap().exec_drop("Update tournaments set approved =3 where id = ?", (s.get("id").unwrap(), )).unwrap();
                        });
                    } else {
                        *response.status_mut() = StatusCode::BAD_REQUEST;
                        return Ok(response);
                    }
                } else {
                    *response.body_mut() = "{\"error\":\"missing id\"}".into();
                }
            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::POST, "/registration/payedUsingCash") => {
            if req.headers().contains_key("Authorization") {
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();
                let byte_stream = hyper::body::to_bytes(req).await.unwrap();
                let s: HashMap<String, String> = serde_json::from_slice(&byte_stream).unwrap();
                if !s.contains_key("id") || !s.contains_key("ownerOrInvited"){
                    *response.body_mut() = "{\"error\":\"id and ownerOrInvited is required\"}".into();
                    return Ok(response);
                }

                let mut row: Option<Result<Row>> = None;
                let mut row2: Option<Result<Row>> = None;
                let mut row3: Option<Result<Row>> = None;
                POOL.with(|poola| {
                    let mut con = poola.get_conn().unwrap();
                    let mut result = con.exec_iter("Select id, role from users where (role='2' or role='3' )and id =(SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW());", (&token, )).unwrap();
                    let mut it = result.iter().unwrap();
                    row = it.next();
                    let mut con2 = poola.get_conn().unwrap();
                    let mut result2 = con2.exec_iter("Select paymenttype,tournamentid,paymenttype2 from registrations where id =?;", (&s.get("id"), )).unwrap();
                    let mut it2 = result2.iter().unwrap();
                    row2 = it2.next();
                });
                if row.is_none() {
                    *response.status_mut() = StatusCode::FORBIDDEN;
                    return Ok(response);
                }
                if row2.is_none() {
                    *response.status_mut() = StatusCode::NOT_FOUND;
                    return Ok(response);
                }
                let urow = row.unwrap().unwrap();
                let urow2 = row2.unwrap().unwrap();
                let id: i32 = urow.get(0).unwrap();
                let role: String = urow.get(1).unwrap();
                let paymenttype: String = urow2.get(0).unwrap();
                let tournamentid: String = urow2.get(1).unwrap();
                let paymenttype2: String = urow2.get(2).unwrap();

                if role == "2" {
                    POOL.with(|poola| {
                        let mut con3 = poola.get_conn().unwrap();
                        let mut result3 = con3.exec_iter("Select creator from tournaments where id = ?;", (&tournamentid, )).unwrap();
                        let mut it3 = result3.iter().unwrap();
                        row3 = it3.next();
                    });
                    let urow3 = row3.unwrap().unwrap();
                    let creator: i32 = urow3.get(0).unwrap();
                    if creator != id {
                        *response.status_mut() = StatusCode::NOT_FOUND;
                        return Ok(response);
                    }
                }
                if (s.get("ownerOrInvited").unwrap() == "owner") {
                    if paymenttype == "cash" {
                        POOL.with(|poola| {
                            poola.get_conn().unwrap().exec_drop("Update registrations set paymentstatus ='DONE' where id = ?", (&s.get("id"), )).unwrap();
                        });
                    } else {
                        *response.status_mut() = StatusCode::BAD_REQUEST;
                        return Ok(response);
                    }
                }
                if (s.get("ownerOrInvited").unwrap() == "invited") {
                    if paymenttype2 == "cash" {
                        POOL.with(|poola| {
                            poola.get_conn().unwrap().exec_drop("Update registrations set paymentstatus2 ='DONE' where id = ?", (&s.get("id"), )).unwrap();
                        });
                    } else {
                        *response.status_mut() = StatusCode::BAD_REQUEST;
                        return Ok(response);
                    }
                }

            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::GET, "/registration/paymentstatus") => {
            if req.headers().contains_key("Authorization") {
                let query: &str = req.uri().query().unwrap();
                let mut splited = query.split("=");
                let id = splited.next().unwrap();
                let val = splited.next().unwrap();
                if id != "id" {
                    *response.body_mut() = "{\"error\":\"id required\"}".into();
                    return Ok(response);
                }
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();
                let mut row: Option<Result<Row>> = None;
                let mut row2: Option<Result<Row>> = None;
                POOL.with(|poola| {
                    let mut con = poola.get_conn().unwrap();
                    let mut result = con.exec_iter("Select id, role from users where id =(SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW());", (&token, )).unwrap();
                    let mut it = result.iter().unwrap();
                    row = it.next();
                    if row.is_none() {
                        *response.status_mut() = StatusCode::FORBIDDEN;
                        return;
                    }
                    let mut con2 = poola.get_conn().unwrap();
                    let mut result2 = con2.exec_iter("Select paymentstatus, paymentreference, userid, paymenttype, paymentstatus2, paymentreference2, paymenttype2, partner from registrations where id =?;", (&val, )).unwrap();
                    let mut it2 = result2.iter().unwrap();
                    row2 = it2.next();
                });
                if row2.is_none() {
                    *response.status_mut() = StatusCode::NOT_FOUND;
                    return Ok(response);
                }
                let urow = row.unwrap().unwrap();
                let urow2 = row2.unwrap().unwrap();
                let id: i32 = urow.get(0).unwrap();
                let role: String = urow.get(1).unwrap();
                let paymentstatus: String = urow2.get(0).unwrap();
                let paymentreference: String = urow2.get(1).unwrap();
                let userid: i32 = urow2.get(2).unwrap();
                let paymenttype: String = urow2.get(3).unwrap();
                let paymentstatus2: String = urow2.get(4).unwrap();
                let paymentreference2: String = urow2.get(5).unwrap();
                let paymenttype2: String = urow2.get(6).unwrap();
                let partner: i32 = urow2.get(7).unwrap();
                if role == "1" || role == "2" {
                    if userid != id && partner != id {
                        *response.status_mut() = StatusCode::NOT_FOUND;
                        return Ok(response);
                    }
                }
                let mut respb= String::from("");
                if paymentstatus == "PENDING" && paymenttype != "cash" {
                    if paymenttype == "btc" {
                        let client = Client::new();
                        let req = Request::builder()
                            .method(Method::GET)
                            .uri("http://10.1.6.101:8082/api/v1/stores/5QsjqLbqHNgiP4GnAqy2apKaTcxWDj7zFFSpNKZGEseR/invoices/".to_owned() + &paymentreference)
                            .header("content-type", "application/json")
                            .header("Authorization", "token 8b1d0a2a653e9f40ac402dbce66fccb3ccd1b9c5").body(Body::empty()).unwrap();
                        let resp = client.request(req).await.unwrap();
                        let parsed: serde_json::Value = serde_json::from_slice(hyper::body::to_bytes(resp.into_body()).await.unwrap().as_ref()).unwrap();
                        let stat: String = parsed.get("status").unwrap().as_str().unwrap().into();
                        if stat == "New" {
                            respb = "{\"status\":\"PENDING\"".to_string();
                        } else {
                            if stat == "Settled" {
                                respb ="{\"status\":\"DONE\"".to_string();
                                POOL.with(|poola| {
                                    poola.get_conn().unwrap().exec_drop("Update registrations set paymentstatus ='DONE' where id = ?", (val, )).unwrap();
                                });
                            } else {
                                if stat == "Processing" {
                                    respb="{\"status\":\"PROCESSING\"".to_string();
                                } else {
                                    if stat == "Expired" {
                                        respb="{\"status\":\"EXPIRED\"".to_string();
                                        POOL.with(|poola| {
                                            poola.get_conn().unwrap().exec_drop("Update registrations set paymentstatus ='EXPIRED' where id = ?", (val, )).unwrap();
                                        });
                                    } else {
                                        respb="{\"status\":\"".to_owned() + &stat + "\"";
                                        POOL.with(|poola| {
                                            poola.get_conn().unwrap().exec_drop("Update registrations set paymentstatus =? where id = ?", (stat, val)).unwrap();
                                        });
                                    }
                                }
                            }
                        }
                    }
                } else {
                    respb="{\"status\":\"".to_owned() + &paymentstatus + "\"";
                }
                if paymentstatus2 == "PENDING" && paymenttype2 != "cash" {
                    if paymenttype2 == "btc" {
                        let client = Client::new();
                        let req = Request::builder()
                            .method(Method::GET)
                            .uri("http://10.1.6.101:8082/api/v1/stores/5QsjqLbqHNgiP4GnAqy2apKaTcxWDj7zFFSpNKZGEseR/invoices/".to_owned() + &paymentreference2)
                            .header("content-type", "application/json")
                            .header("Authorization", "token 8b1d0a2a653e9f40ac402dbce66fccb3ccd1b9c5").body(Body::empty()).unwrap();
                        let resp = client.request(req).await.unwrap();
                        let parsed: serde_json::Value = serde_json::from_slice(hyper::body::to_bytes(resp.into_body()).await.unwrap().as_ref()).unwrap();
                        let stat: String = parsed.get("status").unwrap().as_str().unwrap().into();
                        if stat == "New" {
                            respb += ",\"status2\":\"PENDING\"}";
                        } else {
                            if stat == "Settled" {
                                respb +=",\"status2\":\"DONE\"}";
                                POOL.with(|poola| {
                                    poola.get_conn().unwrap().exec_drop("Update registrations set paymentstatus2 ='DONE' where id = ?", (val, )).unwrap();
                                });
                            } else {
                                if stat == "Processing" {
                                    respb+=",\"status2\":\"PROCESSING\"}";
                                } else {
                                    if stat == "Expired" {
                                        respb+=",\"status2\":\"EXPIRED\"}";
                                        POOL.with(|poola| {
                                            poola.get_conn().unwrap().exec_drop("Update registrations set paymentstatus2 ='EXPIRED' where id = ?", (val, )).unwrap();
                                        });
                                    } else {
                                        respb+= &*(",\"status2\":\"".to_owned() + &stat + "\"}");
                                        POOL.with(|poola| {
                                            poola.get_conn().unwrap().exec_drop("Update registrations set paymentstatus2 =? where id = ?", (stat, val)).unwrap();
                                        });
                                    }
                                }
                            }
                        }
                    }
                } else {
                    respb+= &*(",\"status2\":\"".to_owned() + &paymentstatus + "\"}");
                }

                *response.body_mut() = respb.into();
            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::PUT, "/registration") => {
            if req.headers().contains_key("Authorization") {
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();
                let byte_stream = hyper::body::to_bytes(req).await.unwrap();
                let s: HashMap<String, String> = serde_json::from_slice(&byte_stream).unwrap();
                let mut row: Option<Result<Row>> = None;
                let mut row2: Option<Result<Row>> = None;
                let mut row3: Option<Result<Row>> = None;
                if s.contains_key("tournament") && s.contains_key("partner") {
                    let tournament = s.get("tournament").unwrap().to_string();
                    let partner = s.get("partner").unwrap().to_string();

                    POOL.with(|poola| {
                        let mut con = poola.get_conn().unwrap();

                        let mut result = con.exec_iter("Select id from users where id =(SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW());", (&token, )).unwrap();
                        let mut it = result.iter().unwrap();
                        row = it.next();
                        let mut con2 = poola.get_conn().unwrap();

                        let mut result2 = con2.exec_iter("Select id, entryFee from tournaments where state = 0 and id =?;", (&tournament, )).unwrap();
                        let mut it2 = result2.iter().unwrap();
                        row2 = it2.next();
                        let mut con3 = poola.get_conn().unwrap();

                        let mut result3 = con3.exec_iter("SELECT id FROM inz.users where id= ?;", (&partner, )).unwrap();
                        let mut it3 = result3.iter().unwrap();
                        row3 = it3.next();
                    });
                    if row.is_none() {
                        *response.status_mut() = StatusCode::FORBIDDEN;
                        return Ok(response);
                    }
                    if row2.is_none() {
                        *response.status_mut() = StatusCode::BAD_REQUEST;
                        return Ok(response);
                    }
                    if row3.is_none() {
                        *response.status_mut() = StatusCode::NOT_FOUND;
                        return Ok(response);
                    }
                    let urow = row.unwrap().unwrap();
                    let urow2 = row2.unwrap().unwrap();
                    let id: i32 = urow.get(0).unwrap();
                    POOL.with(|poola| {
                        let nid = "{\"id\":\"".to_owned() + &poola.get_conn().unwrap().exec_iter("INSERT INTO `inz`.`registrations`(`userid`,`tournamentid`,`paymenttype`,`paymentstatus`,`approval`,`paymentreference`,`partner`,`partnerAcceptance`,`paymenttype2`,`paymentstatus2`,`paymentreference2`,`informed`)VALUES(?,?,'','NOTSTARTED',0,'',?,0,'','NOTSTARTED','',0);", (id, tournament, partner)).unwrap().last_insert_id().unwrap().to_string() + "\"}";
                        *response.body_mut() = nid.into();
                    });
                } else {
                    *response.body_mut() = "{\"error\":\"not all fields\"}".into();
                }
            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::POST, "/payForRegistration") => {
            if req.headers().contains_key("Authorization") {
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap().to_string();

                let token = tmp.next().unwrap().to_string();
                let byte_stream = hyper::body::to_bytes(req).await.unwrap();
                let s: HashMap<String, String> = serde_json::from_slice(&byte_stream).unwrap();
                if !s.contains_key("id")||!s.contains_key("paymentmethod") {
                    *response.body_mut() = "id and paymentmethod is required".into();
                }else {
                    let paymentmethod = s.get("paymentmethod").unwrap().to_string();
                    let rid = s.get("id").unwrap().to_string();
                    let mut isowner = false;
                    let mut isinvited = false;
                    let mut fee = -1;
                    POOL.with(|poola| {
                        let mut con = poola.get_conn().unwrap();
                        if aa != "Bearer" {
                            *response.status_mut() = StatusCode::UNAUTHORIZED;
                            return;
                        }

                        let mut result = con.exec_iter("Select id from users where id =(SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW());", (&token, )).unwrap();
                        let mut it = result.iter().unwrap();
                        let row = it.next();
                        if row.is_none() {
                            *response.status_mut() = StatusCode::FORBIDDEN;
                            return;
                        }
                        let uid: i32 = row.unwrap().unwrap().get(0).unwrap();
                        let mut con2 = poola.get_conn().unwrap();
                        let mut result2 = con2.exec_iter("SELECT id FROM inz.registrations where userid=? and id = ? and approval =1 and paymentstatus != 'PENDING' and paymentstatus != 'DONE'", (&uid, &rid)).unwrap();
                        let mut it2 = result2.iter().unwrap();
                        let row2 = it2.next();
                        if !row2.is_none() {
                            isowner = true;
                        }
                        let mut con3 = poola.get_conn().unwrap();
                        let mut result3 = con3.exec_iter("SELECT id FROM inz.registrations where partner=? and id = ? and approval =1 and paymentstatus2 != 'PENDING' and paymentstatus2 != 'DONE'", (&uid, &rid)).unwrap();
                        let mut it3 = result3.iter().unwrap();
                        let row3 = it3.next();
                        if !row3.is_none() {
                            isinvited = true;
                        }
                        if isowner == false && isinvited == false {
                            *response.status_mut() = StatusCode::BAD_REQUEST;
                            return;
                        }
                        let mut conn4 = poola.get_conn().unwrap();
                        let mut result4 = conn4.exec_iter("SELECT entryFee FROM inz.tournaments where id = (SELECT tournamentid FROM inz.registrations where id = ?)", (&rid, )).unwrap();
                        let mut it4 = result4.iter().unwrap();
                        let row4 = it4.next();
                        fee = row4.unwrap().unwrap().get(0).unwrap();
                    });
                    if paymentmethod == "btc" {
                        let client = Client::new();
                        let req = Request::builder()
                            .method(Method::POST)
                            .uri("http://10.1.6.101:8082/api/v1/stores/5QsjqLbqHNgiP4GnAqy2apKaTcxWDj7zFFSpNKZGEseR/invoices")
                            .header("content-type", "application/json")
                            .header("X-Forwarded-Host", "btcpay.dragonmaster.pl")
                            .header("X-Forwarded-Proto", "https")
                            .header("Authorization", "token 8b1d0a2a653e9f40ac402dbce66fccb3ccd1b9c5")
                            .body(Body::from("{\"metadata\": {\"orderId\": \"id123\"},\"checkout\": {\"speedPolicy\": \"LowMediumSpeed\",\"redirectURL\":\"https://example.com\"},\"amount\": \"".to_owned() + &*fee.to_string() + "\",\"currency\": \"PLN\"}")).unwrap();
                        let resp = client.request(req).await.unwrap();
                        let parsed: serde_json::Value = serde_json::from_slice(hyper::body::to_bytes(resp.into_body()).await.unwrap().as_ref()).unwrap();
                        POOL.with(|poola| {
                            let tmp: String = parsed.get("id").unwrap().as_str().unwrap().into();
                            if isowner {
                                poola.get_conn().unwrap().exec_iter("Update registrations set paymenttype = 'btc',paymentstatus = 'PENDING', paymentreference=? where id = ? ;", (&tmp, rid)).unwrap();
                            } else {
                                poola.get_conn().unwrap().exec_iter("Update registrations set paymenttype2 = 'btc',paymentstatus2 = 'PENDING',paymentreference2=? where id = ? ;", (&tmp, rid)).unwrap();
                            }
                            let mut checkout: String = parsed.get("checkoutLink").unwrap().as_str().unwrap().into();
                            //checkout = checkout.replace("http://10.1.6.101:8082/", "https://btcpay.dragonmaster.pl/");
                            *response.body_mut() = Body::from("{\"url\":\"".to_owned() + &*checkout + "\"}");
                        });
                    } else {
                        if paymentmethod == "cash" {
                            POOL.with(|poola| {
                                if isowner {
                                    poola.get_conn().unwrap().exec_iter("Update registrations set paymenttype = 'cash',paymentstatus = 'PENDING', paymentreference='N/A' where id = ? ;", (rid, )).unwrap();
                                } else {
                                    poola.get_conn().unwrap().exec_iter("Update registrations set paymenttype2 = 'cash',paymentstatus2 = 'PENDING',paymentreference2='N/A' where id = ? ;", (rid, )).unwrap();
                                }
                                *response.body_mut() = "{}".into();
                            });
                        } else {
                            *response.body_mut() = "{\"error\":\"bad payment method\"}".into();
                        }
                    }
                }
            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::GET, "/pendingApprovals") => {
            if req.headers().contains_key("Authorization") {
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();
                POOL.with(|poola| {
                    let mut con = poola.get_conn().unwrap();
                    let mut result = con.exec_iter("SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW();", (&token, )).unwrap();
                    let mut it = result.iter().unwrap();
                    let row = it.next();
                    let urow = row.unwrap().unwrap();
                    let id: i32 = urow.get(0).unwrap();


                    let mut res = Vec::new();
                    poola.get_conn().unwrap()
                        .exec_iter(
                            "SELECT id, userid, tournamentid from registrations where partner =? and partnerAcceptance = 0", (id, ),
                        ).unwrap().for_each(|row| {
                        let result_set = row.unwrap();
                        res.push(pendingApprovals { id: from_value(result_set.get(0).unwrap()), inviter: from_value(result_set.get(1).unwrap()), tournament: from_value(result_set.get(2).unwrap()) });
                    });
                    *response.body_mut() = serde_json::to_string(&res).unwrap().into();
                });
            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::POST, "/acceptInvite") => {
            if req.headers().contains_key("Authorization") {
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();
                let byte_stream = hyper::body::to_bytes(req).await.unwrap();
                let s: HashMap<String, String> = serde_json::from_slice(&byte_stream).unwrap();
                if(s.contains_key("id")) {
                    POOL.with(|poola| {
                        let mut con = poola.get_conn().unwrap();
                        let mut result = con.exec_iter("SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW();", (&token, )).unwrap();
                        let mut it = result.iter().unwrap();
                        let row = it.next();
                        let urow = row.unwrap().unwrap();
                        let id: i32 = urow.get(0).unwrap();
                        poola.get_conn().unwrap().exec_drop("Update registrations set partnerAcceptance =1 where partner = ? and id = ?", (id, s.get("id").unwrap().to_string())).unwrap();
                        *response.body_mut() = "{}".into();
                    });
                }else{
                    *response.body_mut() = "id is required".into();
                }
            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::POST, "/rejectInvite") => {
            if req.headers().contains_key("Authorization") {
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();
                let byte_stream = hyper::body::to_bytes(req).await.unwrap();
                let s: HashMap<String, String> = serde_json::from_slice(&byte_stream).unwrap();
                if(s.contains_key("id")) {
                    POOL.with(|poola| {
                        let mut con = poola.get_conn().unwrap();
                        let mut result = con.exec_iter("SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW();", (&token, )).unwrap();
                        let mut it = result.iter().unwrap();
                        let row = it.next();
                        let urow = row.unwrap().unwrap();
                        let id: i32 = urow.get(0).unwrap();

                        poola.get_conn().unwrap().exec_drop("delete from registrations where partner = ? and id = ?", (id, s.get("id").unwrap().to_string())).unwrap();
                        *response.body_mut() = "{}".into();
                    });
                }else{
                    *response.body_mut() = "id is required".into();
                }
            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::POST, "/tournament") => {
            if req.headers().contains_key("Authorization") {
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();
                let byte_stream = hyper::body::to_bytes(req).await.unwrap();
                let s: HashMap<String, String> = serde_json::from_slice(&byte_stream).unwrap();
                POOL.with(|poola| {
                    let mut con = poola.get_conn().unwrap();
                    let mut result = con.exec_iter("Select role, id from users where id =(SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW());", (&token, )).unwrap();
                    let mut it = result.iter().unwrap();
                    let row = it.next();
                    if row.is_none() {
                        *response.status_mut() = StatusCode::FORBIDDEN;
                        return;
                    }
                    let urow = row.unwrap().unwrap();
                    let role: String = urow.get(0).unwrap();
                    let id: i32 = urow.get(1).unwrap();
                    if role == "1" {
                        *response.status_mut() = StatusCode::FORBIDDEN;
                        return;
                    }
                    if s.contains_key("id") {
                        let tid = s.get("id").unwrap().to_string();
                        if role != "3" {
                            let creator: i32 = poola.get_conn().unwrap().exec_first("Select creator from tournaments where id = ?", (&tid, )).unwrap().unwrap();
                            if creator != id {
                                *response.status_mut() = StatusCode::FORBIDDEN;
                                return;
                            }
                        }
                        if s.contains_key("name") {
                            poola.get_conn().unwrap().exec_drop("Update tournaments set name =? where id = ? and deleted =0", (s.get("name"), &tid)).unwrap();
                        }
                        if s.contains_key("typeOfLadder") {
                            poola.get_conn().unwrap().exec_drop("Update tournaments set typeOfLadder =? where id = ? and deleted =0", (s.get("typeOfLadder"), &tid)).unwrap();
                        }
                        if s.contains_key("pointsForTournament") {
                            poola.get_conn().unwrap().exec_drop("Update tournaments set pointsForTournament =? where id = ? and deleted =0", (s.get("pointsForTournament"), &tid)).unwrap();
                        }
                        if s.contains_key("places") {
                            poola.get_conn().unwrap().exec_drop("Update tournaments set places =? where id = ? and deleted =0", (s.get("places"), &tid)).unwrap();
                        }
                        if s.contains_key("currentRound") {
                            poola.get_conn().unwrap().exec_drop("Update tournaments set currentRound =? where id = ? and deleted =0", (s.get("currentRound"), &tid)).unwrap();
                        }
                        if s.contains_key("from") {
                            poola.get_conn().unwrap().exec_drop("Update tournaments set `from` =? where id = ? and deleted =0", (s.get("from"), &tid)).unwrap();
                        }
                        if s.contains_key("to") {
                            poola.get_conn().unwrap().exec_drop("Update tournaments set `to` =? where id = ? and deleted =0", (s.get("to"), &tid)).unwrap();
                        }
                        if s.contains_key("place") {
                            poola.get_conn().unwrap().exec_drop("Update tournaments set place =? where id = ? and deleted =0", (s.get("place"), &tid)).unwrap();
                        }
                        if s.contains_key("categotry") {
                            poola.get_conn().unwrap().exec_drop("Update tournaments set categotry =? where id = ? and deleted =0", (s.get("categotry"), &tid)).unwrap();
                        }
                        if s.contains_key("rang") {
                            poola.get_conn().unwrap().exec_drop("Update tournaments set rang =? where id = ? and deleted =0", (s.get("rang"), &tid)).unwrap();
                        }
                        if s.contains_key("entryFee") {
                            poola.get_conn().unwrap().exec_drop("Update tournaments set entryFee =? where id = ? and deleted =0", (s.get("entryFee"), &tid)).unwrap();
                        }
                        if s.contains_key("director") {
                            poola.get_conn().unwrap().exec_drop("Update tournaments set director =? where id = ? and deleted =0", (s.get("director"), &tid)).unwrap();
                        }
                        if s.contains_key("phone") {
                            poola.get_conn().unwrap().exec_drop("Update tournaments set phone =? where id = ? and deleted =0", (s.get("phone"), &tid)).unwrap();
                        }
                        if s.contains_key("entriesTo") {
                            poola.get_conn().unwrap().exec_drop("Update tournaments set entriesTo =? where id = ? and deleted =0", (s.get("entriesTo"), &tid)).unwrap();
                        }
                        if s.contains_key("additionalInformations") {
                            poola.get_conn().unwrap().exec_drop("Update tournaments set additionalInformations =? where id = ? and deleted =0", (s.get("additionalInformations"), &tid)).unwrap();
                        }
                        if s.contains_key("visibility") && s.get("visibility").unwrap() =="TRUE" {
                            poola.get_conn().unwrap().exec_drop("Update tournaments set visibility =? where id = ? and deleted =0", (s.get("visibility"), &tid)).unwrap();
                        }

                        *response.body_mut() = "{}".into();
                    } else {
                        *response.body_mut() = "{\"error\":\"not all fields\"}".into();
                    }
                });
            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::GET, "/tournament") => {

            let query: &str = req.uri().query().unwrap();
            let mut splited = query.split("=");

            let id = splited.next().unwrap();
            let val = splited.next().unwrap();
            if id != "id" {
                *response.body_mut() = "{\"error\":\"id required\"}".into();
                return Ok(response);
            }
            if (req.headers().contains_key("Authorization")) {
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();
                POOL.with(|poola| {
                    let mut con = poola.get_conn().unwrap();
                    let mut result = con.exec_iter("Select  id from users where id =(SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW());", (&token, )).unwrap();
                    let mut it = result.iter().unwrap();
                    let row = it.next();
                    if row.is_none() {
                        *response.status_mut() = StatusCode::FORBIDDEN;
                        return;
                    }
                    let urow = row.unwrap().unwrap();
                    let id: i32 = urow.get(0).unwrap();
                    let mut res = Vec::new();

                    poola.get_conn().unwrap()
                        .exec_iter(
                            "SELECT id, name, typeOfLadder, pointsForTournament, places, creator,approved, state, currentRound,`from`, `to`, place, categotry, rang, entryFee, director, phone,entriesTo, additionalInformations, visibility,image is not NULL from tournaments where deleted =0 and id =? and (visibility = 'TRUE' or creator=?)", (val, id)
                        ).unwrap().for_each(|row| {
                        let result_set = row.unwrap();
                        use time::Date;

                        res.push(tournament {
                            id: from_value(result_set.get(0).unwrap()),
                            name: from_value(result_set.get(1).unwrap()),
                            typeOfLadder: from_value(result_set.get(2).unwrap()),
                            places: from_value(result_set.get(4).unwrap()),
                            creator: from_value(result_set.get(5).unwrap()),
                            pointsForTournament: from_value(result_set.get(3).unwrap()),
                            approved: from_value(result_set.get(6).unwrap()),
                            state: from_value(result_set.get(7).unwrap()),
                            currentRound: from_value(result_set.get(8).unwrap()),
                            from: from_value::<Date>(result_set.get(9).unwrap()).to_string(),
                            to: from_value::<Date>(result_set.get(10).unwrap()).to_string(),
                            place: from_value(result_set.get(11).unwrap()),
                            categotry: from_value(result_set.get(12).unwrap()),
                            rang: from_value(result_set.get(13).unwrap()),
                            entryFee: from_value(result_set.get(14).unwrap()),
                            director: from_value(result_set.get(15).unwrap()),
                            phone: from_value(result_set.get(16).unwrap()),
                            entriesTo: from_value::<Date>(result_set.get(17).unwrap()).to_string(),
                            additionalInformations: from_value(result_set.get(18).unwrap()),
                            visibility: from_value(result_set.get(19).unwrap()),
                            hasImage: from_value(result_set.get(20).unwrap())
                        });
                    });

                    *response.body_mut() = serde_json::to_string(&res[0]).unwrap().into();
                });


            }else{
                POOL.with(|poola| {
                    let mut res = Vec::new();

                    poola.get_conn().unwrap()
                        .exec_iter(
                            "SELECT id, name, typeOfLadder, pointsForTournament, places, creator,approved, state, currentRound,`from`, `to`, place, categotry, rang, entryFee, director, phone,entriesTo, additionalInformations, visibility,image is not NULL from tournaments where deleted =0 and id =? and visibility = 'TRUE'", (val, )
                        ).unwrap().for_each(|row| {
                        let result_set = row.unwrap();
                        use time::Date;

                        res.push(tournament {
                            id: from_value(result_set.get(0).unwrap()),
                            name: from_value(result_set.get(1).unwrap()),
                            typeOfLadder: from_value(result_set.get(2).unwrap()),
                            places: from_value(result_set.get(4).unwrap()),
                            creator: from_value(result_set.get(5).unwrap()),
                            pointsForTournament: from_value(result_set.get(3).unwrap()),
                            approved: from_value(result_set.get(6).unwrap()),
                            state: from_value(result_set.get(7).unwrap()),
                            currentRound: from_value(result_set.get(8).unwrap()),
                            from: from_value::<Date>(result_set.get(9).unwrap()).to_string(),
                            to: from_value::<Date>(result_set.get(10).unwrap()).to_string(),
                            place: from_value(result_set.get(11).unwrap()),
                            categotry: from_value(result_set.get(12).unwrap()),
                            rang: from_value(result_set.get(13).unwrap()),
                            entryFee: from_value(result_set.get(14).unwrap()),
                            director: from_value(result_set.get(15).unwrap()),
                            phone: from_value(result_set.get(16).unwrap()),
                            entriesTo: from_value::<Date>(result_set.get(17).unwrap()).to_string(),
                            additionalInformations: from_value(result_set.get(18).unwrap()),
                            visibility: from_value(result_set.get(19).unwrap()),
                            hasImage: from_value(result_set.get(20).unwrap())
                        });
                    });

                    *response.body_mut() = serde_json::to_string(&res[0]).unwrap().into();
                });
            }
        }
        (&Method::POST, "/tournaments/search") => {
            let byte_stream = hyper::body::to_bytes(req).await.unwrap();
            let s: HashMap<String, String> = serde_json::from_slice(&byte_stream).unwrap();
            if !s.contains_key("from") && !s.contains_key("to"){
                return Ok(response);
            }
            POOL.with(|poola| {
                let mut res = Vec::new();
                let mut query = "".to_string();
                let mut parmams = Vec::new();
                if s.contains_key("from") {
                    query=(query.to_owned()+" and `from` > ?").to_string();
                    parmams.push(s.get("from").unwrap());
                }
                if  s.contains_key("to"){
                    query=(query.to_owned()+" and `to` < ?").to_string();
                    parmams.push(s.get("to").unwrap());
                }

                poola.get_conn().unwrap()
                    .exec_iter(
                        "SELECT id, name, typeOfLadder, pointsForTournament, places, creator,approved, state, currentRound,`from`, `to`, place, categotry, rang, entryFee, director, phone,entriesTo, additionalInformations, visibility,image is not NULL from tournaments where deleted =0 and visibility = 'TRUE' ".to_owned()+&query+" order by id desc", parmams
                    ).unwrap().for_each(|row| {
                    let result_set = row.unwrap();
                    use time::Date;

                    res.push(tournament {
                        id: from_value(result_set.get(0).unwrap()),
                        name: from_value(result_set.get(1).unwrap()),
                        typeOfLadder: from_value(result_set.get(2).unwrap()),
                        places: from_value(result_set.get(4).unwrap()),
                        creator: from_value(result_set.get(5).unwrap()),
                        pointsForTournament: from_value(result_set.get(3).unwrap()),
                        approved: from_value(result_set.get(6).unwrap()),
                        state: from_value(result_set.get(7).unwrap()),
                        currentRound: from_value(result_set.get(8).unwrap()),
                        from: from_value::<Date>(result_set.get(9).unwrap()).to_string(),
                        to: from_value::<Date>(result_set.get(10).unwrap()).to_string(),
                        place: from_value(result_set.get(11).unwrap()),
                        categotry: from_value(result_set.get(12).unwrap()),
                        rang: from_value(result_set.get(13).unwrap()),
                        entryFee: from_value(result_set.get(14).unwrap()),
                        director: from_value(result_set.get(15).unwrap()),
                        phone: from_value(result_set.get(16).unwrap()),
                        entriesTo: from_value::<Date>(result_set.get(17).unwrap()).to_string(),
                        additionalInformations: from_value(result_set.get(18).unwrap()),
                        visibility: from_value(result_set.get(19).unwrap()),
                        hasImage: result_set.get(20).unwrap()
                    });
                });
                *response.body_mut() = serde_json::to_string(&res).unwrap().into();

            });
        }
        (&Method::GET, "/tournaments") => {
            if (req.headers().contains_key("Authorization")) {
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();
                POOL.with(|poola| {
                    let mut con = poola.get_conn().unwrap();
                    let mut result = con.exec_iter("Select  id from users where id =(SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW());", (&token, )).unwrap();
                    let mut it = result.iter().unwrap();
                    let row = it.next();
                    if row.is_none() {
                        *response.status_mut() = StatusCode::FORBIDDEN;
                        return;
                    }
                    let urow = row.unwrap().unwrap();
                    let id: i32 = urow.get(0).unwrap();

                    let mut res = Vec::new();
                    poola.get_conn().unwrap()
                        .exec_iter(
                            "SELECT id, name, typeOfLadder, pointsForTournament, places, creator,approved, state, currentRound,`from`, `to`, place, categotry, rang, entryFee, director, phone,entriesTo, additionalInformations, visibility,image is not NULL from tournaments where deleted =0 and (visibility = 'TRUE' or creator=?) order by id desc",(&id,)
                        ).unwrap().for_each(|row| {
                        let result_set = row.unwrap();
                        use time::Date;

                        res.push(tournament {
                            id: from_value(result_set.get(0).unwrap()),
                            name: from_value(result_set.get(1).unwrap()),
                            typeOfLadder: from_value(result_set.get(2).unwrap()),
                            places: from_value(result_set.get(4).unwrap()),
                            creator: from_value(result_set.get(5).unwrap()),
                            pointsForTournament: from_value(result_set.get(3).unwrap()),
                            approved: from_value(result_set.get(6).unwrap()),
                            state: from_value(result_set.get(7).unwrap()),
                            currentRound: from_value(result_set.get(8).unwrap()),
                            from:from_value::<Date>(result_set.get(9).unwrap()).to_string(),
                            to:from_value::<Date>(result_set.get(10).unwrap()).to_string(),
                            place: from_value(result_set.get(11).unwrap()),
                            categotry: from_value(result_set.get(12).unwrap()),
                            rang: from_value(result_set.get(13).unwrap()),
                            entryFee: from_value(result_set.get(14).unwrap()),
                            director: from_value(result_set.get(15).unwrap()),
                            phone: from_value(result_set.get(16).unwrap()),
                            entriesTo:from_value::<Date>(result_set.get(17).unwrap()).to_string(),
                            additionalInformations: from_value(result_set.get(18).unwrap()),
                            visibility: from_value(result_set.get(19).unwrap()),
                            hasImage: result_set.get(20).unwrap()
                        });
                    });

                    *response.body_mut() = serde_json::to_string(&res).unwrap().into();
                });

            }else{
                POOL.with(|poola| {
                    let mut res = Vec::new();
                    poola.get_conn().unwrap()
                        .query_iter(
                            "SELECT id, name, typeOfLadder, pointsForTournament, places, creator,approved, state, currentRound,`from`, `to`, place, categotry, rang, entryFee, director, phone,entriesTo, additionalInformations, visibility,image is not NULL from tournaments where deleted =0 and visibility = 'TRUE' order by id desc",
                        ).unwrap().for_each(|row| {
                        let result_set = row.unwrap();
                        res.push(tournament {
                            id: from_value(result_set.get(0).unwrap()),
                            name: from_value(result_set.get(1).unwrap()),
                            typeOfLadder: from_value(result_set.get(2).unwrap()),
                            places: from_value(result_set.get(4).unwrap()),
                            creator: from_value(result_set.get(5).unwrap()),
                            pointsForTournament: from_value(result_set.get(3).unwrap()),
                            approved: from_value(result_set.get(6).unwrap()),
                            state: from_value(result_set.get(7).unwrap()),
                            currentRound: from_value(result_set.get(8).unwrap()),
                            from: from_value(result_set.get(9).unwrap()),
                            to: from_value(result_set.get(10).unwrap()),
                            place: from_value(result_set.get(11).unwrap()),
                            categotry: from_value(result_set.get(12).unwrap()),
                            rang: from_value(result_set.get(13).unwrap()),
                            entryFee: from_value(result_set.get(14).unwrap()),
                            director: from_value(result_set.get(15).unwrap()),
                            phone: from_value(result_set.get(16).unwrap()),
                            entriesTo: from_value(result_set.get(17).unwrap()),
                            additionalInformations: from_value(result_set.get(18).unwrap()),
                            visibility: from_value(result_set.get(19).unwrap()),
                            hasImage: from_value(result_set.get(20).unwrap())
                        });
                    });

                    *response.body_mut() = serde_json::to_string(&res).unwrap().into();
                });
            }
        }
        (&Method::PUT, "/tournament") => {
            if req.headers().contains_key("Authorization") {
                let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                let aa = tmp.next().unwrap();
                if aa != "Bearer" {
                    *response.status_mut() = StatusCode::UNAUTHORIZED;
                    return Ok(response);
                }
                let token = tmp.next().unwrap().to_string();
                let byte_stream = hyper::body::to_bytes(req).await.unwrap();
                let s: HashMap<String, String> = serde_json::from_slice(&byte_stream).unwrap();
                POOL.with(|poola| {
                    let mut con = poola.get_conn().unwrap();

                    let mut result = con.exec_iter("Select role, id from users where id =(SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW());", (&token, )).unwrap();
                    let mut it = result.iter().unwrap();
                    let row = it.next();
                    if row.is_none() {
                        *response.status_mut() = StatusCode::FORBIDDEN;
                        return;
                    }
                    let urow = row.unwrap().unwrap();
                    let role: String = urow.get(0).unwrap();
                    let id: i32 = urow.get(1).unwrap();
                    if role == "1" {
                        *response.status_mut() = StatusCode::FORBIDDEN;
                        return;
                    }
                    if s.contains_key("name") && s.contains_key("typeOfLadder") && s.contains_key("pointsForTournament") && s.contains_key("places") &&  s.contains_key("ranked") && s.contains_key("from") && s.contains_key("to") && s.contains_key("place") && s.contains_key("categotry") && s.contains_key("rang") && s.contains_key("entryFee") && s.contains_key("director") && s.contains_key("phone") && s.contains_key("entriesTo") && s.contains_key("additionalInformations") && s.contains_key("visibility") {
                        let name = s.get("name").unwrap().to_string();
                        let type_of_ladder = s.get("typeOfLadder").unwrap().to_string();
                        let points_for_tournament = s.get("pointsForTournament").unwrap().to_string();
                        let places = s.get("places").unwrap().to_string();
                        let mut ranked = s.get("ranked").unwrap().to_string();
                        if ranked != "0" && ranked != "1" {
                            ranked = String::from("0");
                        }
                        let from = s.get("from").unwrap().to_string();
                        let to = s.get("to").unwrap().to_string();
                        let place = s.get("place").unwrap().to_string();
                        let categotry = s.get("categotry").unwrap().to_string();
                        let rang = s.get("rang").unwrap().to_string();
                        let entryFee = s.get("entryFee").unwrap().to_string();
                        let director = s.get("director").unwrap().to_string();
                        let phone = s.get("phone").unwrap().to_string();
                        let entriesTo = s.get("entriesTo").unwrap().to_string();
                        let visibility = s.get("visibility").unwrap().to_string();
                        let additionalInformations = s.get("additionalInformations").unwrap().to_string();
                        let mut tr = poola.start_transaction(TxOpts::default()).unwrap();

                        let id2 = &tr.exec_iter("INSERT INTO `inz`.`tournaments`(`name`,`typeOfLadder`,`pointsForTournament`,`places`,`creator`,`deleted`,`approved`,`state`,`currentRound`,`from`,`to`,`place`,`categotry`,`rang`,`entryFee`,`director`,`phone`,`entriesTo`,`additionalInformations`,`visibility`) VALUES (?,?,?,?,?,0,?,0,0,'1000-01-01 01:01:01','1000-01-01 01:01:01','','','',0,'','','1000-01-01 01:01:01','','TRUE');", (name, type_of_ladder, points_for_tournament, places, id, ranked)).unwrap().last_insert_id().unwrap().to_string();
                        let _ = &tr.exec_drop("Update tournaments set `from` =?, `to`=?, `place`=?, `categotry`=?, `rang`=?, `entryFee`=?, `director`=?, `phone`=?, `entriesTo`=?, `additionalInformations`=?, `visibility`=? where id = ?;", (from, to, place, categotry, rang, entryFee, director, phone, entriesTo, additionalInformations, visibility, &id2)).unwrap();
                        tr.commit().unwrap();
                        let str = "{\"id\":".to_owned() + id2 + "}";
                        *response.body_mut() = str.into();
                    } else {
                        *response.body_mut() = "{\"error\":\"not all fields\"}".into();
                    }
                });
            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::POST, "/user") => {
            let headers = (&req).headers();
            let mut tmp = headers.get("Authorization").unwrap().to_str().unwrap().split(" ");
            let aa = tmp.next().unwrap();
            if aa != "Bearer" {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
                return Ok(response);
            }
            let token = tmp.next().unwrap().to_string();
            if req.headers().contains_key("Authorization") {
                let byte_stream = hyper::body::to_bytes(req).await.unwrap();
                let s: HashMap<String, String> = serde_json::from_slice(&byte_stream).unwrap();
                POOL.with(|poola| {
                    let mut con = poola.get_conn().unwrap();
                    let mut result = con.exec_iter("Select id from users where id =(SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW());", (token, )).unwrap();
                    let mut it = result.iter().unwrap();
                    let row = it.next();
                    if row.is_none() {
                        *response.status_mut() = StatusCode::FORBIDDEN;
                        return;
                    }
                    let urow = row.unwrap().unwrap();
                    let idi: i32 = urow.get(0).unwrap();
                    if s.contains_key("name") {
                        poola.get_conn().unwrap().exec_drop("Update users set name =? where id = ?", (s.get("name"), idi)).unwrap();
                    }
                    if s.contains_key("surname") {
                        poola.get_conn().unwrap().exec_drop("Update users set surname =? where id = ?", (s.get("surname"), idi)).unwrap();
                    }
                    if s.contains_key("password") {
                        poola.get_conn().unwrap().exec_drop("Update users set password =? where id = ?", (hash(s.get("password").unwrap().to_string(), DEFAULT_COST - 6).unwrap(), idi)).unwrap();
                        poola.get_conn().unwrap().exec_drop("delete from sessions where user = ?", (idi,)).unwrap();
                    }
                    if s.contains_key("phone") {
                        poola.get_conn().unwrap().exec_drop("Update users set phone =? where id = ?", (s.get("phone"), idi)).unwrap();
                    }
                });
            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::GET, "/user") => {
            if req.headers().contains_key("Authorization") {
                POOL.with(|poola| {
                    let mut con = poola.get_conn().unwrap();
                    let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                    let aa = tmp.next().unwrap();
                    if aa != "Bearer" {
                        *response.status_mut() = StatusCode::UNAUTHORIZED;
                        return;
                    }
                    let token = tmp.next().unwrap();
                    let mut result = con.exec_iter("Select * from users where id =(SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW());", (&token, )).unwrap();
                    let mut it = result.iter().unwrap();
                    let row = it.next();
                    if row.is_none() {
                        *response.status_mut() = StatusCode::FORBIDDEN;
                        return;
                    }
                    let urow = row.unwrap().unwrap();
                    let a = User { id: urow.get(0).unwrap(), name: urow.get(1).unwrap(), surname: urow.get(2).unwrap(), role: urow.get(3).unwrap(), login: urow.get(4).unwrap(), phone: urow.get(7).unwrap(), mail: urow.get(6).unwrap(), ranking: urow.get(8).unwrap() };

                    *response.body_mut() = serde_json::to_string(&a).unwrap().into();
                });
            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::GET, "/user/myTournaments") => {
            if req.headers().contains_key("Authorization") {
                POOL.with(|poola| {
                    let mut con = poola.get_conn().unwrap();
                    let mut tmp = req.headers().get("Authorization").unwrap().to_str().unwrap().split(" ");
                    let aa = tmp.next().unwrap();
                    if aa != "Bearer" {
                        *response.status_mut() = StatusCode::UNAUTHORIZED;
                        return;
                    }
                    let token = tmp.next().unwrap();
                    let mut result = con.exec_iter("Select id from users where id =(SELECT user FROM `inz`.`sessions` where token = ? and expire > NOW());", (&token, )).unwrap();
                    let mut it = result.iter().unwrap();
                    let row = it.next();
                    if row.is_none() {
                        *response.status_mut() = StatusCode::FORBIDDEN;
                        return;
                    }
                    let uid:Value = row.unwrap().unwrap().get(0).unwrap();
                    let mut res = Vec::new();

                    poola.get_conn().unwrap()
                        .exec_iter(
                            "SELECT id, name, typeOfLadder, pointsForTournament, places, creator,approved, state, currentRound,`from`, `to`, place, categotry, rang, entryFee, director, phone,entriesTo, additionalInformations, visibility,'o',image is not NULL from tournaments where  deleted=0 and creator=? and (Select COUNT(*) from registrations where userid=? or partner=?) =0
Union
SELECT DISTINCT tournaments.id, tournaments.name, tournaments.typeOfLadder, tournaments.pointsForTournament, tournaments.places, tournaments.creator,tournaments.approved, tournaments.state, tournaments.currentRound,tournaments.`from`, tournaments.`to`, tournaments.place, tournaments.categotry, tournaments.rang, tournaments.entryFee, tournaments.director, tournaments.phone,tournaments.entriesTo, tournaments.additionalInformations, tournaments.visibility,'u',image is not NULL from registrations LEFT JOIN tournaments on tournaments.id=registrations.tournamentid where tournaments.deleted =0 and (registrations.userid=? or registrations.partner=?) and tournaments.creator !=?
Union
SELECT DISTINCT tournaments.id, tournaments.name, tournaments.typeOfLadder, tournaments.pointsForTournament, tournaments.places, tournaments.creator,tournaments.approved, tournaments.state, tournaments.currentRound,tournaments.`from`, tournaments.`to`, tournaments.place, tournaments.categotry, tournaments.rang, tournaments.entryFee, tournaments.director, tournaments.phone,tournaments.entriesTo, tournaments.additionalInformations, tournaments.visibility,'ou',image is not NULL from registrations LEFT JOIN tournaments on tournaments.id=registrations.tournamentid where tournaments.deleted =0 and (registrations.userid=? or registrations.partner=?) and tournaments.creator =?
",(&uid,&uid,&uid,&uid,&uid,&uid,&uid,&uid,&uid)
                        ).unwrap().for_each(|row| {
                        let result_set = row.unwrap();
                        use time::Date;
                        let mut cur = tournamentMy {
                            id: from_value(result_set.get(0).unwrap()),
                            name: from_value(result_set.get(1).unwrap()),
                            typeOfLadder: from_value(result_set.get(2).unwrap()),
                            places: from_value(result_set.get(4).unwrap()),
                            creator: from_value(result_set.get(5).unwrap()),
                            pointsForTournament: from_value(result_set.get(3).unwrap()),
                            approved: from_value(result_set.get(6).unwrap()),
                            state: from_value(result_set.get(7).unwrap()),
                            currentRound: from_value(result_set.get(8).unwrap()),
                            from: from_value::<Date>(result_set.get(9).unwrap()).to_string(),
                            to: from_value::<Date>(result_set.get(10).unwrap()).to_string(),
                            place: from_value(result_set.get(11).unwrap()),
                            categotry: from_value(result_set.get(12).unwrap()),
                            rang: from_value(result_set.get(13).unwrap()),
                            entryFee: from_value(result_set.get(14).unwrap()),
                            director: from_value(result_set.get(15).unwrap()),
                            phone: from_value(result_set.get(16).unwrap()),
                            entriesTo: from_value::<Date>(result_set.get(17).unwrap()).to_string(),
                            additionalInformations: from_value(result_set.get(18).unwrap()),
                            visibility: from_value(result_set.get(19).unwrap()),
                            actionRequired: Vec::new(),
                            hasImage: from_value(result_set.get(21).unwrap())
                        };
                        let ty:String = from_value(result_set.get(20).unwrap());
                        if(ty =="o"){
                            poola.get_conn().unwrap()
                                .exec_iter(
                                    "Select id,'ORGANIZER APPROVAL' from registrations where tournamentid=? and approval = 0  and partnerAcceptance =1",(cur.id,)
                                ).unwrap().for_each(|row| {
                                let iresult_set = row.unwrap();

                                cur.actionRequired.push(tournamentMyaction { id: from_value(iresult_set.get(0).unwrap()), action: from_value(iresult_set.get(1).unwrap()) });
                            });
                        }else if(ty=="u"){
                            poola.get_conn().unwrap()
                                .exec_iter(
                                    "Select id, if(partnerAcceptance =0,'ACCEPTANCE','PAYMENT') from registrations where tournamentid=? and ((partnerAcceptance =0 and partner =?) or (approval =1 and userid =? and paymentstatus != 'DONE')or (approval =1 and partner =? and paymentstatus2 != 'DONE'))",(cur.id,&uid,&uid,&uid)
                                ).unwrap().for_each(|row| {
                                let iresult_set = row.unwrap();

                                cur.actionRequired.push(tournamentMyaction { id: from_value(iresult_set.get(0).unwrap()), action: from_value(iresult_set.get(1).unwrap()) });
                            });
                        }else{
                            poola.get_conn().unwrap()
                                .exec_iter(
                                    "Select id, if(partnerAcceptance =0,'ACCEPTANCE','PAYMENT') from registrations where tournamentid=? and ((partnerAcceptance =0 and partner =?) or (approval =1 and userid =? and paymentstatus != 'DONE')or (approval =1 and partner =? and paymentstatus2 != 'DONE'))",(cur.id,&uid,&uid,&uid)
                                ).unwrap().for_each(|row| {
                                let iresult_set = row.unwrap();

                                cur.actionRequired.push(tournamentMyaction { id: from_value(iresult_set.get(0).unwrap()), action: from_value(iresult_set.get(1).unwrap()) });
                            });
                            poola.get_conn().unwrap()
                                .exec_iter(
                                    "Select id,'ORGANIZER APPROVAL' from registrations where tournamentid=? and approval = 0  and partnerAcceptance =1",(cur.id,)
                                ).unwrap().for_each(|row| {
                                let iresult_set = row.unwrap();

                                cur.actionRequired.push(tournamentMyaction { id: from_value(iresult_set.get(0).unwrap()), action: from_value(iresult_set.get(1).unwrap()) });
                            });

                        }
                        res.push(cur);

                    });
                    *response.body_mut() = serde_json::to_string(&res).unwrap().into();

                });
            } else {
                *response.status_mut() = StatusCode::UNAUTHORIZED;
            }
        }
        (&Method::PUT, "/user/create") => {
            let byte_stream = hyper::body::to_bytes(req).await.unwrap();
            let s: HashMap<String, String> = serde_json::from_slice(&byte_stream).unwrap();
            if s.contains_key("username") && s.contains_key("name") && s.contains_key("surname") && s.contains_key("password") && s.contains_key("mail") && s.contains_key("phone") {
                let username = s.get("username").unwrap().to_string();
                let name = s.get("name").unwrap().to_string();
                let surname = s.get("surname").unwrap().to_string();
                let password = hash(s.get("password").unwrap().to_string(), DEFAULT_COST - 6).unwrap();
                let mail = s.get("mail").unwrap().to_string();
                let smtp_server = "smtp.wp.pl";
                let smtp_username = "padelts@wp.pl";
                let smtp_password = "padel2024";
                let mail2= ("Yuin <".to_owned() + &mail + ">").parse();
                if(mail2.is_err()){
                    *response.body_mut() = "{}".into();
                    *response.status_mut() = StatusCode::BAD_GATEWAY;
                    return Ok(response)
                }
                const CHARSET: &[u8] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZ\
                                abcdefghijklmnopqrstuvwxyz\
                                0123456789";
                const PASSWORD_LEN: usize = 20;
                let mut rand: OsRng = OsRng::new().expect("Error opening random number generator");

                let password2: String = (0..PASSWORD_LEN)
                    .map(|_| {
                        let idx = rand.gen_range(0, CHARSET.len());
                        CHARSET[idx] as char
                    })
                    .collect();

                let email = Message::builder()
                    .from(("NoBody <".to_owned() + smtp_username + ">").parse().unwrap())
                    .to(mail2.unwrap())
                    .subject("verification code")
                    .multipart(
                        MultiPart::alternative() // This is composed of two parts.
                            .singlepart(
                                SinglePart::builder()
                                    .header(header::ContentType::TEXT_PLAIN)
                                    .body(String::from("https://inz.dragonmaster.pl/verifymail?token=".to_string()+password2.as_str())), // Every message should have a plain text fallback.
                            )
                            .singlepart(
                                SinglePart::builder()
                                    .header(header::ContentType::TEXT_HTML)
                                    .body(String::from("<a href=\"https://inz.dragonmaster.pl/verifymail?token=".to_string()+password2.as_str()+"\">click me</a>")),
                            ),
                    )
                    .unwrap();
                let creds = Credentials::new(smtp_username.to_string(), smtp_password.to_string());

                let mailer = SmtpTransport::relay(smtp_server)
                    .unwrap()
                    .credentials(creds)
                    .build();
                match mailer.send(&email) {
                    Ok(_) => {},
                    Err(e) => { *response.body_mut() = "{}".into();
                        *response.status_mut() = StatusCode::BAD_GATEWAY;
                        return Ok(response)} ,
                    _ => {}
                }

                let phone = s.get("phone").unwrap().to_string();
                POOL.with(|poola| {
                    let mut con = poola.get_conn().unwrap();
                    let mut a = con.exec_iter("select `login` from users where login = ?", (&username, )).unwrap();
                    let it = a.iter().unwrap().next();
                    if it.is_none() {
                        poola.get_conn().unwrap().exec_drop("INSERT INTO `inz`.`users`(`name`,`surname`,`role`,`login`,`password`,`mail`,`phone`,`deleted`,`ranking`,token,verified)VALUES (?,?,1,?,?,?,?,0,0,?,0);", (name, surname, username, password, mail, phone,password2)).unwrap();
                    }
                });
                *response.body_mut() = "{}".into();
            } else {
                *response.body_mut() = "{\"error\":\"not all fields\"}".into();
            }
        }
        (&Method::POST, "/user/verifymail") => {
            let byte_stream = hyper::body::to_bytes(req).await.unwrap();
            let s: HashMap<String, String> = serde_json::from_slice(&byte_stream).unwrap();
            if !s.contains_key("token") {
                *response.body_mut() = "{\"error\":\"token is required\"}".into();
                return Ok(response);
            }

            *response.body_mut() ="{}".into();
            POOL.with(|poola| {
                poola.get_conn().unwrap().exec_drop("Update users set verified =1 where token = ?", (s.get("token"), )).unwrap();

            });

        }
        (&Method::POST, "/user/login") => {
            let byte_stream = hyper::body::to_bytes(req).await.unwrap();
            let s: HashMap<String, String> = serde_json::from_slice(&byte_stream).unwrap();
            if s.contains_key("username") && s.contains_key("password") {
                let username = s.get("username").unwrap().to_string();
                let password = s.get("password").unwrap().to_string();
                *response.body_mut() = POOL.with(|poola| {
                    let mut con = poola.get_conn().unwrap();
                    let mut result = con.exec_iter("SELECT * FROM `inz`.`users` where (login = ? or mail = ?) and `deleted`=0 and verified=1;", (&username, &username)).unwrap();
                    let mut it = result.iter().unwrap();
                    let row = it.next();
                    if !row.is_none() {
                        let urow = row.unwrap().unwrap();
                        let pas: String = urow.get(5).unwrap();
                        let id: i32 = urow.get(0).unwrap();
                        if verify(&password, &pas).unwrap() {
                            let mut rand: OsRng = OsRng::new().expect("Error opening random number generator");
                            if !it.next().is_none() {
                                return Body::from("{\"error\":\"wrong username or password\"}");
                            }
                            const CHARSET: &[u8] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZ\
                                abcdefghijklmnopqrstuvwxyz\
                                0123456789";
                            const PASSWORD_LEN: usize = 80;
                            let password: String = (0..PASSWORD_LEN)
                                .map(|_| {
                                    let idx = rand.gen_range(0, CHARSET.len());
                                    CHARSET[idx] as char
                                })
                                .collect();
                            poola.get_conn().unwrap().exec_drop("DELETE FROM `inz`.`sessions`WHERE user = ?;", (id, )).unwrap();
                            poola.get_conn().unwrap().exec_drop("INSERT INTO `inz`.`sessions`(`user`,`token`,`expire`)VALUES (?,?,DATE_ADD(NOW(), INTERVAL 60 MINUTE));", (id, &password)).unwrap();
                            return Body::from("{\"token\":\"".to_owned() + &password + "\"}");
                        } else {
                            return Body::from("{\"error\":\"wrong username or password\"}");
                        }
                    } else {
                        hash("asd", DEFAULT_COST - 6).unwrap();
                        return Body::from("{\"error\":\"wrong username or password\"}");
                    }
                });
            } else {
                *response.body_mut() = "{\"error\":\"not all fields\"}".into();
            }
        }

        _ => {
            *response.status_mut() = StatusCode::NOT_FOUND;
        }
    };
    Ok(response)
}

#[tokio::main]
async fn main() {
    let addr = SocketAddr::from(([0, 0, 0, 0], 1000));
    let make_svc = make_service_fn(|_conn| async {
        Ok::<_, Infallible>(service_fn(hello_world))
    });
    let server = Server::bind(&addr).serve(make_svc);
    tokio::spawn(async move {
        loop
        {
            POOL.with(|poola| {
                let mut conn = poola.get_conn().unwrap();
                conn.query_iter(
                    "Select id, paymentreference, paymentstatus ,paymentreference2 ,paymentstatus2 from registrations where (paymentstatus = 'PENDING' or paymentstatus2 = 'PENDING') and paymenttype ='btc'",
                ).unwrap().for_each(|row| {
                    tokio::spawn(async move {
                        let result_set = row.unwrap();
                        let reference: &String = &from_value(result_set.get(1).unwrap());
                        let status: &String = &from_value(result_set.get(2).unwrap());
                        let reference2: &String = &from_value(result_set.get(3).unwrap());
                        let status2: &String = &from_value(result_set.get(4).unwrap());
                        let id: &String = &from_value(result_set.get(0).unwrap());
                        if status == "PENDING" {
                            let client = Client::new();
                            let req = Request::builder()
                                .method(Method::GET)
                                .uri("http://10.1.6.101:8082/api/v1/stores/5QsjqLbqHNgiP4GnAqy2apKaTcxWDj7zFFSpNKZGEseR/invoices/".to_owned() + reference)
                                .header("content-type", "application/json")
                                .header("Authorization", "token 8b1d0a2a653e9f40ac402dbce66fccb3ccd1b9c5").body(Body::empty()).unwrap();
                            let resp = client.request(req).await.unwrap();
                            let parsed: serde_json::Value = serde_json::from_slice(hyper::body::to_bytes(resp.into_body()).await.unwrap().as_ref()).unwrap();
                            let stat: String = parsed.get("status").unwrap().as_str().unwrap().into();
                            if stat == "New" {} else {
                                if stat == "Settled" {
                                    POOL.with(|poola| {
                                        poola.get_conn().unwrap().exec_drop("Update registrations set paymentstatus ='DONE' where id = ?", (id, )).unwrap();
                                    });
                                } else {
                                    if stat == "Processing" {} else {
                                        if stat == "Expired" {
                                            POOL.with(|poola| {
                                                poola.get_conn().unwrap().exec_drop("Update registrations set paymentstatus ='EXPIRED' where id = ?", (id, )).unwrap();
                                            });
                                        } else {
                                            POOL.with(|poola| {
                                                poola.get_conn().unwrap().exec_drop("Update registrations set paymentstatus =? where id = ?", (stat, id)).unwrap();
                                            });
                                        }
                                    }
                                }
                            }
                        }
                        if status2 == "PENDING" {
                            let client = Client::new();
                            let req = Request::builder()
                                .method(Method::GET)
                                .uri("http://10.1.6.101:8082/api/v1/stores/5QsjqLbqHNgiP4GnAqy2apKaTcxWDj7zFFSpNKZGEseR/invoices/".to_owned() + reference2)
                                .header("content-type", "application/json")
                                .header("Authorization", "token 8b1d0a2a653e9f40ac402dbce66fccb3ccd1b9c5").body(Body::empty()).unwrap();
                            let resp = client.request(req).await.unwrap();
                            let parsed: serde_json::Value = serde_json::from_slice(hyper::body::to_bytes(resp.into_body()).await.unwrap().as_ref()).unwrap();
                            let stat: String = parsed.get("status").unwrap().as_str().unwrap().into();
                            if stat == "New" {} else {
                                if stat == "Settled" {
                                    POOL.with(|poola| {
                                        poola.get_conn().unwrap().exec_drop("Update registrations set paymentstatus2 ='DONE' where id = ?", (id, )).unwrap();
                                    });
                                } else {
                                    if stat == "Processing" {} else {
                                        if stat == "Expired" {
                                            POOL.with(|poola| {
                                                poola.get_conn().unwrap().exec_drop("Update registrations set paymentstatus2 ='EXPIRED' where id = ?", (id, )).unwrap();
                                            });
                                        } else {
                                            POOL.with(|poola| {
                                                poola.get_conn().unwrap().exec_drop("Update registrations set paymentstatus2 =? where id = ?", (stat, id)).unwrap();
                                            });
                                        }
                                    }
                                }
                            }
                        }
                    });
                });
                let smtp_server = "smtp.wp.pl";
                let smtp_username = "padelts@wp.pl";
                let smtp_password = "padel2024";
                let mut conn2 = poola.get_conn().unwrap();

                conn2.query_iter(
                    "Select id, (Select mail from users where users.id = userid),(Select mail from users where users.id = partner) from registrations where paymentstatus = 'DONE' and paymentstatus2 = 'DONE' and informed = 0",
                ).unwrap().for_each(|row| {
                    tokio::spawn(async move {
                        let result_set = row.unwrap();
                        let id: &String = &from_value(result_set.get(0).unwrap());
                        let usermail: &String = &from_value(result_set.get(1).unwrap());
                        let partnermail: &String = &from_value(result_set.get(2).unwrap());
                        POOL.with(|poola2| {
                            let mut conn3 = poola2.get_conn().unwrap();
                            conn3.exec_drop("Update registrations set informed =1 where id = ?", (id, )).unwrap();
                        });
                    });
                });
            });
            sleep(Duration::from_secs(60 * 15)).await;

        }
    });
    if let Err(e) = server.await {
        eprintln!("server error: {}", e);
    }
}