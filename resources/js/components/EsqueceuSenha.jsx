// EsqueceuSenha.jsx

import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import backgroundImage from './imagem.jpg';


export default function EsqueceuSenha() {
    const [email, setEmail] = useState('');
    const [resetSent, setResetSent] = useState(false);

    const handleResetSubmit = (e) => {
        e.preventDefault();
        // Add logic here to send a password reset email
        setResetSent(true);
    };

    return (
        <div className="esqueceu-senha-container" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <Card className="esqueceu-senha-card">
                    <Card.Body>
                        {resetSent ? (
                            <div>
                                <p className="text-success">Um e-mail de redefinição de senha foi enviado para o seu endereço de e-mail.</p>
                                <p>Por favor, verifique sua caixa de entrada e siga as instruções.</p>
                            </div>
                        ) : (
                            <div>
                                <p>Esqueceu sua senha? Insira seu endereço de e-mail abaixo e enviaremos instruções para redefinição.</p>
                                <Form onSubmit={handleResetSubmit}>
                                    <Form.Group controlId="formBasicEmail">
                                        <Form.Label>Endereço de E-mail</Form.Label>
                                        <Form.Control type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </Form.Group>
                                    <Button variant="primary" type="submit">
                                        Enviar Instruções
                                    </Button>
                                </Form>
                            </div>
                        )}
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}
