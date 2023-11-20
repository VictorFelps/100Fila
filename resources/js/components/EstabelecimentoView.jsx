import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Button, Modal } from 'react-bootstrap';
import Layout from './Layout';
import backgroundImage from './imagem.jpg';


const App = () => {
    const [fila, setFila] = useState(0);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const [nomeEstabelecimento, setNomeEstabelecimento] = useState('');
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const requisitarFilaEstabelecimento = async () => {
        const _token = document.querySelector('[name="csrf-token"]').getAttribute('content');
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8001/api/estabelecimento/${id}/fila`, {
                method: 'GET',
                headers: {
                    'X-CSRF-TOKEN': _token,
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            });
            const { estabelecimento, fila } = await response.json();
            console.log('Dados da API:', estabelecimento); // Adicione este console.log para depuração
            setFila(fila);
            setNomeEstabelecimento(estabelecimento.nome);
        } catch (e) {
            console.error('Erro ao requisitar fila:', e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        requisitarFilaEstabelecimento();
    }, []);

    const entrarNaFila = () => {
        handleShowModal();
    };

    const confirmarEntrarNaFila = async () => {
        handleCloseModal();
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8001/api/estabelecimento/${id}/fila/entrar-na-fila`);
            requisitarFilaEstabelecimento();
        } catch (e) {
            console.log('error', e);
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
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
        <Layout>
            <div style={styles.container}>
                <h2 style={styles.title}>{nomeEstabelecimento ? nomeEstabelecimento : `Estabelecimento #${id}`}</h2>
                <div style={styles.filaContainer}>
                    <p style={styles.filaLength}>Quantidade de pessoas na fila: {fila}</p>
                </div>
                <div className="d-flex justify-content-around mt-3">
                    <button className="btn btn-primary" onClick={entrarNaFila} disabled={loading}>
                        Entrar na fila
                    </button>
                    <button className="btn btn-secondary" onClick={sairDaFila} disabled={loading}>
                        Sair da fila
                    </button>
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
        </div>
    );
};

const styles = {
    container: {
        textAlign: 'center',
        margin: '50px auto',
        padding: '20px',
        maxWidth: '600px',
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
