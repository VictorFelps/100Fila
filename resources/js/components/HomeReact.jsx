import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Form } from 'react-bootstrap';
import { FaStore, FaMapMarkerAlt, FaFileAlt, FaSearch, FaClock } from 'react-icons/fa';
import Loader from './Loader';
import Layout from './Layout';
import backgroundImage from './imagem.jpg';

const HomeReact = () => {
  const [estabelecimentos, setEstabelecimentos] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    setLoading(true);
    fetch('http://localhost:8001/api/estabelecimento')
      .then((response) => response.json().catch(e => e))
      .then(json => {
        setEstabelecimentos(json);
      })
      .catch(e => { })
      .finally(() => setLoading(false));
  }, []);

  const filterEstabelecimentos = () => {
    return estabelecimentos.filter(item =>
      item.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.cnpj.includes(searchTerm) ||
      item.local.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh' }}>
      <Layout>
        <div className='container shadow-lg bg-body rounded mt-5 p-3'>
          <h4 className='w-100 py-3 border-bottom border-primary d-flex justify-content-between align-items-center'>
            <span>Estabelecimentos</span>
          </h4>

          <Form.Group controlId="formSearch" className="mb-3 position-relative">
            <div className="d-flex align-items-center rounded border">
              <Form.Control
                type="text"
                placeholder="Pesquisar..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input border-0"
              />
              <div className="bg-primary text-white p-2 rounded-end">
                <FaSearch style={{ cursor: 'pointer' }} />
              </div>
            </div>
          </Form.Group>

          {isLoading && <Loader isLoading={isLoading} />}

          {filterEstabelecimentos().map((item, index) => (
            <Card key={item.id} as={Link} to={`/estabelecimento/${item.id}`} style={{ marginBottom: '10px' }}>
              <Card.Body>
                <h5>
                  <FaStore className='mr-2' />
                  {item.nome}
                </h5>
                <p>
                  <FaFileAlt className='mr-2' />
                  <strong>CNPJ:</strong> {item.cnpj}
                </p>
                <p>
                  <FaMapMarkerAlt className='mr-2' />
                  <strong>Localização:</strong> {item.local}
                </p>
                <p>
                  <FaClock className='mr-2' />
                  <strong>Tempo médio:</strong> {item.tempo} minutos
                </p>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Layout>
    </div>
  );
};

export default HomeReact;
