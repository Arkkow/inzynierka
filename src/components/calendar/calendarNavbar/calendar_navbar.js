// General React imports
import * as React from "react";

// Project specific files
import Button from "react-bootstrap/Button";
import { Form } from "react-bootstrap";

// CSS files

export const CalendarNavbar = (props) => {
  return (
    <div
      style={{
        background: "white",
        maxWidth: "50%",
        margin: "auto",
        padding: "1%",
        borderRadius: "1%",
      }}
    >
      <div style={{ display: "flex", justifyContent: "center", padding: "2%" }}>
        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center" }}>OD</div>
          <Form.Control
            type="date"
            placeholder="Start Date"
            style={{ width: "80%", marginRight: "2%", marginLeft: "2%" }}
          />
        </div>

        <div style={{ width: "100%" }}>
          <div style={{ display: "flex", alignItems: "center" }}>DO</div>
          <Form.Control
            type="date"
            placeholder="Start Date"
            style={{ width: "80%", marginRight: "2%", marginLeft: "2%" }}
          />
        </div>
      </div>
      <div>
        <Button
          variant="outline-secondary"
          disabled={true}
          style={{ margin: "1%", marginLeft: "2%", marginRight: "2%" }}
        >
          WSZYSTKIE
        </Button>
        <Button
          variant="outline-secondary"
          disabled={false}
          style={{ margin: "1%", marginLeft: "2%", marginRight: "2%" }}
        >
          MOJE
        </Button>

        <Button
          variant="success"
          style={{ float: "right", margin: "1%", marginRight: "3%" }}
        >
          STWÓRZ NOWY TURNIEJ
        </Button>
      </div>
    </div>
  );
};

export default CalendarNavbar;
