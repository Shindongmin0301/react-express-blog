import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import '../asset/style/navbar.css';

let Button = styled.button`
  background-color: #fff;
  border: 1px solid #d5d9d9;
  border-radius: 8px;
  box-shadow: rgba(213, 217, 217, .5) 0 2px 5px 0;
  box-sizing: border-box;
  color: #0f1111;
  cursor: pointer;
  display: inline-block;
  font-family: "Amazon Ember",sans-serif;
  font-size: 13px;
  line-height: 29px;
  padding: 0 10px 0 11px;
  position: relative;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  vertical-align: middle;
  width: 100px;

  &:hover 
  background-color: #f7fafa;

  &:focus 
  border-color: #008296;
  box-shadow: rgba(213, 217, 217, .5) 0 2px 5px 0;
  outline: 0;

`;

function Navigator({ user, ...props }) {
  const navigate = useNavigate();

  return (
    <Navbar bg="light" expand="lg" className="custom__navbar">
      <Container>
        <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/blog">
              Blog
            </Nav.Link>
            <Nav.Link as={Link} to="/user-menu">
              User
            </Nav.Link>
          </Nav>
          <Nav>
            {user ? (
              <GreetingUser
                user={user}
                logout={() => {
                  fetch('/api/logout', { method: 'POST' })
                    .then(res => res.json())
                    .then(res => {
                      if (res.success) {
                        props.setUser(null);
                        navigate('/');
                      }
                    });
                }}
              />
            ) : (
              <Link to="/login">Login</Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

function GreetingUser({ user, logout }) {
  return (
    <div className="">
      <h3>Hello {user}</h3>
      <button onClick={logout}>로그아웃</button>
    </div>
  );
}

export default Navigator;
