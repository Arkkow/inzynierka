
import { useEffect, useState } from "react";

function UserName() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [userName, setUserName] = useState([]);
  const Token = JSON.parse(localStorage.getItem("token")).token;

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetch("https://dragonmaster.pl/inz/user", {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + Token,
      },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setUserName(result);
        },
        // Note: it's important to handle errors here
        // instead of a catch() block so that we don't swallow
        // exceptions from actual bugs in components.
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  function refreshPage() {
    window.location.href="calendar";
  }

  if (error) {
    localStorage.removeItem("token");
    refreshPage();
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return <my_h4>Profil</my_h4>;
  }
}

export default UserName;
