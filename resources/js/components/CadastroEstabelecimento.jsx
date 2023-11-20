import React from "react";
import { useForm } from "react-hook-form";
import { isEmail } from "validator";
import { Form, Button, Container, Row, Col, Card } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import backgroundImage from "./imagem.jpg";
import logoImage from "./logo.jpg";
import { useHistory } from "react-router-dom";

const CadastroEstabelecimento = () => {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const watchPassword = watch("password");

  const onSubmit = (data) => {
    const _token = document
      .querySelector('[name="csrf-token"]')
      .getAttribute("content");

    // Simula uma requisição de cadastro
    fetch("/register", {
      method: "POST",
      headers: {
        "X-CSRF-TOKEN": _token,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ ...data, _token }),
    })
      .then((response) => response.json())
      .then((result) => {
        // Simula um tempo de espera
        setTimeout(() => {
          alert(JSON.stringify(data));
          toast.success("Cadastrado com sucesso!");
          // Redireciona para a página de login após o cadastro
          history.push("/login");
        }, 1000);
      })
      .catch((error) => {
        // Exibe uma notificação de erro
        toast.error(`Erro na solicitação: ${error.message}`);
        console.error("Erro na solicitação:", error);
      });
  };

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}>
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Card style={{ width: '25rem' }}><br></br>
          <h4 className="text-center mb-4">Cadastro de Estabelecimento</h4>
          <Card.Img
            variant="top"
            src={logoImage}
            alt="Logo"
            style={{ width: '50%', height: 'auto', display: 'block', margin: 'auto' }}
          />

          <Card.Body>
            <Form>
              <Form.Group controlId="formName">
                <Form.Label>Nome do Estabelecimento</Form.Label>
                <Form.Control
                  className={errors?.name && "input-error"}
                  type="text"
                  placeholder="Nome do seu estabelecimento"
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

              <Form.Group controlId="password_confirmation">
                <Form.Label>Confirmar senha</Form.Label>
                <Form.Control
                  className={errors?.passwordConfirmation && "input-error"}
                  type="password"
                  placeholder="Repita sua senha "
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

              <Button variant="primary" onClick={handleSubmit(onSubmit)} style={{ marginTop: '10px' }}>
                Cadastrar-se
              </Button>
            </Form>
          </Card.Body>
        </Card>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default CadastroEstabelecimento;
