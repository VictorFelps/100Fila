import React from 'react';
import { Card, Container, Form, Button } from 'react-bootstrap';
import Layout from './Layout';

export default () => {
    return (
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

                            <Button variant="primary" type="submit" style={{ marginTop: '10px' }}>
                                Cadastrar
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </Layout>
    );
};
