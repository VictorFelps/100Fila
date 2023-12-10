import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import imagemBackground from './imagem.jpg';

const PerfilReact = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false); // Novo estado para controlar a exclusão

  useEffect(() => {
    const simulateUserData = () => {
      setTimeout(() => {
        const simulatedUserData = {
          name: "Usuário Exemplo",
          email: "usuario@example.com",
        };
        setUserData(simulatedUserData);
        setLoading(false);
      }, 1000);
    };

    simulateUserData();
  }, []);

  const handleDeleteProfile = () => {
    // Lógica para excluir o perfil (simulação)
    setDeleting(true);
    setTimeout(() => {
      // Lógica de exclusão (pode ser uma chamada de API real)
      setUserData(null);
      setLoading(false);
      setDeleting(false);
    }, 1000);
  };

  return (
    <div style={{ backgroundImage: `url(${imagemBackground})`, backgroundSize: 'cover', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ padding: "20px", textAlign: "center", backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px', margin: 'auto', width: '80%', maxWidth: '700px', height: '80vh', maxHeight: '600px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <h2>Perfil do Usuário</h2>
        {loading ? (
          <p>Carregando dados do usuário...</p>
        ) : (
          <Card style={{ width: "100%", height: "80%" }}>

<Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
  <Card.Title>{userData.name}</Card.Title>
  <Card.Text>
    <strong>Email:</strong> {userData.email}
  </Card.Text>
  
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
    <Button variant="primary" style={{ width: '120px', marginBottom: '10px' }}>Editar</Button>
    <Button variant="danger" style={{ width: '120px' }} onClick={handleDeleteProfile} disabled={deleting}>
      {deleting ? 'Excluindo...' : 'Excluir'}
    </Button>
  </div>
</Card.Body>


          </Card>
        )}
      </div>
    </div>
  );
};

export default PerfilReact;
