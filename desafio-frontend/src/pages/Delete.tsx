import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Delete from '../components/Delete';
import Header from '../components/Header';
import { UserState } from '../utilities/userInterface';

function DeletePage() {
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
      <Delete />
    </div>
  );
}

export default DeletePage;
