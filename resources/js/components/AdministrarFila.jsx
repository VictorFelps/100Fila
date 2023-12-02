import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Button, Container, Row, Col, Card, Table } from 'react-bootstrap';
import backgroundImage from './imagem.jpg';

const AdministrarFila = () => {
  const { id } = useParams();
  const [fila, setFila] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8001/api/estabelecimento/${id}/fila/pessoas`)
      .then(response => response.json())
      .then(data => setFila(data))
      .catch(error => console.error('Erro ao buscar fila:', error));
  }, [id]);

  const adicionarPessoaFila = () => {
    fetch(`http://localhost:8001/api/estabelecimento/${id}/fila/adicionar`, { method: 'POST' })
      .then(() => atualizarFila())
      .catch(error => console.error('Erro ao adicionar pessoa à fila:', error));
  };

  const chamarPessoaFila = () => {
    if (fila.length > 0) {
      const pessoaChamada = fila[0];
      notificarUsuario(pessoaChamada.nome);
    }
    removerPessoaFila();
  };

  const removerPessoaFila = () => {
    fetch(`http://localhost:8001/api/estabelecimento/${id}/fila/remover`, { method: 'DELETE' })
      .then(() => atualizarFila())
      .catch(error => console.error('Erro ao remover pessoa da fila:', error));
  };

  const atualizarFila = () => {
    fetch(`http://localhost:8001/api/estabelecimento/${id}/fila`)
      .then(response => response.json())
      .then(data => setFila(data))
      .catch(error => console.error('Erro ao buscar fila:', error));
  };

  const notificarUsuario = (nomePessoa) => {
    if ('Notification' in window) {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification(`Pessoa chamada: ${nomePessoa}`);
        }
      });
    }
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container className="mt-5">

        <Row className="mb-3">
          <Col>
            <Card style={{ color: 'Black' }}>
              <Card.Body>
                <h2>Administrar Fila</h2>
                <p>Fila do estabelecimento #{id}</p>
                <Card.Title>Quantidade de Pessoas na Fila</Card.Title>
                <Button variant="success" onClick={chamarPessoaFila} disabled={loading} className="float-right">
                  Chamar Pessoa da Fila
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card style={{ color: 'Black' }}>
          <Card.Body>
            <Card.Title>Informações da Fila</Card.Title>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>E-mail</th>
                  <th>Tempo de Espera</th>
                  <th>Posição na Fila</th>
                </tr>
              </thead>
              <tbody>
                {fila.map((pessoa, index) => (
                  <tr key={index}>
                    <td>{pessoa.user.name}</td>
                    <td>{pessoa.user.email}</td>
                    <td>{formatarTempoEspera(pessoa.estabelecimento.tempo)}</td>
                    <td>{index + 1}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

const formatarTempoEspera = (tempoEsperaEmMinutos) => {
  const horas = Math.floor(tempoEsperaEmMinutos / 60);
  const minutos = tempoEsperaEmMinutos % 60;
  return `${horas}h ${minutos}min`;
};

export default AdministrarFila;
