import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomeReact from './HomeReact'; // Importe o componente HomeReact
import HomeEstabelecimento from './HomeEstabelecimento';
import CadastroReact from './CadastroReact'; // Importe o componente CadastroReact
import LoginReact from './LoginReact';
import EstabelecimentoView from './EstabelecimentoView';
import EstabelecimentoNew from './EstabelecimentoNew';
import PerfilReact from './PerfilReact';
import PerfilEstabelecimento from './PerfilEstabelecimento';
import CadastroEstabelecimento from './CadastroEstabelecimento';
import AdministrarFila from './AdministrarFila';
import MinhaFila from './MinhaFila';
import EsqueceuSenha from './EsqueceuSenha';
import EditarEstabelecimento from './EditarEstabelecimento';



const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomeReact />} />
        <Route exact path="/home-estabelecimento" element={<HomeEstabelecimento />} />
        <Route path="/cadastro" element={<CadastroReact />} />
        <Route path="/cadastro-estabelecimento" element={<CadastroEstabelecimento />} />
        <Route path="/editar-estabelecimento/:id" element={<EditarEstabelecimento />} />
        <Route path="/administrar-fila/:id" element={<AdministrarFila />} />
        <Route exact path="/minha-fila" element={<MinhaFila />} />
        <Route path="/esqueceu-senha" element={<EsqueceuSenha />} />
        <Route path="/estabelecimento">
          <Route path=':id' element={<EstabelecimentoView />} />
          <Route path='novo' element={<EstabelecimentoNew />} />
        </Route>
        <Route path="/login" element={<LoginReact />} />
        <Route path="/perfil" element={<PerfilReact />} />
        <Route path="/perfil-estabelecimento" element={<PerfilEstabelecimento />} />

      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
