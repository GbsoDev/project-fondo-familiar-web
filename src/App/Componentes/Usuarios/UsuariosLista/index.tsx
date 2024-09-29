import { useUsuario } from "../useUsuario";
import { Modal } from "../../Modal";
import { UsuarioForm } from "../UsuarioForm";
import { modalTypes } from "../useUsuario/usuarioReducer";
import { UsuarioDetalles } from "../UsuarioDetralles";
import { Usuario } from "../../../Modelos/Usuario";

const UsuariosLista = (): JSX.Element => {
  const {
    usuario,
    usuarios,
    cargando,
    error,
    modalType,
    modalRegistrar,
    modalActualizar,
    modalDetalles,
    onCerrarModal,
    registrarUsuario,
    actualizarUsuario,
    eliminarUsuario,
  } = useUsuario();

  const onEditar = (usuario?: Usuario)=>{
    if(usuario){
      modalActualizar(usuario);
    }
  }

  const onVerDtalles = (usuario:Usuario)=>{
    modalDetalles(usuario);
  }
  return (
    <>
      {cargando && 
      <div>Cargando...</div>
      }
      {!cargando && usuarios &&
        <div>
          <button onClick={modalRegistrar}>NuevoUsuario</button>
          <table>
            <thead>
              <tr>
                <th>
                  Nombre
                </th>
                <th>
                  Email
                </th>
              </tr>
            </thead>
            <tbody>
              {usuarios.map(usuario => (
                <tr key={usuario.id}>
                  <td>
                    {usuario.nombre}
                  </td>
                  <td>
                    {usuario.email}
                  </td>
                  <td>
                    <button onClick={()=>onVerDtalles(usuario)}>Ver Detalles</button>
                    <button onClick={()=>onEditar(usuario)}>Modificar</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      }
      {!cargando && !!error && 
        <div>Ha ocurrido un error...</div>
      }
      {modalType === modalTypes.registro &&
      <Modal>
        <UsuarioForm registrar={registrarUsuario} onCerrar={onCerrarModal} />
      </Modal>
      }
      {modalType === modalTypes.actualizacion &&
        <Modal>
          <UsuarioForm usuario={usuario} registrar={actualizarUsuario} onCerrar={onCerrarModal} />
        </Modal>
      }
      {modalType === modalTypes.detalles &&
        <Modal>
          <UsuarioDetalles usuario={usuario} onEditar={() => onEditar(usuario)} onCerrar={onCerrarModal} />
        </Modal>
      }
    </>
  );
}

export { UsuariosLista }