import { useState } from "react";
import { Alert, Button, Container, Form, Nav, Navbar, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Col from 'react-bootstrap/Col';
import { registrateUser } from "../dataApi/dataApi";


export default function Registration() {
    const [validated, setValidated] = useState(false);
    const [formData, setFormData] = useState({
        id: Math.random(),
        name: "",
        surname: "",
        username: "",
        tel: "",
        password: "",
        products: []
    });
    const [successfulRegistration, setsuccessfulRegistration] = useState("");
    const navigate = useNavigate();
    function handleSubmit(event) {
        event.preventDefault();
        const form = event.currentTarget;
        if (form.checkValidity() === false) {

            event.stopPropagation();
        } else {
            event.stopPropagation();
            registration(formData)

        }

        setValidated(true);

    }
    function registration(formData) {
        const newUser = formData;
        registrateUser(newUser);
        setsuccessfulRegistration("success")
        setTimeout(() => {
            navigate("/log-in")

        }, 4000)

    }



    function showResultOfRegistration() {
        if (successfulRegistration === "success") {
            return (
                <Alert variant="success">
                    Successful registration
                </Alert>
            )

        } else if (successfulRegistration === "error") {
            return (
                <Alert variant="danger">
                    error in registration
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
                            <h1 className="text-center">Registration</h1>
                            <div className="my-3">
                                {showResultOfRegistration()}


                            </div>





                            <Form.Group as={Col} md="12" controlId="validationCustom01" className="my-2">
                                <Form.Label> First name</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="first name"
                                    defaultValue=""
                                    value={formData.name}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        name: e.target.value
                                    })}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>

                            <Form.Group as={Col} md="12" controlId="validationCustom01" className="my-2">
                                <Form.Label>Surname</Form.Label>
                                <Form.Control
                                    required
                                    type="text"
                                    placeholder="surname"
                                    defaultValue=""
                                    value={formData.surname}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        surname: e.target.value
                                    })}
                                />
                                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            </Form.Group>

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
                                <Form.Label>tel</Form.Label>
                                <Form.Control
                                    required
                                    type="tel"
                                    placeholder="tel"
                                    defaultValue=""
                                    pattern="[0-9]{3} [0-9]{3} [0-9]{4}"
                                    value={formData.tel}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        tel: e.target.value
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
                        <Button type="submit">Registrate </Button>
                        <div className="my-4">
                            Already have account?
                            <Link to="/log-in" className="btn btn-primary mx-3">Log in</Link>

                        </div>
                    </Form>
                </div>
            </section>

            <footer className="advertisement">
                <div className="ad-content">
                    <img src="https://www.cnet.com/a/img/resize/7dc8e84d3224db5e1638db6cf15719eff37f883e/hub/2016/08/11/10c32ae5-990d-44c0-a73f-f1dc0801885e/logitech-create-02.jpg?auto=webp&fit=crop&height=675&width=1200" alt="Computer Advertisement" className="ad-image"/>
                    <div className="ad-text">
                        <h4>Latest Computers</h4>
                        <p>Check out our latest collection of high-performance computers.</p>
                    </div>
                </div>
            </footer>
        </>
    )
}