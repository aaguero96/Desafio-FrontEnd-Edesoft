import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IUser } from '../utilities/userInterface';
import { getUserById, updateUser } from '../utilities/users';
import { firstToUpper } from '../utilities/utils';
import { validateEmail, validateName, validatePassword, validatePasswordConfim, validateUserRegister } from '../utilities/validate';

function Update() {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
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

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      if (id !== undefined) {
        const data = await getUserById(Number.parseInt(id));
        setLoading(false);
        setUser(data);

        setEmail(data.email);
        setFirstName(firstToUpper(data.name.firstname));
        setLastName(firstToUpper(data.name.lastname));
        setUserName(data.username);
        setCity(data.address.city);
        setStreet(data.address.street);
        setAddressNumber(data.address.number.toString());
        setPostalCode(data.address.zipcode);
        setPhone(data.phone);
      }
    };
    fetchData();
  }, [id]);

  if (loading) {
    return <div>Procurando...</div>
  }

  if (user === null || id === undefined) {
    return <div>Usuário não encrontrado</div>
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
          updateUser({
            id: Number.parseInt(id),
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
          });
        }}
      >
        Alterar
      </button>
    </div>
  );
}

export default Update;
