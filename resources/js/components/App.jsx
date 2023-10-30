import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomeReact from './HomeReact'; // Importe o componente HomeReact
import CadastroReact from './CadastroReact'; // Importe o componente CadastroReact

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomeReact />} />
        <Route path="/cadastro" element={<CadastroReact />} />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
