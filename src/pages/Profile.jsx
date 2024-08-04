import { useEffect, useRef } from "react";
import { deleteProductFromDatabase, editProductFromDatabase, getUserData } from "../dataApi/dataApi";
import { Button, Container, Nav, Navbar, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import { useState } from 'react';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import { addNewProductToDatabase } from "../dataApi/dataApi2";


export default function Profile() {
    const [user, setUser] = useState();
    const [showImageModal, setShowImageModal] = useState(false);
    const [imageModalUrl, setImageModalUrl] = useState('');

    const [showModal, setShowModal] = useState(false);

    const [currentProduct, setCurrentProduct] = useState({})

    const [validated, setValidated] = useState(false);

    const imageRef = useRef();

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            event.preventDefault();
            if (currentProduct.id) {
                const updatedProducts = user.products.map(product =>
                    product.id === currentProduct.id ? currentProduct : product
                )
                setUser(editProductFromDatabase(user, updatedProducts))

            } else {
                const newProduct = { ...currentProduct, id: Math.random() * 1000 }
                setUser(addNewProductToDatabase(user, newProduct))
            }
            setShowModal(false)
        }

        setValidated(true);
    };

    function handleChange(event) {
        const { name, value } = event.target;
        setCurrentProduct({ ...currentProduct, [name]: value })
        if (name === 'img') {
            imageRef.src = value;
        }
    }


    useEffect(() => {
        setUser(getUserData());
    }, []);

    function showImageInModal(url) {
        setImageModalUrl(url);
        setShowImageModal(true);
    }

    function deleteProduct(productId) {
        setUser(deleteProductFromDatabase(user.id, productId));
    }

    function editProduct(product) {
        setCurrentProduct(product)
        setShowModal(true)
    }

    function createNewProduct() {
        setCurrentProduct({})
        setShowModal(true)

    }

    return (
        <>
            <header>
                <Navbar expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand href="">
                            <Link to="/">Smartphone shop</Link>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Link to="/" className="mx-2 p-1">Home</Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>

            <section className="container my-4">
                <Button className="btn btn-primary" onClick={createNewProduct}>Add product</Button>

                <div className="my-3">
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>id</th>
                                <th>Name</th>
                                <th>Image</th>
                                <th>Price</th>
                                <th>Operation</th>
                            </tr>
                        </thead>
                        <tbody>
                            {user && user.products.map((product) => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>
                                        <img
                                            src={product.img}
                                            className="w100px "
                                            onClick={() => showImageInModal(product.img)}
                                            alt=""
                                        />
                                    </td>
                                    <td>{product.price}$</td>
                                    <td>
                                        <Button
                                            className="btn btn-danger mx-2"
                                            onClick={() => deleteProduct(product.id)}
                                        >
                                            Delete
                                        </Button>
                                        <Button className="btn btn-primary mx-2 " onClick={() => editProduct(product)}>
                                            Edit
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </div>
            </section>



            <Modal size="lg" show={showModal} onHide={() => { setShowModal(false) }}>
                <Modal.Header closeButton>
                    <Modal.Title>{currentProduct.id ? "Edit Product" : " New Product"}</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row className="mb-3">
                            <Col>
                                <Form.Group as={Col} controlId="validationCustom01" className="my-2">
                                    <Form.Label>Category</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="category"
                                        name="category"
                                        value={currentProduct.category || ""}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} controlId="validationCustom01" className="my-2">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="name"
                                        name="name"
                                        value={currentProduct.name || ""}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} controlId="validationCustom01" className="my-2">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="description"
                                        name="description"
                                        value={currentProduct.description || ""}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>


                                <Form.Group as={Col} controlId="validationCustom01" className="my-2">
                                    <Form.Label>Price</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="price"
                                        name="price"
                                        value={currentProduct.price || ""}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} controlId="validationCustom01" className="my-2">
                                    <Form.Label>New</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="new"
                                        name="new"
                                        value={currentProduct.new || ""}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>


                                <Form.Group as={Col} controlId="validationCustom01" className="my-2">
                                    <Form.Label>Image</Form.Label>
                                    <Form.Control
                                        required
                                        type="url"
                                        placeholder="image url"
                                        name="img"
                                        value={currentProduct.img || ""}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                    <img className="w100px my-2" ref={imageRef} src={currentProduct.img || ""} alt="" />
                                </Form.Group>

                            </Col>



                            <Col>


                                <Form.Group as={Col} controlId="validationCustom01" className="my-2">
                                    <Form.Label>Ram</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="ram"
                                        name="ram"
                                        value={currentProduct.ram || ""}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} controlId="validationCustom01" className="my-2">
                                    <Form.Label>CPU</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="cpu"
                                        name="cpu"
                                        value={currentProduct.cpu || ""}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} controlId="validationCustom01" className="my-2">
                                    <Form.Label>Rom</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="rom"
                                        name="rom"
                                        value={currentProduct.rom || ""}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group as={Col} controlId="validationCustom01" className="my-2">
                                    <Form.Label>Rom type</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="romType"
                                        name="romType"
                                        value={currentProduct.romType || ""}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>



                                <Form.Group as={Col} controlId="validationCustom01" className="my-2">
                                    <Form.Label>Operating system</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="operatingSystem"
                                        name="operatingSystem"
                                        value={currentProduct.operatingSystem || ""}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>


                                <Form.Group as={Col} controlId="validationCustom01" className="my-2">
                                    <Form.Label>Video Card</Form.Label>
                                    <Form.Control
                                        required
                                        type="text"
                                        placeholder="video card"
                                        name="videoCard"
                                        value={currentProduct.videoCard || ""}
                                        onChange={handleChange}
                                    />
                                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                                </Form.Group>




                            </Col>

                        </Row>
                        <Form.Group className="mb-3">
                            <Form.Check
                                required
                                label="Agree "
                                feedback="You must agree before submitting."
                                feedbackType="invalid"
                            />
                        </Form.Group>
                        <Button type="submit">Save</Button>
                        <Button type="reset" className="mx-2" variant="warning" onClick={() => setCurrentProduct({})}>
                            Reset
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>


                </Modal.Footer>
            </Modal>



            <Modal show={showImageModal} onHide={() => setShowImageModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Product Image</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img
                        src={imageModalUrl}
                        alt="Product"
                        style={{ width: '100%', height: 'auto' }}
                    />
                </Modal.Body>
            </Modal>


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
    );
}