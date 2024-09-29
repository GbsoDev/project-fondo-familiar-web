import { ChangeEventHandler, FormEventHandler, FunctionComponent, useState } from "react"
import { Usuario } from "../../Modelos/Usuario"
import { InputText } from 'primereact/inputtext';
import { Message } from "primereact/message";
import { Button } from "primereact/button";

type UsuarioFormParams = {
  usuario?: Usuario,
  registrar: (newUsuario: Usuario) => void,
  onCerrar: () => void,
}

const UsuarioForm: FunctionComponent<UsuarioFormParams> = ({ usuario, registrar, onCerrar }): JSX.Element => {
  const [nombre, setNombre] = useState(usuario?.nombre || '');
  const [email, setEmail] = useState(usuario?.email || '');
  const [contrasenna, setContrasenna] = useState(usuario?.contrasenna || '');

  const onSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    registrar({
      id: usuario?.id,
      nombre,
      email,
      contrasenna,
    });
  }

  const onNombreChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    setNombre(value);
  }
  const onEmailChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    setEmail(value);
  }
  const onContrasennaChange: ChangeEventHandler<HTMLInputElement> = ({ target: { value } }) => {
    setContrasenna(value);
  }

  return (
    <form onSubmit={onSubmit}>
      <FormField
        id="nombre"
        label="Nombre"
        value={nombre}
        onChange={onNombreChange}
        placeholder="Nombre"
        errorMessage="El nombre es requerido"
      />
      <FormField
        id="email"
        label="Email"
        value={email}
        onChange={onEmailChange}
        placeholder="Email"
        errorMessage="El email es requerido"
      />
      <FormField
        id="contrasenna"
        label="Contraseña"
        value={contrasenna}
        onChange={onContrasennaChange}
        placeholder="Contraseña"
        type="password"
        errorMessage="La contraseña es requerida"
      />
      <div className="flex flex-wrap align-items-center gap-2">
        <Button label="Cancelar" className="p-button-secondary" onClick={onCerrar} />
        <Button label="Guardar" type="submit" className="p-button-primary" />
      </div>
    </form>
  );
}

type FormFieldProps = {
  id: string;
  label: string;
  value: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  placeholder: string;
  type?: string;
  errorMessage?: string;
}

const FormField: FunctionComponent<FormFieldProps> = ({ id, label, value, onChange, placeholder, type = "text", errorMessage }) => (
  <div className="flex flex-wrap align-items-center mb-3 gap-2">
    <label htmlFor={id} className="p-sr-only">{label}</label>
    <InputText id={id} value={value} onChange={onChange} placeholder={placeholder} type={type} className="p-invalid mr-2" />
    {value.trim() === '' && errorMessage && <Message severity="error" text={errorMessage} />}
  </div>
);

export { UsuarioForm }