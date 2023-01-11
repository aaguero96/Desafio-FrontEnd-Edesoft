import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { removeUserLocal, setUserLocal } from '../utilities/localstorage';
import { UserState } from '../utilities/userInterface';
import { deleteUser } from '../utilities/users';

const Delete = () => {
  const [areYouSure, setAreYouSure] = useState<boolean | undefined>(undefined);
  const [password, setPassword] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [disableButton, setDisableButton] = useState<boolean>(true);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const navigate = useNavigate();

  const loggedUser = useSelector<UserState, UserState["user"]>((state) => state.user);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!areYouSure && areYouSure !== undefined) {
      navigate("/home")
    }
  }, [areYouSure, navigate])

  useEffect(() => {
    if (loggedUser !== undefined) {
      const validade1 = password === loggedUser.password;
      const validate2 = userName === loggedUser.username;
      const validate = validade1 && validate2
      setDisableButton(!validate);
    }
  }, [password, userName, loggedUser]);

  if (areYouSure === undefined) {
    return (
      <div>
        <h2>Deseja excluir o seu login?</h2>
        <button onClick={() => {setAreYouSure(true)}}>Sim</button>
        <button onClick={() => {setAreYouSure(false)}}>Não</button>
      </div>
    );
  }

  if (areYouSure && loggedUser !== undefined) {
    return (
      <div>
        <div>
          <label htmlFor="password">Digite a sua senha:</label>
          <input
            type={ passwordVisible ? "text" : "password" }
            id="password"
            value={password}
            onChange={({ target: { value } }) => {
              setPassword(value);
            }}
          />
          <button
            onClick={() => {
              setPasswordVisible(!passwordVisible);
            }}
          >
            { passwordVisible ? "não mostrar" : "mostrar" }
          </button>
        </div>
        <div>
          <label htmlFor="username">Digite seu usuário se deseja prosseguir (<strong>{loggedUser?.username}</strong>):</label>
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
          onClick={() => {
            deleteUser(loggedUser);
            removeUserLocal();
            dispatch({ type: "LOGGED_USER", payload: undefined });
            navigate("/login");
          }}
        >
          Deletar conta
        </button>
      </div>
    )
  }

  return <div></div>
}

export default Delete;
