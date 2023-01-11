import React from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => { navigate(`/home`) }}
      >
        Home
      </button>
      <button
      onClick={() => { navigate(`/users`) }}
      >
        Usuários
      </button>
      <button
        onClick={() => { navigate(`/edit`) }}
      >
        Editar cadastro
      </button>
    </div>
  );
}

export default Header;
