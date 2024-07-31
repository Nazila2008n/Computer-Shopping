import { Alert, Container, Nav, Navbar } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";

import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { useState } from "react";
import { logInUser } from "../dataApi/dataApi";

export default function Login() {
    const [validated, setValidated] = useState(false);
    const [successLogIn, setSuccessLogIn] = useState('')
    const [formData, setFormData] = useState({
        username: "",
        password: ""
    });

    const navigate = useNavigate()

    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {

            event.stopPropagation();
        } else {
            event.stopPropagation();
            const user = logInUser(formData);
            if (user) {
                setSuccessLogIn("success")
                setTimeout(() => {
                    navigate("/")

                }, 3000)

            } else {
                setSuccessLogIn("error")
                setFormData({
                    username: "",
                    password: ""
                })
            }

        }

        setValidated(true);
    };

    function showResultOfLogin(){
        if(successLogIn == "success"){
            return(
                <Alert variant="success">
                Successful log in
             </Alert>
            )
        } else if(successLogIn == 'error'){
            return(
                <Alert variant="danger">
                Log in error
             </Alert>
            )
        }
    }
    return (
        <>
            <header>
                <Navbar expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand href="">
                            <Link to="/">
                                Computer shop
                            </Link>


                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">


                            <Nav className="me-auto">
                                <Link to="/" className="mx-2 p-1">
                                    Home
                                </Link>

                            </Nav>

                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
            <section>
                <div className="col-5 m-auto">
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <h1 className="text-center">Log in</h1>
                            <div className="my-3">
                            {showResultOfLogin()}


                            </div>
                            <Form.Group as={Col} md="12" controlId="validationCustom01" className="my-2">
                                <Form.Label>Username</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="username"
                                    defaultValue=""
                                    value={formData.username}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        username: e.target.value
                                    })}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="12" controlId="validationCustom01" className="my-2">
                                <Form.Label>password</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="password"
                                    defaultValue=""
                                    value={formData.password}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        password: e.target.value
                                    })}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>

                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Check
                                required
                                label="Agree to terms and conditions"
                                feedback="You must agree before submitting."
                                feedbackType="invalid"
                            />
                        </Form.Group>
                        <Button type="submit">Submit form</Button>
                        <div className="my-4">
                                    Don't have account?
                                    <Link to="/registration" className="btn btn-primary mx-3">Registration</Link>

                        </div>
                    </Form>
                </div>
            </section>

        </>
    )
}