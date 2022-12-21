import {Col, Row} from "react-bootstrap";
import Form from "react-bootstrap/Form";
import React from "react";

export const ResultsInput = () => {

    return (
        <>
            {/** KOLUMNA 3 **/}
            <Col>
                <paragraph_sb style={{display: "flex",
                    justifyContent: "center",
                    margin: "auto",
                    alignItems: "center",
                    paddingTop:"4px",
                    color: "var(--black)"}}>
                    SET 1
                </paragraph_sb>
                <Form style={{marginTop:"4px"}}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                margin: "auto",
                                alignItems: "center",}}>
                            <select id="set1A" className="form-select" style={{height:"48px", borderRadius:"10px"}}>
                                <option selected>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                            </select>
                        </div>
                    </Form.Group>
                </Form>
                <Form style={{marginTop:"20px"}}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <div
                            style={{
                                marginTop:"20px",
                                display: "flex",
                                justifyContent: "center",
                                margin: "auto",
                                alignItems: "center"}}>
                            <select id="set1B" className="form-select" style={{height:"48px", borderRadius:"10px"}}>
                                <option selected>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                            </select>
                        </div>
                    </Form.Group>
                </Form>
            </Col>

            {/** KOLUMNA 4 **/}
            <Col>
                <paragraph_sb style={{display: "flex",
                    justifyContent: "center",
                    margin: "auto",
                    alignItems: "center",
                    paddingTop:"4px",
                    color: "var(--black)"}}>
                    SET 2
                </paragraph_sb>
                <Form style={{marginTop:"4px"}}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                margin: "auto",
                                alignItems: "center",}}>
                            <select id="set2A" className="form-select" style={{height:"48px", borderRadius:"10px"}}>
                                <option selected>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                            </select>
                        </div>
                    </Form.Group>
                </Form>
                <Form style={{marginTop:"20px"}}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <div
                            style={{
                                marginTop:"20px",
                                display: "flex",
                                justifyContent: "center",
                                margin: "auto",
                                alignItems: "center"}}>
                            <select id="set2B" className="form-select" style={{height:"48px", borderRadius:"10px"}}>
                                <option selected>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                            </select>
                        </div>
                    </Form.Group>
                </Form>
            </Col>

            {/** KOLUMNA 5 **/}
            <Col style={{marginRight:"10px"}}>
                <paragraph_sb style={{display: "flex",
                    justifyContent: "center",
                    margin: "auto",
                    alignItems: "center",
                    paddingTop:"4px",
                    color: "var(--black)"}}>
                    SET 3
                </paragraph_sb>
                <Form style={{marginTop:"4px"}}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <div
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                margin: "auto",
                                alignItems: "center",}}>
                            <select id="set3A" className="form-select" style={{height:"48px", borderRadius:"10px"}}>
                                <option selected>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                            </select>
                        </div>
                    </Form.Group>
                </Form>
                <Form style={{marginTop:"20px"}}>
                    <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
                        <div
                            style={{
                                marginTop:"20px",
                                display: "flex",
                                justifyContent: "center",
                                margin: "auto",
                                alignItems: "center"}}>
                            <select id="set3B" className="form-select" style={{height:"48px", borderRadius:"10px"}}>
                                <option selected>0</option>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                                <option>6</option>
                                <option>7</option>
                            </select>
                        </div>
                    </Form.Group>
                </Form>
            </Col>
        </>
    )
}
export default ResultsInput