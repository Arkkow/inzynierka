
import { useEffect, useState } from "react";
import {wait} from "@testing-library/user-event/dist/utils";
import {getUser} from "../../api/user_interaction/user_api";
import {putRegistration} from "../../api/tournament/tournament_registration_api";

function UserName() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const Token = JSON.parse(localStorage.getItem("token")).token;

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  // useEffect(() => {
  //   fetch("https://dragonmaster.pl/inz/user", {
  //     headers: {
  //       Accept: "application/json",
  //       Authorization: "Bearer " + Token,
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then(
  //       () => {
  //         setIsLoaded(true);
  //       },
  //       // Note: it's important to handle errors here
  //       // instead of a catch() block so that we don't swallow
  //       // exceptions from actual bugs in components.
  //       (error) => {
  //         checkIfUserHasValidToken()
  //         setIsLoaded(true);
  //         setError(error);
  //       }
  //     );
  // }, []);

  function deleteToken() {
    localStorage.removeItem("token")
    window.location.href="calendar";
  }

  const checkIfUserHasValidToken= async () => {
    await getUser()
        .then((dane)=> {
          if (!dane) { deleteToken() }}
        .catch(error)=> {set}
)};


  if (error) {
    checkIfUserHasValidToken()
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return <my_h4>Profil</my_h4>;
  }
}

export default UserName;
