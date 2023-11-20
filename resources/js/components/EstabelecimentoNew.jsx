import React from 'react';
import { Card, Container, Form, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import Layout from './Layout';
import backgroundImage from './imagem.jpg';

export default () => {
    const navigate = useNavigate();

    const handleVoltarClick = () => {
        navigate('/');
    };

    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
        <Layout>
            <Container>
                <h4 className='w-100 py-3 border-bottom border-primary d-flex justify-content-between align-items-center'>
                    <span>Cadastrar estabelecimento</span>
                </h4>
                <Card>
                    <Card.Body>
                        <Form>
                            <Form.Group controlId="formTempoMedio" style={{ marginBottom: '15px' }}>
                                <Form.Label>Tempo médio de atendimento:</Form.Label>
                                <Form.Control type="number" placeholder="Informe o tempo em minutos" />
                            </Form.Group>

                            <Form.Group controlId="formNomeEstabelecimento" style={{ marginBottom: '15px' }}>
                                <Form.Label>Nome do estabelecimento:</Form.Label>
                                <Form.Control type="text" placeholder="Informe o nome do estabelecimento" />
                            </Form.Group>

                            <Form.Group controlId="formCnpj" style={{ marginBottom: '15px' }}>
                                <Form.Label>CNPJ:</Form.Label>
                                <Form.Control type="text" placeholder="Informe o CNPJ" />
                            </Form.Group>

                            <Form.Group controlId="formLocalizacao" style={{ marginBottom: '15px' }}>
                                <Form.Label>Localização:</Form.Label>
                                <Form.Control type="text" placeholder="Informe a localização" />
                            </Form.Group>

                            <div className="d-flex justify-content-between">
                                <Button variant="primary" type="submit">
                                    Cadastrar
                                </Button>

                                <Button variant="primary" onClick={handleVoltarClick}>
                                    Voltar
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </Layout>
        </div>
    );
};
