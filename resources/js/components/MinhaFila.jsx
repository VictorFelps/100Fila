import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card } from 'react-bootstrap';
import { FaStore, FaMapMarkerAlt, FaFileAlt, FaArrowLeft } from 'react-icons/fa';
import Loader from './Loader';
import Layout from './Layout';
import backgroundImage from './imagem.jpg';

const MinhaFila = () => {
  const [estabelecimentos, setEstabelecimentos] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    setLoading(true);

    fetch('http://localhost:8001/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        // Adicione o token de autenticação, se necessário
        // 'Authorization': `Bearer ${seuTokenDeAutenticacao}`,
      },
    })
      .then((response) => response.json())
      .then((userData) => {
        setUserId(userData.id);

        return fetch(`http://localhost:8001/api/estabelecimento?minhas-filas=1`);
      })
      .then((response) => response.json())
      .then((json) => {
        setEstabelecimentos(json);
      })
      .catch((error) => {
        console.error('Erro ao buscar estabelecimentos:', error);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  const filterEstabelecimentos = () => {
    return estabelecimentos.filter((item) =>
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
            <span>Minha(s) Fila(s)</span>
            <Link to="/home-estabelecimento">
              <Button variant="outline-primary">
                <FaArrowLeft className='mr-2' />
                Voltar para Home
              </Button>
            </Link>
          </h4>

          {isLoading && <Loader isLoading={isLoading} />}

          {filterEstabelecimentos().map((item, index) => (
            <Card key={item.id} style={{ marginBottom: '10px' }}>
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

                <Link to={`/administrar-fila/${item.id}`}>
                  <Button variant="primary">Administrar Fila</Button>
                </Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Layout>
    </div>
  );
};

export default MinhaFila;
