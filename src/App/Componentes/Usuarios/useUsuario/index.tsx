import React from 'react';
import { usuarioReducer, initialState, actionTypes, modalTypes } from './usuarioReducer';
import { Usuario } from '../../../Modelos/Usuario';
import { UsuariosService } from '../../../Servicios/UsuariosService';


function useUsuario() {
  const usuarioService = new UsuariosService();

  const [estado, dispatch] = React.useReducer(usuarioReducer, initialState([]));
  const {
    usuario,
    usuarios,
    cargando,
    error,
    modalType,
  } = estado;

  React.useEffect(() => {
    if (usuarios.length === 0) {
      usuarioService.inicializarDatos();
      usuarioService.listarUsuarios().then(usuarios => {
        onExitoProceso(usuarios);
      }).catch((error) => {
        procesarError(error);
      });
    }
  }, [usuarios]);

  const onProcesando = () => dispatch({ type: actionTypes.proceso });

  const onExitoProceso = (usuarios: Usuario[]) => dispatch({ type: actionTypes.exito, payload: usuarios });
  
  const onError = (error: Error) => dispatch({ type: actionTypes.error, payload: error });
  
  const onCerrarModal = () => dispatch({ type: actionTypes.cerrarModal });

  const modalRegistrar = () => dispatch({
    type: actionTypes.modal,
    payload: {
      modalType: modalTypes.registro
    }
  });

  const modalActualizar = (usuario: Usuario) => dispatch({
    type: actionTypes.modal,
    payload: {
      modalType: modalTypes.actualizacion, usuario: usuario
    }
  });

  const modalDetalles = (usuario: Usuario) => dispatch({
    type: actionTypes.modal,
    payload: {
      modalType: modalTypes.detalles, usuario: usuario
    }
  });

  const registrarUsuario = async (nuevoUsuario: Usuario) => {
    try {
      onProcesando();
      await usuarioService.guardarUsuario(nuevoUsuario);
      const usuarios = await usuarioService.listarUsuarios();
      onExitoProceso(usuarios);
    } catch (error: unknown) {
      procesarError(error);
    }
  }

  const actualizarUsuario = async (usuario: Usuario) => {
    try {
      onProcesando();
      await usuarioService.actualizarUsuario(usuario);
      const usuarios = await usuarioService.listarUsuarios();
      onExitoProceso(usuarios);
    } catch (error: unknown) {
      procesarError(error);
    }
  }

  const eliminarUsuario = async (id: string) => {
    try {
      onProcesando();
      await usuarioService.eliminarUsuario(id);
      const usuarios = await usuarioService.listarUsuarios();
      onExitoProceso(usuarios);
    } catch (error: unknown) {
      procesarError(error);
    }
  }

  const procesarError = (error: unknown) => {
    if (error instanceof Error) {
      onError(error);
    } else {
      onError(new Error('error cargando listado de usuarios'));
    }
  }

  return {
    usuario,
    usuarios,
    cargando,
    error,
    modalType,
    modalRegistrar,
    modalActualizar,
    modalDetalles,
    registrarUsuario,
    actualizarUsuario,
    eliminarUsuario,
    onCerrarModal,
  };
}

export { useUsuario }