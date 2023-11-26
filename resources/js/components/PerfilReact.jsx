import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import imagemBackground from './imagem.jpg';  // Ajuste o nome da importação aqui

const PerfilReact = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulando uma chamada assíncrona à API para obter dados do usuário
    const simulateUserData = () => {
      // Supondo que a API de perfil retorna um objeto de usuário após 1 segundo
      setTimeout(() => {
        const simulatedUserData = {
          name: "Usuário Exemplo",
          email: "usuario@example.com",
          avatar: "url-da-imagem-do-avatar.jpg"
        };
        setUserData(simulatedUserData);
        setLoading(false);
      }, 1000);
    };

    simulateUserData();
  }, []);

  return (
    <div style={{ backgroundImage: `url(${imagemBackground})`, backgroundSize: 'cover', minHeight: '100vh', display: 'flex', alignItems: 'center' }}>
      <div style={{ padding: "20px", textAlign: "center", backgroundColor: 'rgba(255, 255, 255, 0.8)', borderRadius: '10px', margin: 'auto', maxWidth: '400px', width: '100%' }}>
        <h2>Perfil do Usuário</h2>
        {loading ? (
          <p>Carregando dados do usuário...</p>
        ) : (
          <Card style={{ width: "18rem", margin: "auto" }}>
            <Card.Img variant="top" src={userData.avatar} alt="Avatar do Usuário" />
            <Card.Body>
              <Card.Title>{userData.name}</Card.Title>
              <Card.Text>
                <strong>Email:</strong> {userData.email}
              </Card.Text>
              {/* Adicione mais detalhes do usuário conforme necessário */}
              <Button variant="primary">Editar Perfil</Button>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PerfilReact;
