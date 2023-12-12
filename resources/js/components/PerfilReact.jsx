import React, { useEffect, useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import imagemBackground from './imagem.jpg';

const PerfilReact = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newName, setNewName] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('/api/usuarios/1'); // Substitua '/api/usuarios/1' pela rota real da sua API para buscar o usuário pelo ID 1
        const userDataFromApi = await response.json();
        setUserData(userDataFromApi);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar dados do usuário:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleEditProfile = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewName('');
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch(`/api/usuarios/${userData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ name: newName }),
      });

      if (response.ok) {
        const updatedUserData = await response.json();
        setUserData(updatedUserData);
        handleCloseModal();
      } else {
        console.error('Erro ao salvar alterações no nome do usuário.');
      }
    } catch (error) {
      console.error('Erro na solicitação:', error);
    }
  };

  return (
    <div style={{ backgroundImage: `url(${imagemBackground})`, backgroundSize: 'cover', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ position: 'relative', padding: "20px", textAlign: "center", backgroundColor: 'rgba(255, 255, 255, 0.9)', borderRadius: '10px', margin: 'auto', width: '80%', maxWidth: '700px', height: '80vh', maxHeight: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <h2 style={{ marginBottom: '20px', color: '#333' }}>Perfil do Usuário</h2>
        {loading ? (
          <p style={{ color: '#666' }}>Carregando dados do usuário...</p>
        ) : (
          <Card style={{ width: "100%", height: "80%", borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
              <Card.Title style={{ fontSize: '24px', marginBottom: '10px', fontWeight: 'bold', color: '#333' }}>{userData.name}</Card.Title>
              <Card.Text style={{ color: '#666' }}>
                <strong>Email:</strong> {userData.email}
              </Card.Text>

              {/* Botão "Editar Perfil" movido para a parte inferior esquerda */}
              <Button variant="primary" onClick={handleEditProfile} style={{ position: 'absolute', bottom: '20px', left: '20px', width: '150px' }}>
                Editar Perfil
              </Button>

              <Link to="/" style={{ position: 'absolute', bottom: '20px', right: '20px' }}>
                <button className="btn btn-info">
                  Voltar
                </button>
              </Link>
            </Card.Body>
          </Card>
        )}

        {/* Modal de Edição */}
        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Nome de Usuário</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicName">
                <Form.Label>Novo Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite o novo nome"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Fechar
            </Button>
            <Button variant="primary" onClick={handleSaveChanges}>
              Salvar Alterações
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default PerfilReact;
