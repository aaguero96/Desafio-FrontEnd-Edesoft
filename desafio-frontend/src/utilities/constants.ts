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

export {
  BASE_URL,
  USERS_TABLE_HEADERS,
}