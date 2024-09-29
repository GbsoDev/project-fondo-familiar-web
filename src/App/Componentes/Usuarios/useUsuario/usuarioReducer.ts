import { Usuario } from "../../../Modelos/Usuario";

type PayloadModalType = { modalType: ModalTypes, usuario?: Usuario };
type PayloadType = | Usuario[] | Error | PayloadModalType;

export type Action = {
  type: ActionTypes;
  payload?: PayloadType;
}

export type State = {
  usuario?: Usuario,
  usuarios: Usuario[],
  cargando:boolean,
  error?: Error,
  modalType?: ModalTypes,
}

const actionTypes = {
  proceso: 'PROCESO',
  exito: 'EXITO',
  error: 'ERROR',
  modal: 'MODAL',
  cerrarModal: 'CERRAR_MODAL',
} as const;

type ActionTypes = typeof actionTypes[keyof typeof actionTypes];

type ModalTypes = typeof modalTypes[keyof typeof modalTypes];

type OjetosReducerType = {
  [actionTypes.proceso]: State;
  [actionTypes.exito]: State;
  [actionTypes.error]: State;
  [actionTypes.modal]: State,
  [actionTypes.cerrarModal]: State,
};

const modalTypes = {
  registro: 'REGISTRO',
  actualizacion: 'ACTUALIZACION',
  detalles: 'DETALLES'
}

const initialState = (valorInicial: Usuario[]): State => ({
  usuario: undefined,
  usuarios: valorInicial,
  cargando: true,
  error: undefined,
  modalType: undefined,
});

const reducerObject = (state: State, payload?: PayloadType): OjetosReducerType => ({
  [actionTypes.proceso]:{
    ...state,
    cargando: true,
    error: undefined,
  },
  [actionTypes.exito]:{
    ...state,
    cargando: false,
    error: undefined,
    modalType: undefined,
    usuarios: payload as Usuario[],
  },
  [actionTypes.error]: { 
    ...state, 
    cargando: false,
    error: payload as Error,
  },
  [actionTypes.modal]:{ 
    ...state, 
    cargando: false,
    error: undefined,
    modalType: (payload as PayloadModalType)?.modalType || undefined,
    usuario: (payload as PayloadModalType)?.usuario || undefined,
  },
  [actionTypes.cerrarModal]:{ 
    ...state, 
    modalType: undefined,
    usuario: undefined,
  },
});

const usuarioReducer = (state: State, action: Action): State => {
  return reducerObject(state, action.payload)[action.type] || state
}

export { usuarioReducer, initialState, actionTypes, modalTypes };