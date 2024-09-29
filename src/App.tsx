import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './App/Componentes/Home';
import { Menu } from './App/Componentes/Menu';
import { UsuariosLista } from './App/Componentes/Usuarios/UsuariosLista';
import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';

function App() {
  return (
    <PrimeReactProvider>
      <div className="App">
          <BrowserRouter>
          <header className="App-header">
            <Menu />
          </header>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/usuarios' element={<UsuariosLista />} />
                <Route path='*' element={<div>Not found</div>} />
              </Routes>
            </BrowserRouter>
      </div>
    </PrimeReactProvider>
  );
}

export default App;
