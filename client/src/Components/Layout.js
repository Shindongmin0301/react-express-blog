import './Layout.scss';

import { Outlet } from 'react-router-dom';
import { Navbar, Nav } from 'react-bootstrap';
import { useContext, useState, useEffect } from 'react';
import UserContext from '../contexts/UserContext';
import { LoginBtn } from './Buttons';
import UserMenu from './UserMenu';

import Login from '../pages/Login';

const Layout = () => {
  const { user } = useContext(UserContext);

  const [loginForm, setLoginForm] = useState(false);
  const closeLoginForm = () => setLoginForm(false);
  const showLoginForm = () => setLoginForm(true);
  return (
    <div>
      <header>
        <Navbar className="navbar-wrap">
          <div className="page-container navbar-container">
            <Navbar.Brand href="/" className="navbar__logo">
              React Blog
            </Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#">Blog</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
            <Nav className="navbar__user-menu"></Nav>
            {!user ? <LoginBtn showLoginForm={showLoginForm} /> : <UserMenu />}
          </div>
        </Navbar>
      </header>
      <main>
        <Outlet />
      </main>

      {loginForm && <Login closeLoginForm={closeLoginForm} />}
    </div>
  );
};

export default Layout;
