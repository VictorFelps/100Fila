import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';


export default function LoginReact() {
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        const _token = document.querySelector('[name="csrf-token"]').getAttribute("content");

        alert(JSON.stringify(data));
        fetch('/login', {
            method: 'POST', 
            headers: {
                'X-CSRF-TOKEN': _token,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({...data, _token})
        }).then(result => {
            console.log(result)
            navigate('/')
        })
        .catch(error => console.log('erro', error))
    };

    return (
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
                        </Form.Group>

                        <div className="d-grid gap-2">
                            <Button variant="primary" type="submit" onClick={handleSubmit(onSubmit)}>
                                Login
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}
