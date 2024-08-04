import { useEffect, useState } from "react";
import { Carousel, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getUserData, logOut } from "../dataApi/dataApi";

export default function Home() {
    const [user, setUser] = useState();
    useEffect(() => {
        setUser(getUserData())

    }, [])

    function logOutUser() {
        logOut();
        setUser(null)
    }



    function showMenu() {
        if (user) {
            return (
                <Nav className="me-auto">
                    <Link to="/" className="mx-2 p-1">
                        Home
                    </Link>

                    <Link to="/shop" className="mx-2 p-1">
                        Shop
                    </Link>


                    <Link to="/profile" className="mx-2 p-1">
                        Profile
                    </Link>


                    <Link onClick={logOutUser} className="mx-2 p-1 bg-danger text-light rounded">
                        Log out
                    </Link>

                </Nav>

            )
        } else {
            return (
                <Nav className="me-auto">
                    <Link to="/" className="mx-2 p-1">
                        Home
                    </Link>

                    <Link to="/shop" className="mx-2 p-1">
                        Shop
                    </Link>


                    <Link to="/log-in" className="mx-2 p-1">
                        Log in
                    </Link>
                </Nav>


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
                            {showMenu()}







                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </header>
            <section>
                <Carousel>
                    <Carousel.Item>
                       <div className="d-flex justify-content-center">
                        <img src="https://www.bakinity.biz/upload/resize_cache/iblock/0d9/600_600_140cd750bba9870f18aada2478b24840a/0d9f7cc90bf2bced4468af31180b0cca.jpg" alt="" />

                       </div>
                        <Carousel.Caption>
                            <h3></h3>
                            <p></p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                    <div className="d-flex justify-content-center">
                        <img src="https://object.pscloud.io/cms/cms/Photo/img_0_62_2765_9_1.jpg" alt="" />

                       </div>
                        <Carousel.Caption>
                            <h3></h3>
                            <p></p>
                        </Carousel.Caption>
                    </Carousel.Item>
                    <Carousel.Item>
                    <div className="d-flex justify-content-center">
                        <img src="https://st.depositphotos.com/1001069/2170/i/450/depositphotos_21706277-stock-photo-laptop.jpg" alt="" />

                       </div>
                        <Carousel.Caption>
                            <h3></h3>
                            <p>
                                
                            </p>
                        </Carousel.Caption>
                    </Carousel.Item>
                </Carousel>
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