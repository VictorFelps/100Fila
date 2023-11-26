import React, { useEffect, useState } from "react";
import { Card, Button } from "react-bootstrap";
import imagemBackground from './imagem.jpg';

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
        };
        setUserData(simulatedUserData);
        setLoading(false);
      }, 1000);
    };

    simulateUserData();
  }, []);

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
              {/* Adicione mais detalhes do usuário conforme necessário */}
              <Button variant="primary" style={{ width: '150px', marginTop: '10px' }}>Editar Perfil</Button>
              {/* Ajuste a largura e a margem conforme necessário */}
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
};

export default PerfilReact;
