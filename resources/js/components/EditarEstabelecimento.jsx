import React, { useEffect, useState } from 'react';
import { Card, Container, Form, Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from './Layout';
import backgroundImage from './imagem.jpg';
import { useForm } from 'react-hook-form';

const EditarEstabelecimento = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const { register, handleSubmit, formState: { errors }, setValue } = useForm();
    const [modoEdicao, setModoEdicao] = useState(false);
    const [estabelecimento, setEstabelecimento] = useState({
        tempo: '',
        nome: '',
        cnpj: '',
        local: '',
    });

    useEffect(() => {
        if (id) {
            setModoEdicao(true);

            fetch(`/api/estabelecimento/${id}`)
                .then(response => response.json())
                .then(data => {
                    setEstabelecimento(data);
                })
                .catch(error => console.error('Erro ao buscar estabelecimento:', error));
        }
    }, [id]);

    const handleVoltarClick = () => {
        navigate('/home-estabelecimento');
    };

    const onSubmit = (data) => {
        const _token = document.querySelector('[name="csrf-token"]').getAttribute("content");
        const url = modoEdicao ? `/api/estabelecimento/${id}` : '/api/estabelecimento';
        const method = modoEdicao ? 'PUT' : 'POST';

        fetch(url, {
            method,
            headers: {
                'X-CSRF-TOKEN': _token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ ...data, _token })
        })
            .then(response => response.json())
            .then(updatedEstabelecimento => {
                // Faça algo com os dados atualizados se necessário
                console.log('Estabelecimento atualizado:', updatedEstabelecimento);

                // Navegue de volta para a lista de estabelecimentos ou faça alguma outra ação necessária
                navigate('/home-estabelecimento');
            })
            .catch(error => console.error('Erro na solicitação:', error));
    };

    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh' }}>
            <Layout>
                <Container>
                    <Card>
                        <Card.Body>
                            <h4 className='w-100 py-3 border-bottom border-primary d-flex justify-content-between align-items-center'>
                                <span>{modoEdicao ? 'Editar estabelecimento' : 'Cadastrar estabelecimento'}</span>
                            </h4>
                            <Form>
                                <Form.Group controlId="formTempoMedio" style={{ marginBottom: '15px' }}>
                                    <Form.Label>Tempo médio de atendimento:</Form.Label>
                                    <Form.Control
                                        type="number"
                                        className={errors?.tempo && "input-error"}
                                        placeholder="Informe o tempo em minutos"
                                        {...register("tempo", { required: true })}
                                        value={estabelecimento.tempo}
                                        onChange={(e) => setEstabelecimento({ ...estabelecimento, tempo: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formNomeEstabelecimento" style={{ marginBottom: '15px' }}>
                                    <Form.Label>Nome do estabelecimento:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className={errors?.nome && "input-error"}
                                        placeholder="Informe o nome do estabelecimento"
                                        {...register("nome", { required: true })}
                                        value={estabelecimento.nome}
                                        onChange={(e) => setEstabelecimento({ ...estabelecimento, nome: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formCnpj" style={{ marginBottom: '15px' }}>
                                    <Form.Label>CNPJ:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className={errors?.cnpj && "input-error"}
                                        placeholder="Informe o CNPJ"
                                        {...register("cnpj", { required: true })}
                                        value={estabelecimento.cnpj}
                                        onChange={(e) => setEstabelecimento({ ...estabelecimento, cnpj: e.target.value })}
                                    />
                                </Form.Group>

                                <Form.Group controlId="formLocalizacao" style={{ marginBottom: '15px' }}>
                                    <Form.Label>Localização:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        className={errors?.local && "input-error"}
                                        placeholder="Informe a localização"
                                        {...register("local", { required: true })}
                                        value={estabelecimento.local}
                                        onChange={(e) => setEstabelecimento({ ...estabelecimento, local: e.target.value })}
                                    />
                                </Form.Group>

                                <div className="d-flex justify-content-between">
                                    <Button variant="primary" onClick={handleSubmit(onSubmit)}>
                                        {modoEdicao ? 'Salvar Alterações' : 'Cadastrar'}
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

export default EditarEstabelecimento;
