import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './App/Componentes/Home';
import { Menu } from './App/Componentes/Menu';
import { UsuariosLista } from './App/Componentes/Usuarios/UsuariosLista';
import 'primeicons/primeicons.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>
          <Menu />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/usuarios' element={<UsuariosLista/>} />
            <Route path='*' element={<div>Not found</div>} />
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
