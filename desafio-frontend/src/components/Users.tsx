import React, { useEffect, useState } from 'react';
import { USERS_TABLE_HEADERS } from '../utilities/constants';
import { IUser, IUserFilter } from '../utilities/userInterface';
import { getUsers } from '../utilities/users';
import { order } from '../utilities/usersEnum';
import { firstToUpper } from '../utilities/utils';

function Users() {
  const [users, setUsers] = useState<IUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredUsers, setFilteredUsers] = useState<IUser[]>([]);
  const [filters, setFilters] = useState<IUserFilter>({
    name: '',
    username: '',
    email: '',
    city: '',
    phone: '',
  });
  const [limit, setLimit] = useState<number>(10);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getUsers(undefined, order.ASC);
      setLoading(false);
      setUsers(data);
      setFilteredUsers(data);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setFilteredUsers(users.filter((user) => {
      const validate: boolean[] = [
        (user.name.firstname + user.name.lastname).includes(filters.name.toLowerCase()),
        user.username.includes(filters.username.toLowerCase()),
        user.email.includes(filters.email.toLowerCase()),
        user.address.city.includes(filters.city.toLowerCase()),
        user.phone.includes(filters.phone.toLowerCase()),
        user.id <= limit,
      ];
      return validate.every((i) => i);
    }));
  }, [filters, limit]);

  if (loading) {
    return (
      <div>Procurando...</div>
    )
  }

  if (users.length === 0) {
    return (
      <div>Não há registros</div>
    )
  }

  return (
    <div>
      <label htmlFor="limit">Limite</label>
      <input
        type="number"
        id="limit"
        max={users.length}
        min={0}
        disabled={loading}
        onChange={({ target: { value } }) => {
          setLimit(Number.parseInt(value));
        }}
        value={limit}
      />
      <table>
        <thead>
          <tr>
            {
              USERS_TABLE_HEADERS.map(({ header, key }) => (
                <th key={header}>
                  <label htmlFor={header}>{header}</label>
                  <input
                    id={header}
                    onChange={({ target: { value } }) => {
                      setFilters({
                        ...filters,
                        [key]: value,
                      });
                    }}
                  />
                </th>
              ))
            }
          </tr>
        </thead>
        <tbody>
          {
            filteredUsers.map((user: IUser) => (
              <tr key={user.id}>
                <td>{firstToUpper(`${user.name.firstname} ${user.name.lastname}`)}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{firstToUpper(user.address.city)}</td>
                <td>{user.phone}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
}

export default Users;
