import { Menubar } from "primereact/menubar";
import { FunctionComponent } from "react";
import { useNavigate } from "react-router-dom";

const Menu: FunctionComponent = () => {
  const navigate = useNavigate();

  const items = [
    {
      label: 'Home',
      icon: 'pi pi-palette',
      command: () => {
        navigate('/');
      }
    },
    {
      label: 'Usuarios',
      icon: 'pi pi-palette',
      command: () => {
        navigate('/usuarios');
      }
    }
  ];

  return (
    <Menubar model={items}></Menubar>
  );
}

export { Menu }