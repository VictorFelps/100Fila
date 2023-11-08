import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomeReact from './HomeReact'; // Importe o componente HomeReact
import CadastroReact from './CadastroReact'; // Importe o componente CadastroReact
import LoginReact from './LoginReact';
import EstabelecimentoView from './EstabelecimentoView';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomeReact />} />
        <Route path="/cadastro" element={<CadastroReact />} />
        <Route path="/estabelecimento">
          <Route path=':id' element={<EstabelecimentoView />} />
        </Route>
        <Route path="/login" element={<LoginReact />} />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
