import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { FaStore, FaMapMarkerAlt, FaFileAlt, FaUsers, FaClock } from 'react-icons/fa';
import Loader from './Loader';
import Layout from './LayoutEstabelecimento';
import backgroundImage from './imagem.jpg'; // Import the background image

const HomeReact = () => {
  const [estabelecimentos, setEstabelecimentos] = useState([]);
  const [isLoading, setLoading] = useState(false);

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

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <Layout>
        <div className='container shadow-lg bg-body rounded mt-5 p-3'>
          <h4 className='w-100 py-3 border-bottom border-primary d-flex justify-content-between align-items-center'>
            <span>Estabelecimentos</span>
            <div>
              <Link to={'/estabelecimento/novo'} className='btn btn-primary' style={{ marginRight: '8px' }}>
                <FaFileAlt className='mr-2' />
                Novo estabelecimento
              </Link>
              <Link to={'/minha-fila'} className='btn btn-success'>
                <FaUsers className='mr-2' />
                Minha(s) Fila(s)
              </Link>
            </div>
          </h4>
          {isLoading && <Loader isLoading={isLoading} />}
          {estabelecimentos.map((item, index) => (
            <Card style={{ marginBottom: '10px' }} key={index}>
              <Card.Body>
                <h5>
                  <FaStore style={{ marginRight: '8px' }} />
                  {item.nome}
                </h5>
                <p>
                  <FaFileAlt style={{ marginRight: '8px' }} />
                  <strong>CNPJ:</strong> {item.cnpj}
                </p>
                <p style={{ marginTop: '-10px' }}> {/* Adjust the marginTop value */}
                  <FaMapMarkerAlt style={{ marginRight: '8px' }} />
                  <strong>Localização:</strong> {item.local}
                </p>
                <p>
                  <FaClock style={{ marginRight: '8px' }} />
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
