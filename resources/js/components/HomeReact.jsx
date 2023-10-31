import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const HomeReact = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:8000/api/usuarios')
      .then((response) => response.json())
      .then(json => {
        setUsuarios(json)
      })
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary shadow-sm">
        <Container>
          <Navbar.Brand href="#home">100Fila</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/cadastro" className='nav-link'>Cadastro</Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className='container shadow-lg bg-body rounded mt-5 p-3'>
        <h4 className='p-3 border-bottom border-primary'>Estabelecimentos</h4>
        {isLoading && <Loader isLoading={isLoading} />}
        <ul className='list-group'>
          {usuarios.map((item, index) => <li key={item.id} className='list-group-item'>{item.nome}</li>)}
        </ul>
        <div className='mt-3'>
          <Link to="/cadastro" className='btn btn-primary'>Cadastrar novo estabelecimento</Link>
        </div>
      </div>
    </>);
};

export default HomeReact;
