import React, { useRef } from "react";
import Logo from "../assets/avatar.svg";
import { Nav, Navbar, Container, Form, Button } from "react-bootstrap";
import { useAuthContext } from "../contexts/AuthContext.js";
import { Link } from "react-router-dom";

export default function NavigationBar() {
  const searchRef = useRef();
  const { setSearchTerm } = useAuthContext();

  function handleSubmit(e) {
    e.preventDefault();
    setSearchTerm(searchRef.current.value);
  }

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand href="/">Github Users Search</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              href="/login"
              onClick={() => {
                localStorage.clear();
              }}
            >
              Log Out
            </Nav.Link>
          </Nav>
          <Form className="d-flex" onSubmit={handleSubmit}>
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
              ref={searchRef}
            />
            <Button type="submit" variant="outline-success">
              Search
            </Button>
          </Form>
        </Navbar.Collapse>
        <Link to="/profile">
          <img
            style={{ marginLeft: "2rem" }}
            src={Logo}
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="avatar"
          />
        </Link>
      </Container>
    </Navbar>
  );
}
