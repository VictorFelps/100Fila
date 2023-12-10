import React from 'react';
import { Card, Container, Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Layout from './Layout';
import backgroundImage from './imagem.jpg'; // Importe a imagem aqui
import { useForm } from 'react-hook-form';

export default () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const handleVoltarClick = () => {
        navigate('/home-estabelecimento');
    };

    const onSubmit = (data) => {
        const _token = document.querySelector('[name="csrf-token"]').getAttribute("content");

        fetch('/api/estabelecimento', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': _token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ ...data, _token })
        })
            .then(response => {
                navigate('/home-estabelecimento');
            })
            .catch(error => console.error('Erro na solicitação:', error));
    }

    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh' }}>
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
                                    <Form.Control type="number"
                                        className={errors?.tempo && "input-error"}
                                        placeholder="Informe o tempo em minutos"
                                        {...register("tempo", { required: true })} />
                                </Form.Group>

                                <Form.Group controlId="formNomeEstabelecimento" style={{ marginBottom: '15px' }}>
                                    <Form.Label>Nome do estabelecimento:</Form.Label>
                                    <Form.Control type="text"
                                        className={errors?.nome && "input-error"}
                                        placeholder="Informe o nome do estabelecimento"
                                        {...register("nome", { required: true })} />
                                </Form.Group>

                                <Form.Group controlId="formCnpj" style={{ marginBottom: '15px' }}>
                                    <Form.Label>CNPJ:</Form.Label>
                                    <Form.Control type="text"
                                        className={errors?.cnpj && "input-error"}
                                        placeholder="Informe o CNPJ"
                                        {...register("cnpj", { required: true })} />
                                </Form.Group>

                                <Form.Group controlId="formLocalizacao" style={{ marginBottom: '15px' }}>
                                    <Form.Label>Localização:</Form.Label>
                                    <Form.Control type="text"
                                        className={errors?.local && "input-error"}
                                        placeholder="Informe a localização"
                                        {...register("local", { required: true })} />
                                </Form.Group>

                                <div className="d-flex justify-content-between">
                                    <Button variant="primary" onClick={handleSubmit(onSubmit)}>
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
