import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import backgroundImage from './imagem.jpg';

export default function LoginReact() {
    const navigate = useNavigate();
    const [loginError, setLoginError] = useState(false);
    const [loginType, setLoginType] = useState('usuario');

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        const _token = document.querySelector('[name="csrf-token"]').getAttribute("content");

        fetch('/login', {
            method: 'POST', 
            headers: {
                'X-CSRF-TOKEN': _token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({...data, _token, type: loginType})
        })
        .then(response => {
            if (response.ok) {
                // Login bem-sucedido, redirecione para a página apropriada
                if (loginType === 'usuario') {
                    navigate('/');
                } else if (loginType === 'estabelecimento') {
                    navigate('/home-estabelecimento');
                }
            } else {
                // Login falhou, exibir mensagem de erro
                setLoginError(true);
            }
        })
        .catch(error => console.error('Erro na solicitação:', error));
    };

    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
            <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
                <Card style={{ width: '400px', height: '300px' }}>
                    <Card.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Endereço de E-mail</Form.Label>
                                <Form.Control type="email" placeholder="Digite seu email" {...register("email", { required: true })} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Senha</Form.Label>
                                <Form.Control type="password" placeholder="Digite sua senha" {...register("password", { required: true })} />
                                {loginError && <p className="text-danger">Credenciais inválidas. Por favor, tente novamente.</p>}
                            </Form.Group>

                            <div className="d-flex justify-content-center">
                                <Button
                                    variant={loginType === 'usuario' ? 'success' : 'secondary'}
                                    className="me-1"
                                    onClick={() => setLoginType('usuario')}
                                >
                                    Usuário
                                </Button>
                                <Button
                                    variant={loginType === 'estabelecimento' ? 'success' : 'secondary'}
                                    onClick={() => setLoginType('estabelecimento')}
                                >
                                    Administrador
                                </Button>
                            </div>

                            <div className="d-grid gap-2 mt-3">
                                <Button variant="primary" type="submit" onClick={handleSubmit(onSubmit)}>
                                    Login
                                </Button>
                            </div>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}
