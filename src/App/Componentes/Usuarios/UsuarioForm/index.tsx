import { ChangeEvent, FormEvent, useState } from "react"
import { Usuario } from "../../../Modelos/Usuario"
import { Form } from "react-router-dom";

type UsuarioFormParams = {
  usuario? :Usuario,
  registrar: (newUsuario: Usuario) => void,
  onCerrar: () => void,
}

function UsuarioForm({usuario, registrar, onCerrar }: UsuarioFormParams): JSX.Element {
    const [nombre, setNombre] = useState(usuario?.nombre || '');
    const [email, setEmail] = useState(usuario?.email || '');
    const [contrasenna, setContrasenna] = useState(usuario?.contrasenna || '');

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    registrar({
      id: usuario?.id,
      nombre,
      email,
      contrasenna,
    });
  }

  const onNombreChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>{
    setNombre(value);
  }
  const onEmailChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>{
    setEmail(value);
  }
  const onContrasennaChange = ({ target: { value } }: ChangeEvent<HTMLInputElement>) =>{
    setContrasenna(value);
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <span>nombre:</span>
        <input value={nombre} onChange={onNombreChange}/>
      </div>
      <div>
        <span>email:</span>
        <input value={email} onChange={onEmailChange}/>
      </div>
      <div>
        <span>contrasenna:</span>
        <input value={contrasenna} onChange={onContrasennaChange}/>
      </div>
      <div>
        <button onClick={onCerrar}>Cancelar</button>
        <button type="submit">Guardar</button>
      </div>
    </form>
  );
}

export { UsuarioForm }