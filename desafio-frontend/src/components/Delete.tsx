import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { IUser } from '../utilities/userInterface';
import { getUserById } from '../utilities/users';

const Delete = () => {
  const [areYouSure, setAreYouSure] = useState<boolean | undefined>(undefined);
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [password, setPassword] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [disableButton, setDisableButton] = useState<boolean>(true);
  
  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    if (!areYouSure && areYouSure !== undefined) {
      navigate("/users")
    }
  }, [areYouSure, navigate])

  useEffect(() => {
    if (user !== null) {
      const validade1 = password === user.password;
      const validate2 = userName === user.username;
      const validate = validade1 && validate2
      setDisableButton(!validate);
    }
  }, [password, userName]);

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
    return <div>Carregando...</div>
  }

  if (areYouSure === undefined) {
    return (
      <div>
        <h2>Deseja excluir o seu login?</h2>
        <button onClick={() => {setAreYouSure(true)}}>Sim</button>
        <button onClick={() => {setAreYouSure(false)}}>Não</button>
      </div>
    );
  }

  if (areYouSure) {
    return (
      <div>
        <div>
          <label htmlFor="password">Digite a sua senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={({ target: { value } }) => {
              setPassword(value);
            }}
          />
        </div>
        <div>
          <label htmlFor="username">Digite seu usuário se deseja prosseguir (<strong>{user?.username}</strong>):</label>
          <input
            type="text"
            id="username"
            value={userName}
            onChange={({ target: { value } }) => {
              setUserName(value);
            }}
          />
        </div>
        <button
          disabled={disableButton}
        >
          Deletar conta
        </button>
      </div>
    )
  }

  return <div></div>
}

export default Delete;
