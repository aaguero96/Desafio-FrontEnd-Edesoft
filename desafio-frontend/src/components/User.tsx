import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { UserState } from '../utilities/userInterface';
import { firstToUpper } from '../utilities/utils';

function User() {
  const user = useSelector<UserState, UserState["user"]>((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  })

  if (!user) {
    return <div></div>
  }

  return (
    <div>
      <h2>Informações</h2>
      <h3>Usuário</h3>
      <span>{user.username}</span>
      <h3>Email</h3>
      <span>{user.email}</span>
      <h3>Nome</h3>
      <span>{firstToUpper(user.name.firstname + " " + user.name.lastname)}</span>
      <h3>Endereço</h3>
      <span>{user.address.city + " ," + user.address.street + " ," + user.address.number + " ,zip code: " + user.address.zipcode}</span>
      <h3>Contato</h3>
      <span>{user.phone}</span>
    </div>
  );
}

export default User;
