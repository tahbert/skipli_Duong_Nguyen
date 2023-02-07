import React, { useRef } from 'react'
import Logo from "../assets/icone-github-noir.png"
import { Nav, Navbar, Container, Form, Button } from 'react-bootstrap'
import { useAuthContext } from '../contexts/AuthContext.js'

export default function NavigationBar() {
    const searchRef = useRef()
    const { setSearchTerm } = useAuthContext()

    function handleSubmit(e) {
        e.preventDefault()
        setSearchTerm(searchRef.current.value)
    }

    return (
        <Navbar bg="light" expand="lg">
            <Container fluid>
                <Navbar.Brand href="/">Search Github Users</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Nav.Link href="/logout">Log Out</Nav.Link>
                    </Nav>
                    <Form className="d-flex" onSubmit={handleSubmit}>
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                            ref={searchRef}
                        />
                        <Button type='submit' variant="outline-success">Search</Button>
                    </Form>
                </Navbar.Collapse>
                <Navbar.Brand href="#">
                    <img
                        style={{ marginLeft: '2rem' }}
                        src={Logo}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                        alt="React Bootstrap logo"
                    />
                </Navbar.Brand>
            </Container>
        </Navbar>
    )
}
