import { FunctionComponent, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';

interface ModalParams {
  children: ReactNode;
}

const Modal: FunctionComponent<ModalParams> = ({ children }) => {
  const modalContainer = document.getElementById('modalContainer');

  if (!modalContainer) {
    return (
      <div>Error, contenedor modal no encontrado</div>
    );
  }

  return ReactDOM.createPortal(
    <div className="Modal">
      {children}
    </div>,
    modalContainer
  );
}

export { Modal }
