import React from 'react';
import ReactDOM from 'react-dom/client';
import Home from './rotas/Home';
import reportWebVitals from './reportWebVitals';
import { createGlobalStyle } from 'styled-components';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Header from './componentes/Header'
import Processamento from './rotas/Processamento';
import CadastrarMaterial from './rotas/CadastrarMaterial';
import CadastrarUsuarios from './rotas/CadastrarUsuario';
import Sair from './rotas/Sair'
import Entrar from './rotas/Entrar'
import RotasProtegidas from './componentes/RotaProtegida';

const GlobalStyle = createGlobalStyle`
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    code {
      font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
        monospace;
    }

    li {
      list-style: none;
    }
`

function App() {
  const location = useLocation();
  const mostrarHeader = location.pathname !== '/entrar';

  return (
    <>
      {mostrarHeader && <Header />}
      <Routes>
        <Route path='/entrar' element={<Entrar />} />
        <Route path='/sair' element={<Sair />} />
        <Route element= {<RotasProtegidas />}>
            <Route path='/cadastrarusuarios' element={
              <CadastrarUsuarios />
            }/>
            <Route path='/cadastrarmateriais' element={
              <CadastrarMaterial />
            }/>
            <Route path='/processamento' element={
              <Processamento />
            }/>
            <Route path='/' element={
              <Home />
            }/>
        </Route>
      </Routes>
    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalStyle/>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
