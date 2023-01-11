import React from 'react';
import { useNavigate } from 'react-router-dom';
import Register from '../components/Register';

function RegisterPage() {
  const navigate = useNavigate();

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
