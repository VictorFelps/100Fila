import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';


export default function CadastroReact() {
    return (
        <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
    <Card style={{ width: '400px', height: '400px' }}>
        <Card.Body>
            <Card.Title>Formulário de Cadastro</Card.Title>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicName">
                    <Form.Label>Nome</Form.Label>
                    <Form.Control type="text" placeholder="Digite seu nome" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Endereço de E-mail</Form.Label>
                    <Form.Control type="email" placeholder="Digite seu email" />
                    <Form.Text className="text-muted">
                        Nunca compartilharemos seu e-mail com mais ninguém.
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" placeholder="Digite sua senha" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPasswordConfirmation">
                    <Form.Label>Confirme sua senha</Form.Label>
                    <Form.Control type="password" placeholder="Confirme sua senha" />
                </Form.Group>

                <div className="d-grid gap-2">
                    <Button variant="primary" type="submit">
                        Cadastrar
                    </Button>
                </div>
            </Form>
        </Card.Body>
    </Card>
</Container>
    );
}

