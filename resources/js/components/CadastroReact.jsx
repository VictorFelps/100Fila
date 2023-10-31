import { useForm } from "react-hook-form";
import { isEmail } from "validator";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";

const CadastroReact = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const watchPassword = watch("password");

    const onSubmit = (data) => {
        alert(JSON.stringify(data));
    };

    console.log("RENDER");

    return (
        <div style={{ backgroundColor: "#e6f7ff", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Card style={{ width: '25rem' }}>
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
                                <Form.Text className="text-danger">Email invalido.</Form.Text>
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
                                <Form.Text className="text-danger">Password is required.</Form.Text>
                            )}
                            {errors?.password?.type === "minLength" && (
                                <Form.Text className="text-danger">A senha precisa de pelo menos 7 caracteres.</Form.Text>
                            )}
                        </Form.Group>

                        <Form.Group controlId="formPasswordConfirmation">
                            <Form.Label>Confirmar senha</Form.Label>
                            <Form.Control
                                className={errors?.passwordConfirmation && "input-error"}
                                type="password"
                                placeholder="Repita sua senha "
                                {...register("passwordConfirmation", {
                                    required: true,
                                    validate: (value) => value === watchPassword,
                                })}
                            />
                            {errors?.passwordConfirmation?.type === "required" && (
                                <Form.Text className="text-danger">É necessário confirmar a senha.</Form.Text>
                            )}
                            {errors?.passwordConfirmation?.type === "validate" && (
                                <Form.Text className="text-danger">As senhas não são iguais.</Form.Text>
                            )}
                        </Form.Group>

                        <Button variant="primary" onClick={handleSubmit(onSubmit)} style={{ marginTop: '10px' }}>
                            Cadastrar-se
                        </Button>

                    </Form>
                </Card.Body>
            </Card>
        </div>
    );
};

export default CadastroReact;
