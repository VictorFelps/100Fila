import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Button, Card, Modal } from 'react-bootstrap';
import { FaStore, FaMapMarkerAlt, FaFileAlt, FaArrowLeft } from 'react-icons/fa';
import Loader from './Loader';
import Layout from './LayoutEstabelecimento';
import backgroundImage from './imagem.jpg';

const MinhaFila = () => {
  const [estabelecimentos, setEstabelecimentos] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [userId, setUserId] = useState(null);
  const [estabelecimentoEditando, setEstabelecimentoEditando] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [estabelecimentoParaExcluir, setEstabelecimentoParaExcluir] = useState(null);

  useEffect(() => {
    setLoading(true);

    fetch('http://localhost:8001/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
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

  const handleEditar = (estabelecimentoId) => {
    setEstabelecimentoEditando(estabelecimentoId);
  };

  const handleShowModal = (estabelecimentoId) => {
    setEstabelecimentoParaExcluir(estabelecimentoId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setEstabelecimentoParaExcluir(null);
    setShowModal(false);
  };

  const handleExcluir = () => {
    if (!estabelecimentoParaExcluir) {
      return;
    }
  
    const _token = document.querySelector('[name="csrf-token"]').getAttribute("content");
  
    fetch(`http://localhost:8001/api/estabelecimento/${estabelecimentoParaExcluir}`, {
      method: 'DELETE',
      headers: {
        'X-CSRF-TOKEN': _token,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
  
        // Log state before and after deletion
        console.log('State before deletion:', estabelecimentos);
  
        setEstabelecimentos(prevEstabelecimentos => prevEstabelecimentos.filter(estabelecimento => estabelecimento.id !== estabelecimentoParaExcluir));
  
        console.log('State after deletion:', estabelecimentos);
  
        handleCloseModal();
      })
      .catch(error => console.error('Erro na solicitação:', error));
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
                  <Button variant="primary">
                    Administrar Fila
                  </Button>
                </Link>
                <Link to={`/editar-estabelecimento/${item.id}`}>
                  <Button variant="success" className="mx-2">
                    Editar
                  </Button>
                </Link>
                <Button variant="danger" onClick={() => handleShowModal(item.id)}>
                  Excluir
                </Button>
              </Card.Body>
            </Card>
          ))}

          {/* Componente de edição */}
          {estabelecimentoEditando && (
            <div>
              <p>Edição do estabelecimento com ID {estabelecimentoEditando}</p>
            </div>
          )}

          {/* Modal de confirmação para exclusão */}
          <Modal show={showModal} onHide={handleCloseModal}>
            <Modal.Header closeButton>
              <Modal.Title>Confirmar Exclusão</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>Tem certeza de que deseja excluir este estabelecimento?</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancelar
              </Button>
              <Button variant="danger" onClick={handleExcluir}>
                Excluir
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </Layout>
    </div>
  );
};

export default MinhaFila;
