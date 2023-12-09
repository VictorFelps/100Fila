import { Navbar, Container, Nav, NavLink } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import logoImage from "./logo.jpg"; // Importe a imagem do logo

export default ({ children }) => {
    const navigate = useNavigate();

    const logout = async () => {
        const _token = document.querySelector('[name="csrf-token"]').getAttribute("content");
        const headers = {
            'X-CSRF-TOKEN': _token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        };
        try {
            const result = await fetch(`http://localhost:8001/logout`, { method: 'POST', headers });
            console.log('result logout', result);
            window.location.href = '/app#/login';
            // navigate('/login');
        } catch (e) {
            console.log('erro no logout', e);
        }
    };

    return (
        <>
            <Navbar expand="lg" className="bg-white shadow-sm border rounded mb-4">
                <Container>
                    <Navbar.Brand href="#home">
                        <img
                            src={logoImage}
                            alt="Logo"
                            height="40" // Aumentei o tamanho da logo
                            className="d-inline-block align-top me-2" // Adicionei uma margem à direita
                        />{' '}
                        100Fila
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link to="/perfil" className="nav-link border-end pe-2">
                                Perfil
                            </Link>
                            <Link to="/" className="nav-link border-end pe-2">
                                Estabelecimentos
                            </Link>
                            <NavLink onClick={logout} className="pe-2">
                                Sair
                            </NavLink>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            {children}
        </>
    );
};
