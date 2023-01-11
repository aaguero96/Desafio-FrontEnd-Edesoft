import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Register from '../components/Register';
import { UserState } from '../utilities/userInterface';

function RegisterPage() {
  const loggedUser = useSelector<UserState, UserState["user"]>((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedUser) {
      navigate("/login");
    }
  })

  return (
    <div>
      <button
        onClick={() => {navigate("/login")}}
      >
        Voltar
      </button>
      <Register />
    </div>
  );
}

export default RegisterPage;
