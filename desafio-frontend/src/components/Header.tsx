import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserState } from '../utilities/userInterface';

function Header() {
  const loggedUser = useSelector<UserState, UserState["user"]>((state) => state.user);

  const navigate = useNavigate();

  return (
    <div>
      <button
        onClick={() => { navigate(`/home/${loggedUser?.id}}`) }}
      >
        Home
      </button>
      <button
      onClick={() => { navigate(`/users`) }}
      >
        Usuários
      </button>
      <button
        onClick={() => { navigate(`/edit/${loggedUser?.id}}`) }}
      >
        Editar cadastro
      </button>
    </div>
  );
}

export default Header;
