import { useUsuario } from "./useUsuario";
import { Modal } from "../Modal";
import { modalTypes } from "./useUsuario/usuarioReducer";
import { UsuarioDetalles } from "./UsuarioDetralles";
import { Usuario } from "../../Modelos/Usuario";
import { Button } from "primereact/button";
import { TreeTable } from "primereact/treetable";
import { Column } from "primereact/column";
import { UsuarioForm } from "./UsuarioForm";
import { FunctionComponent } from "react";

const UsuariosLista: FunctionComponent = (): JSX.Element => {
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

  type DataType = {
    key: string,
    data: Usuario,
    onVer: () => void
    onEditar: () => void
  }
  const dataTable = (): DataType[] => {
    return usuarios.map(usuario => ({
      key: usuario.id as string,
      data: usuario,
      onVer: () => modalDetalles(usuario),
      onEditar: () => modalActualizar(usuario),
    }));
  }

  const actionTemplate = (data: DataType) => {
    return (
      <div className="flex flex-wrap gap-2">
        <Button type="button" icon="pi pi-search" rounded onClick={data.onVer}></Button>
        <Button type="button" icon="pi pi-pencil" severity="success" rounded onClick={data.onEditar}></Button>
      </div>
    );
  };


  const header = (
    <div className="text-xl font-bold">
      <Button icon="pi pi-plus" label="Nuevo Usuario" severity="success" onClick={modalRegistrar} />
    </div>
  );
  const footer = (
    <div className="flex justify-content-start">
      <Button icon="pi pi-refresh" label="Recargar" severity="warning" />
    </div>
  );

  return (
    <>
      {cargando &&
        <div>Cargando...</div>
      }
      {!cargando && usuarios &&
        <div>
          <TreeTable value={dataTable()} header={header} footer={footer} >
            <Column field="id" header="Id"></Column>
            <Column field="nombre" header="Nombre"></Column>
            <Column field="email" header="Email"></Column>
            <Column body={actionTemplate} headerClassName="w-10rem" />
          </TreeTable>
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
          <UsuarioDetalles usuario={usuario} onEditar={modalActualizar} onCerrar={onCerrarModal} />
        </Modal>
      }
    </>
  );
}

export { UsuariosLista }