import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setUserLocal } from '../utilities/localstorage';
import { UserState } from '../utilities/userInterface';
import { updateUser } from '../utilities/users';
import { firstToUpper } from '../utilities/utils';
import { validateEmail, validateName, validatePassword, validatePasswordConfim, validateUserRegister } from '../utilities/validate';

function Update() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [passwordConfim, setPasswordConfim] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [addressNumber, setAddressNumber] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [phone, setPhone] = useState<string>("");

  const loggedUser = useSelector<UserState, UserState["user"]>((state) => state.user);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    if (!loggedUser) {
      navigate("/login");
    }
  })

  useEffect(() => {
    const fetchData = async () => {
      if (loggedUser) {
        setEmail(loggedUser.email);
        setFirstName(firstToUpper(loggedUser.name.firstname));
        setLastName(firstToUpper(loggedUser.name.lastname));
        setUserName(loggedUser.username);
        setCity(loggedUser.address.city);
        setStreet(loggedUser.address.street);
        setAddressNumber(loggedUser.address.number.toString());
        setPostalCode(loggedUser.address.zipcode);
        setPhone(loggedUser.phone);
      }
    };
    fetchData();
  }, [loggedUser]);

  if (!loggedUser || (loggedUser.id === undefined)) {
    <div>Usuário não encontrado</div>
  }

  return (
    <div>
      <h2>Preencha as informações</h2>
      <h3>Email</h3>
      <div>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={({ target: { value } }) => {
            setEmail(value);
          }}
        />
        <span
          hidden={validateEmail(email)}
        >
          email invalido
        </span>
      </div>
      <h3>Senha</h3>
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
        <span
          hidden={validatePassword(password)}
        >
          senha invalida
        </span>
      </div>
      <div>
        <label htmlFor="passwordConfirm">Confirmar Senha</label>
        <input
          type={ passwordVisible ? "text" : "password" }
          id="passwordConfirm"
          value={passwordConfim}
          onChange={({ target: { value } }) => {
            setPasswordConfim(value);
          }}
        />
        <span
          hidden={validatePasswordConfim(password, passwordConfim)}
        >
          senhas não correspondem
        </span>
      </div>
      <h3>Nome</h3>
      <div>
        <label htmlFor="firstName">Nome</label>
        <input
          type="text"
          id="firstName"
          value={firstName}
          onChange={({ target: { value } }) => {
            setFirstName(value);
          }}
        />
        <span
          hidden={validateName(firstName)}
        >
          nome inválido
        </span>
      </div>
      <div>
        <label htmlFor="lastName">Sobrenome</label>
        <input
          type="text"
          id="lastName"
          value={lastName}
          onChange={({ target: { value } }) => {
            setLastName(value);
          }}
        />
        <span
          hidden={validateName(lastName)}
        >
          sobrenome inválido
        </span>
      </div>
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
        <span
          hidden={validateName(userName)}
        >
          usuário inválido
        </span>
      </div>
      <h3>Endereço</h3>
      <div>
        <label htmlFor="city">Cidade</label>
        <input
          type="text"
          id="city"
          value={city}
          onChange={({ target: { value } }) => {
            setCity(value);
          }}
        />
      </div>
      <div>
        <label htmlFor="street">Logradouro</label>
        <input
          type="text"
          id="street"
          value={street}
          onChange={({ target: { value } }) => {
            setStreet(value);
          }}
        />
      </div>
      <div>
        <label htmlFor="number">Número</label>
        <input
          type="text"
          id="number"
          value={addressNumber}
          onChange={({ target: { value } }) => {
            setAddressNumber(value);
          }}
        />
      </div>
      <div>
        <label htmlFor="postalCode">Código postal</label>
        <input
          type="text"
          id="postalCode"
          value={postalCode}
          onChange={({ target: { value } }) => {
            setPostalCode(value);
          }}
        />
      </div>
      <h3>Contato</h3>
      <div>
        <label htmlFor="phone">Telefone</label>
        <input
          type="tel"
          id="phone"
          value={phone}
          onChange={({ target: { value } }) => {
            setPhone(value);
          }}
        />
      </div>
      <button
        disabled={!validateUserRegister({
          email,
          username: userName,
          password,
          name: {
            firstname: firstName,
            lastname: lastName,
          },
          address: {
            city: city,
            street: street,
            number: Number.parseInt(addressNumber),
            zipcode: postalCode,
            geolocation: {
              lat: '',
              long: '',
            },
          },
          phone,
        }, passwordConfim)}
        onClick={() => {
          const newUser = {
            id: loggedUser?.id,
            email,
            username: userName,
            password,
            name: {
              firstname: firstName,
              lastname: lastName,
            },
            address: {
              city: city,
              street: street,
              number: Number.parseInt(addressNumber),
              zipcode: postalCode,
              geolocation: {
                lat: '',
                long: '',
              },
            },
            phone,
          }
          updateUser(newUser);
          setUserLocal(newUser);
          dispatch({ type: "LOGGED_USER", payload: newUser });
          navigate("/home");
        }}
      >
        Alterar
      </button>
      <button
        onClick={() => {
          navigate(`/delete`);
        }}
      >
        Deletar
      </button>
    </div>
  );
}

export default Update;
