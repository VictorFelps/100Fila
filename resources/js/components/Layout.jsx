import { Navbar, Container, Nav, NavDropdown, NavLink } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"

export default ({ children }) => {
    const navigate = useNavigate()

    const logout = async () => {
        const _token = document.querySelector('[name="csrf-token"]').getAttribute("content");
        const headers = {
            'X-CSRF-TOKEN': _token,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
        try {
            const result = await fetch(`http://localhost:8001/logout`, {method: 'POST', headers})
            console.log('result logout', result)
            window.location.href = '/app#/login'
            //navigate('/login')
        } catch (e) {
            console.log('erro no logout', e)
        }
    }

    return <>
        <Navbar expand="lg" className="bg-primary shadow-sm">
            <Container>
                <Navbar.Brand href="#home">100Fila</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Link to="/cadastro" className="nav-link">Cadastro</Link>
                        <Link to="/" className="nav-link">Estabelecimentos</Link>
                        <NavLink onClick={logout}>Sair</NavLink>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
        {children}
    </>
}