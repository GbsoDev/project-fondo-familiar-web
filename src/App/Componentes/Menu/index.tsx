import { NavLink } from "react-router-dom";

function Menu() {
  const routes = [
    {
      to: '/',
      text: 'Home'
    },
    {
      to: '/usuarios',
      text: 'Usuarios'
    },
  ];

  return (
    <nav>
      <ul>
        {routes.map(route => (
          <li key={route.to}>
            <NavLink
              style={({ isActive }) => ({
                color: isActive ? 'green' : 'blue',
              })}
              to={route.to}
            >{route.text}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export { Menu }