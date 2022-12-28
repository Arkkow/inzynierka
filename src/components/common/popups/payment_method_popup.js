import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import "../../../styles/App.css"
import PFP_LOGO from "../../../assets/PFP_LOGO.png";
import './Payment.css';
import {getRegistrationPaymentStatus, postPayForRegistration} from "../../api/user_interaction/payment_api";
var couter = 0; 

function PaymentMethod_popup(props) {
    const [show, setShow] = useState(false);
function checker(){
	getRegistrationPaymentStatus(props.rid.toString()).then((stat)=>{
		if(couter ==10){
				document.getElementById("loader").style.display="none";
	document.getElementById("msg").style.display="block";
	document.getElementById("msg").innerText = "your payment is processed or you closed window";
	setTimeout(function(){setShow(false);},5000);

			return;
		}
		if(stat.status!="PENDING"){
				document.getElementById("loader").style.display="none";
	document.getElementById("msg").style.display="block";
	document.getElementById("msg").innerText = stat.status;
setTimeout(function(){setShow(false);},5000);
		}else{
			couter++;
			setTimeout(checker,1000);
		}
	});
}
    const handleConfirm = () => {
		postPayForRegistration({
  "id": props.rid.toString(),
  "paymentmethod": document.getElementById("inputState").value
}).then((resp)=>{
	if(document.getElementById("inputState").value == "btc"){
	var tmp = resp.url.split("/");
	window.btcpay.onModalWillLeave(function (){
		setTimeout(checker,1000);
	});
	document.getElementById("loader").style.display="block";
	window.btcpay.showInvoice(tmp[tmp.length-1]);
	}else{
			setShow(false);
	}
});

	};
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
const script = document.createElement('script');

  script.src = "https://btcpay.dragonmaster.pl/modal/btcpay.js";
  script.async = true;
  document.body.appendChild(script);
    return (
        <>
            <Button style={{
                fontFamily: 'Montserrat',
                fontWeight: "600",
                fontSize: "18px",
                lineHeight: "25px",
                color: "white",
                borderRadius: "15px",
                paddingRight: "8px",
                paddingLeft: "8px",
                paddingBottom: "6px",
                paddingTop: "6px",
                marginLeft:"45%",
                marginTop:"10px"
            }} variant="success" onClick={handleShow}>
                PŁATNOŚĆ
            </Button>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton >
                    <img src={PFP_LOGO} style={{ marginLeft: "auto", height:"8vh"}} alt="LOGO" />
                </Modal.Header>
                <Modal.Body style={{
                    backgroundColor: "#EBEBEB",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center"
                }}>
                    <paragraph>
                        Wybierz metodę płatności</paragraph>
                    <Form style={{width: "100%"}}>
                        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                            <div className="form-group col-md-4" style={{width:"100%", marginTop:"3%"}}>
                                <select id="inputState" className="form-select">
                                    <option value="btc" selected>Płatność online kryptowalutą</option>
                                    <option value="cash">Samodzielnie u organizatora</option>
                                </select>
                            </div>
                        </Form.Group>
                    </Form>
                    <Button style={{
                        fontFamily: 'Montserrat',
                        fontWeight: "600",
                        fontSize: "18px",
                        lineHeight: "25px",
                        color: "white",
                        borderRadius: "13px"
                    }} variant="success" onClick={handleConfirm}>
                        POTWIERDŹ
                    </Button>

					
                </Modal.Body>
                <Modal.Footer style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
				<div id="loader" className="loader" style={{ display: "none"}}>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                    <div className="dot"></div>
                </div>
				<div id="msg"/>
                </Modal.Footer>
            </Modal>
        </>
    );
}


export default PaymentMethod_popup;




