import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import "../../styles/App.css";

function Logout() {
  function refreshPage() {
    window.location.reload(false);
  }

  const handleClick = () => {
    localStorage.removeItem("token");
    refreshPage();
  };

  return (
    <Button
      style={{
        fontFamily: "Montserrat",
        fontWeight: "600",
        fontSize: "18px",
        lineHeight: "25px",
        color: "white",
        borderRadius: "15px",
        paddingRight: "1.5%",
        paddingLeft: "1.5%",
        paddingBottom: "0.5%",
        paddingTop: "0.5%",
        marginRight: "1%",
      }}
      onClick={handleClick}
      href="calendar"
      variant="success"
    >
      WYLOGUJ
    </Button>
  );
}

export default Logout;
