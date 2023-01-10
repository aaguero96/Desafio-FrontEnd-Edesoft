import { IHeaders } from "./userInterface";

const BASE_URL = 'https://fakestoreapi.com/users';

const USERS_TABLE_HEADERS: IHeaders[] = [
  {
    header: 'Nome',
    key: 'name',
  },
  {
    header: 'Usuário',
    key: 'username',
  },
  {
    header: 'Email',
    key: 'email',
  },
  {
    header: 'Cidade',
    key: 'city',
  },
  {
    header: 'Telefone',
    key: 'phone',
  },
];

const MIN_LEN_PASSWORD = 3;

const MIN_LEN_NAME = 3;

export {
  BASE_URL,
  USERS_TABLE_HEADERS,
  MIN_LEN_PASSWORD,
  MIN_LEN_NAME,
}