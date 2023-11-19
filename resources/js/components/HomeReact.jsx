import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import Layout from './Layout';

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
    <Layout>
      <div className='container shadow-lg bg-body rounded mt-5 p-3'>
        <h4 className='w-100 py-3 border-bottom border-primary d-flex justify-content-between align-items-center'>
          <span>Estabelecimentos</span>
          <Link to={'/estabelecimento/novo'} className='btn btn-primary'>Novo estabelecimento</Link>
        </h4>
        {isLoading && <Loader isLoading={isLoading} />}
        {estabelecimentos.map((item, index) => {
          console.log("Item:", item); // Verifique se os itens estão sendo iterados corretamente
          return (
            <Card key={item.id} as={Link} to={`/estabelecimento/${item.id}`} style={{ marginBottom: '10px' }}>
              <Card.Body>
                <h5>{item.nome}</h5>
                <p><strong>CNPJ:</strong> {item.cnpj}</p>
                <p><strong>Localização:</strong> {item.local}</p>
              </Card.Body>
            </Card>
          )
        })}
        {/* <div className='mt-3'>
              <Link to="/cadastro" className='btn btn-primary'>Cadastrar novo estabelecimento</Link>
          </div> */}
      </div>
    </Layout>

  );
};

export default HomeReact;
