import { FunctionComponent } from "react";
import { Usuario } from "../../Modelos/Usuario";

type UsuarioDetallesParams = {
  usuario?: Usuario,
  onEditar: (usuario: Usuario) => void,
  onCerrar: () => void
}
const UsuarioDetalles: FunctionComponent<UsuarioDetallesParams> = ({ usuario, onEditar, onCerrar }): JSX.Element => {
  console.warn('UsuarioDetalles');
  if (usuario) {
    return (
      <div>
        <div>
          <span>Nombre: {usuario.nombre}</span>
        </div>
        <div>
          <span>Email: {usuario.email}</span>
        </div>
        <button onClick={() => onEditar(usuario)}>Editar</button>
        <button onClick={onCerrar}>Volver</button>
      </div>
    );
  } else {
    return (<></>)
  }
}
export { UsuarioDetalles }