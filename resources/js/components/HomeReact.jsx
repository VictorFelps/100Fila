import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from './Loader';

const HomeReact = () => {
  const [estabelecimentos, setEstabelecimentos] = useState([]);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true)
    fetch('http://localhost:8001/api/estabelecimento')
      .then((response) => response.json().catch(e => e))
      .then(json => {
        setEstabelecimentos(json)
      })
      .catch(e => { })
      .finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Navbar expand="lg" className="bg-primary shadow-sm">
        <Container>
          <Navbar.Brand href="#home">100Fila</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Link to="/cadastro" className="nav-link">Cadastro</Link>
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
        {estabelecimentos.map((item, index) => {
          console.log("Item:", item); // Verifique se os itens estão sendo iterados corretamente
          return (
            <Card key={item.id} as={Link} to={`/estabelecimento/${item.id}`} style={{ marginBottom: '10px' }}>
              <Card.Body>Estabelecimento</Card.Body>
            </Card>
          )
        })}
        {/* <div className='mt-3'>
            <Link to="/cadastro" className='btn btn-primary'>Cadastrar novo estabelecimento</Link>
        </div> */}
      </div>
    </>);
};

export default HomeReact;
