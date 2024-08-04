import { useEffect, useState } from "react";
import { Container, Form, ListGroup, Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllCategories, getAllProducts } from "../dataApi/dataApi";
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function Shop() {
    const [category, setCategory] = useState([]);
    const [products, setProducts] = useState([]);
    const [FilterProducts, setFilterProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [productInfoModal, setProductInfoModal] = useState({});

    const handleClose = () => setShow(false);
    const handleShow = (info) => {
        setProductInfoModal(info);
        setShow(true);
    }

    useEffect(() => {
        setCategory(getAllCategories());
        const fetchedProducts = getAllProducts();
        setProducts(fetchedProducts);
        setFilterProducts(fetchedProducts);
    }, []);

    function filterProductsByCategory(category) {
        setFilterProducts(products.filter(product => product.category.toLowerCase().includes(category.toLowerCase())));
    }

    function filterProductByText(e) {
        const searchText = e.target.value.toLowerCase();
        setFilterProducts(products.filter(product => product.name.toLowerCase().includes(searchText)));
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
            <section className="mt-3">
                <div className="container row m-auto">
                    <div className="col-2">
                        <Form.Control
                            className="my-2"
                            onChange={filterProductByText}
                            size="md"
                            type="text"
                            placeholder="search"
                        />
                        <ListGroup>
                            <ListGroup.Item onClick={() => setFilterProducts(getAllProducts())}>all</ListGroup.Item>
                            {category.map((cat, index) => (
                                <ListGroup.Item key={index} onClick={() => filterProductsByCategory(cat)}>{cat}</ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>

                    <div className="col-10">
                        <Row xs={2} md={5} className="g-2">
                            {FilterProducts.map((product, index) => (
                                <Col key={index}>
                                    <Card>
                                        <Card.Img variant="top" src={product.img} className="p-2" />
                                        <Card.Body>
                                            <div>
                                                <div>name: {product.name}</div>
                                                <div>description: {product.description}</div>
                                                <div>price: {product.price}</div>
                                                <div>new: {product.new}</div>
                                            </div>
                                            <div className="text-center my-2">
                                                <Button variant="primary" onClick={() => handleShow(product)}>
                                                    more info
                                                </Button>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
                </div>
            </section>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Full info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        <div>
                            <img src={productInfoModal.img} alt="" />
                        </div>
                        <div className="row my-4">
                            <div className="col">
                                <p>category: {productInfoModal.category}</p>
                                <p>name: {productInfoModal.name}</p>
                                <p>description: {productInfoModal.description}</p>
                                <p>price: {productInfoModal.price}</p>
                                <p>new: {productInfoModal.new}</p>
                            </div>
                            <div className="col">
                            <p>ram: {productInfoModal.ram}</p>
                            <p>cpu: {productInfoModal.cpu}</p>
                            <p>rom: {productInfoModal.rom}</p>
                            <p>operarating system: {productInfoModal.operatingSystem}</p>
                            <p>videCard: {productInfoModal.videoCard}</p>

                            </div>
                        </div>
                    </div>
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