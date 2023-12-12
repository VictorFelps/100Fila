import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { isEmail } from "validator";
import { Form, Button, Container, Card } from "react-bootstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import backgroundImage from './imagem.jpg';
import logoImage from './logo.jpg';

const CadastroReact = () => {
    const navigate = useNavigate();
    const [accountType, setAccountType] = useState("1");

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const watchPassword = watch("password");

    const onSubmit = async (data) => {
        const _token = document.querySelector('[name="csrf-token"]').getAttribute("content");
        const requestData = { ...data, accountType, _token };

        try {
            const response = await fetch('/register', {
                method: 'POST',
                headers: {
                    'X-CSRF-TOKEN': _token,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(requestData)
            });

            if (!response.ok) {
                if (response.status === 422) {
                    const errorResponse = await response.json();
                    console.error('Erro de validação no servidor:', errorResponse);
                    toast.error("Erro de validação. Verifique os dados e tente novamente.");
                } else {
                    throw new Error(`Erro na solicitação: ${response.status} ${response.statusText}`);
                }
            } else {
                // Cadastro bem-sucedido
                console.log('Cadastro realizado com sucesso!');
                toast.success("Cadastro realizado com sucesso!");
                await new Promise(resolve => setTimeout(resolve, 1000)); // Atraso de 1 segundo
                navigate("/login");
            }
        } catch (error) {
            console.error('Erro na solicitação:', error);
            toast.error("Erro no cadastro. Tente novamente.");
        }
    };

    return (
        <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
            <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                <Card style={{ width: '25rem' }}><br />
                    <h4 className="text-center mb-4">Cadastro</h4>
                    <Card.Img
                        variant="top"
                        src={logoImage}
                        alt="Logo"
                        style={{ width: '50%', height: 'auto', display: 'block', margin: 'auto' }}
                    />

                    <Card.Body>
                        <Form>
                            <Form.Group controlId="formName">
                                <Form.Label>Nome</Form.Label>
                                <Form.Control
                                    className={errors?.name && "input-error"}
                                    type="text"
                                    placeholder="Seu nome"
                                    {...register("name", { required: true })}
                                />
                                {errors?.name?.type === "required" && (
                                    <Form.Text className="text-danger">Necessário o nome.</Form.Text>
                                )}
                            </Form.Group>

                            <Form.Group controlId="formEmail">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control
                                    className={errors?.email && "input-error"}
                                    type="email"
                                    placeholder="Seu e-mail"
                                    {...register("email", {
                                        required: true,
                                        validate: (value) => isEmail(value),
                                    })}
                                />
                                {errors?.email?.type === "required" && (
                                    <Form.Text className="text-danger">Necessário o Email.</Form.Text>
                                )}
                                {errors?.email?.type === "validate" && (
                                    <Form.Text className="text-danger">Email inválido.</Form.Text>
                                )}
                            </Form.Group>

                            <Form.Group controlId="formPassword">
                                <Form.Label>Senha</Form.Label>
                                <Form.Control
                                    className={errors?.password && "input-error"}
                                    type="password"
                                    placeholder="Senha"
                                    {...register("password", { required: true, minLength: 7 })}
                                />
                                {errors?.password?.type === "required" && (
                                    <Form.Text className="text-danger">Senha necessária.</Form.Text>
                                )}
                                {errors?.password?.type === "minLength" && (
                                    <Form.Text className="text-danger">A senha precisa ter pelo menos 8 caracteres.</Form.Text>
                                )}
                            </Form.Group>

                            <Form.Group controlId="password_confirmation">
                                <Form.Label>Confirmar senha</Form.Label>
                                <Form.Control
                                    className={errors?.passwordConfirmation && "input-error"}
                                    type="password"
                                    placeholder="Repita sua senha"
                                    {...register("password_confirmation", {
                                        required: true,
                                        validate: (value) => value === watchPassword,
                                    })}
                                />
                                {errors?.password_confirmation?.type === "required" && (
                                    <Form.Text className="text-danger">É necessário confirmar a senha.</Form.Text>
                                )}
                                {errors?.password_confirmation?.type === "validate" && (
                                    <Form.Text className="text-danger">As senhas não são iguais.</Form.Text>
                                )}
                            </Form.Group>

                            <Form.Group controlId="formAccountType">
                                <Form.Label>Tipo de Conta</Form.Label>
                                <Form.Control
                                    as="select"
                                    {...register("accountType", { required: true })}
                                    onChange={(e) => setAccountType(e.target.value)}
                                >
                                    <option value="1">Conta de Usuário</option>
                                    <option value="2">Conta de Administrador</option>
                                </Form.Control>
                                {errors?.accountType?.type === "required" && (
                                    <Form.Text className="text-danger">É necessário escolher o tipo de conta.</Form.Text>
                                )}
                            </Form.Group>
                            <Button variant="primary" onClick={handleSubmit(onSubmit)} style={{ marginTop: '10px' }}>
                                Cadastrar-se
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Container>
            <ToastContainer />
        </div>
    );
};

export default CadastroReact;