import { Usuario } from "../../../Modelos/Usuario";

type Params = {
  usuario?:Usuario,
  onEditar: (usuario:Usuario)=>void,
  onCerrar: ()=>void
}
const UsuarioDetalles = ({usuario, onEditar, onCerrar}: Params): JSX.Element => {
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