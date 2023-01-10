import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IUser } from '../utilities/userInterface';
import { getUserById } from '../utilities/users';
import { firstToUpper } from '../utilities/utils';

function User() {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (id !== undefined) {
        const data = await getUserById(Number.parseInt(id));
        setLoading(false);
        setUser(data);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <div>Procurando...</div>
  }

  if (user === null) {
    return <div>Usuário não encrontrado</div>
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
