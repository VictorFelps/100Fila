import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Button, Modal } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Layout from './Layout';
import backgroundImage from './imagem.jpg';
import { Link } from 'react-router-dom';

const App = () => {
    const [fila, setFila] = useState(0);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [nomeEstabelecimento, setNomeEstabelecimento] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [estaChamando, setChamando] = useState(false);
    const [posicaoAnterior, setPosicaoAnterior] = useState(null); // Nova variável para armazenar a posição anterior

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const requisitarFilaEstabelecimento = async () => {
        const _token = document.querySelector('[name="csrf-token"]').getAttribute('content');

        try {
            const response = await fetch(`http://localhost:8001/api/estabelecimento/${id}/fila`, {
                method: 'GET',
                headers: {
                    'X-CSRF-TOKEN': _token,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            const { estabelecimento, fila, chamado } = await response.json();
            console.log('Dados da API:', estabelecimento);

            // Armazenar a posição anterior antes de atualizar a fila
            setPosicaoAnterior(fila);

            setFila(fila);
            setNomeEstabelecimento(estabelecimento.nome);
            setChamando(chamado === 1);
        } catch (e) {
            console.error('Erro ao requisitar fila:', e);
        }
    };

    useEffect(() => {
        requisitarFilaEstabelecimento();
        const interval = setInterval(requisitarFilaEstabelecimento, 3000);
        return () => clearInterval(interval);
    }, []);

    const entrarNaFila = () => {
        handleShowModal();
    };

    const notificarUsuarioChamado = () => {
        if (estaChamando) {
            toast.success('Você está sendo chamado!', { autoClose: 5000 });
        }
    };

    useEffect(() => {
        notificarUsuarioChamado();
    }, [estaChamando]);

    const confirmarEntrarNaFila = async () => {
        handleCloseModal();
        setLoading(true);
        try {
            // Utilizar a posição anterior ao entrar na fila
            const response = await fetch(`http://localhost:8001/api/estabelecimento/${id}/fila/entrar-na-fila?posicao=${posicaoAnterior}`);
            console.log('Resposta da solicitação:', response);

            notificarUsuarioChamado();
            requisitarFilaEstabelecimento();
        } catch (e) {
            console.error('Erro ao entrar na fila:', e);
        } finally {
            setLoading(false);
        }
    };

    const sairDaFila = async () => {
        if (fila.current_state === 0) {
            console.warn('A fila está vazia.');
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8001/api/estabelecimento/${id}/fila/sair-da-fila`);
            requisitarFilaEstabelecimento();
        } catch (e) {
            console.log('error', e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <Layout>
                <div style={styles.container}>
                    <h2 style={styles.title}>{nomeEstabelecimento ? nomeEstabelecimento : `Estabelecimento #${id}`}</h2>
                    <div style={styles.filaContainer}>
                        {estaChamando && <p className='text-success fw-bold'>Você esta sendo chamado!</p>}
                        <p style={styles.filaLength}>Quantidade de pessoas na fila: {fila}</p>
                        <p style={styles.filaLength}>Sua posição na fila: {fila}</p>
                    </div>
                    <div className="d-flex justify-content-around mt-3">
                        <button className="btn btn-primary" style={{ marginRight: '8px' }} onClick={entrarNaFila} disabled={loading}>
                            Entrar na fila
                        </button>
                        <button className="btn btn-secondary" style={{ marginLeft: '8px', marginRight: '8px' }} onClick={sairDaFila} disabled={loading}>
                            Sair da fila
                        </button>
                        {/* Botão para voltar para a página inicial */}
                        <Link to="/">
                            <button className="btn btn-info" style={{ marginLeft: '8px' }}>
                                Voltar
                            </button>
                        </Link>
                    </div>

                    {/* Modal de Confirmação */}
                    <Modal show={showModal} onHide={handleCloseModal}>
                        <Modal.Header closeButton>
                            <Modal.Title>Confirmação</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Tem certeza de que deseja entrar na fila?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="primary" onClick={confirmarEntrarNaFila}>
                                Sim
                            </Button>
                            <Button variant="secondary" onClick={handleCloseModal}>
                                Não
                            </Button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </Layout>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        margin: '50px auto',
        padding: '20px',
        maxWidth: '800px',
        backgroundColor: '#f8f8f8',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontSize: '24px',
        marginBottom: '20px',
    },
    buttonsContainer: {
        marginTop: '20px',
    },
    button: {
        padding: '10px 20px',
        margin: '0 10px',
        fontSize: '16px',
        cursor: 'pointer',
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        borderRadius: '4px',
    },
    filaContainer: {
        backgroundColor: '#fff',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    fila: {
        backgroundColor: '#f5f5f5',
        padding: '10px',
        borderRadius: '5px',
        overflowX: 'auto',
    },
    filaLength: {
        marginTop: '10px',
        color: '#777',
    },
};

export default App;
