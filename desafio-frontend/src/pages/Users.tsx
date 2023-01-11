import React, { useEffect } from 'react';
import Users from '../components/Users';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import { UserState } from '../utilities/userInterface';
import { useNavigate } from 'react-router-dom';

function UsersPage() {
  const loggedUser = useSelector<UserState, UserState["user"]>((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedUser) {
      navigate("/login");
    }
  })

  return (
    <div>
      <Header />
      <Users />
    </div>
  );
}

export default UsersPage;
