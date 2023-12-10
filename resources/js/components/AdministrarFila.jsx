import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button, Container, Row, Col, Card, Table } from 'react-bootstrap';
import backgroundImage from './imagem.jpg';

const AdministrarFila = () => {
  const { id } = useParams();
  const [fila, setFila] = useState([]);
  const [loading, setLoading] = useState(false);

  const requestFila = () => {
    fetch(`http://localhost:8001/api/estabelecimento/${id}/fila/pessoas`)
      .then(response => response.json())
      .then(data => setFila(data.map(pessoa => ({ ...pessoa, tempoEntradaFila: new Date() }))))
      .catch(error => console.error('Erro ao buscar fila:', error));
  };

  useEffect(() => {
    const interval = setInterval(requestFila, 3000);
    return () => clearInterval(interval);
  }, [id]);

  const adicionarPessoaFila = () => {
    fetch(`http://localhost:8001/api/estabelecimento/${id}/fila/adicionar`, { method: 'POST' })
      .then(() => atualizarFila())
      .catch(error => console.error('Erro ao adicionar pessoa à fila:', error));
  };

  const chamarPessoaFila = () => {
    if (fila.length > 0) {
      fetch(`http://localhost:8001/api/estabelecimento/${id}/fila/chamar-da-fila`, { method: 'GET' })
    } else {
      alert('Não há ninguém na fila no momento.');
    }
  };

  const removerPessoaFila = () => {
    fetch(`http://localhost:8001/api/estabelecimento/${id}/fila/remover`, { method: 'DELETE' })
      .then(() => atualizarFila())
      .catch(error => console.error('Erro ao remover pessoa da fila:', error));
  };

  const atualizarFila = async () => {
    const data = await fetch(`http://localhost:8001/api/estabelecimento/${id}/fila`)
      .then(response => response.json())
      .catch(error => console.error('Erro ao buscar fila:', error));

    const filaAtualizada = data.map(pessoa => ({
      ...pessoa,
      tempoEntradaFila: fila.find(p => p.id === pessoa.id)?.tempoEntradaFila || new Date(),
    }));

    setFila(filaAtualizada);
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

  const formatarTempoEspera = (tempoEntradaFila) => {
    const tempoDecorridoEmSegundos = Math.floor((new Date() - new Date(tempoEntradaFila)) / 1000);
    const horas = Math.floor(tempoDecorridoEmSegundos / 3600);
    const minutos = Math.floor((tempoDecorridoEmSegundos % 3600) / 60);
    const segundos = tempoDecorridoEmSegundos % 60;

    return `${horas}h ${minutos}min ${segundos}s`;
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
                <Button variant="success" onClick={chamarPessoaFila} disabled={loading} className="float-right">
                  Chamar Pessoa da Fila
                </Button>
                <Link to="/minha-fila" className="btn btn-primary ms-2">
                  Voltar
                </Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Card style={{ color: 'Black' }}>
          <Card.Body>
            <Card.Title>Informações da Fila</Card.Title>
            {fila.length > 0 ? (
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
                      <td>{formatarTempoEspera(pessoa.tempoEntradaFila)}</td>
                      <td>{index + 1}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>Não há ninguém na fila no momento.</p>
            )}
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default AdministrarFila;
