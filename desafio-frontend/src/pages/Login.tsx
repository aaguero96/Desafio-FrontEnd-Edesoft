import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TIMEOUT_TO_MENSAGE_SCAN } from '../utilities/constants';
import { setUserLocal } from '../utilities/localstorage';
import { IUser, UserState } from '../utilities/userInterface';
import { getUsers } from '../utilities/users';
import { order } from '../utilities/usersEnum';

function Login() {
  const [userName, setUserName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [users, setUsers] = useState<IUser[]>();
  const [loading, setLoading] = useState<boolean>(true);
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [noHasRegister, setNoHasRegister] = useState<boolean>(true);

  const dispatch = useDispatch();

  const loggedUser = useSelector<UserState, UserState["user"]>((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (loggedUser) {
      navigate(`/home`)
    }
  }, [loggedUser, navigate])

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsers(undefined, order.ASC);
      setUsers(data);
      setLoading(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (!noHasRegister) {
      setTimeout(() => {
        setNoHasRegister(true);
      }, TIMEOUT_TO_MENSAGE_SCAN);
    }
  }, [noHasRegister])

  if (loading) {
    return (
      <div>Carregando...</div>
    )
  }
  
  return (
    <div>
      <div>
        <label htmlFor="username">Usuário</label>
        <input
          type="text"
          id="username"
          value={userName}
          onChange={({ target: { value } }) => {
            setUserName(value);
          }}
        />
      </div>
      <div>
        <label htmlFor="password">Senha</label>
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
        <span hidden={noHasRegister}>Senha ou usuário incorretos</span>
      </div>
      <button
        onClick={() => {
            const register = users?.filter((user) => {
            const validate1 = userName.toLowerCase() === user.username.toLowerCase();
            const validate2 = userName.toLowerCase() === user.email.toLowerCase();
            const validate3 = password === user.password;
            return (validate1 || validate2) && validate3;
          });
          if (register?.length !== 0 && register !== undefined) {
            dispatch({ type: "LOGGED_USER", payload: register[0] });
            setUserLocal(register[0]);
            navigate(`/home`);
          } else {
            setNoHasRegister(false);
          }
        }}
      >
        Login
      </button>
      <button
        onClick={() => {
          navigate("/register");
        }}
      >
        Cadastrar
      </button>
    </div>
  );
}

export default Login;
