import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';

const Headers = () => {
  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="/"><span style={{ color: "blue" }}>F</span>ASCLE</Navbar.Brand>
          <Nav className="me-auto">
            <Link style={{ textDecoration: "none", fontSize: "1.2rem" }} to="/">Home</Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  )
}

export default Headers