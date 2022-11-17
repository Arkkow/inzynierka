import React from "react";
import { useState, useEffect } from "react";
import { Button } from "bootstrap";

const UserName = () => {
  const Token = JSON.parse(localStorage.getItem("token")).token;
  const [userName, setUserName] = useState([]);
  const getUserName = async () => {
    const url = "https://dragonmaster.pl/inz/user";

    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
        Authorization: "Bearer " + Token,
      },
    });
    try {
      const responseJson = await response.json();
      const data = responseJson.results;
      setUserName(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getUserName();
  }, []);

  return <>{/* return <Button></Button>; */}</>;
};
export default UserName;
