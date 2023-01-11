import React, { useEffect } from 'react';
import Update from '../components/Update';
import Header from '../components/Header';
import { useSelector } from 'react-redux';
import { UserState } from '../utilities/userInterface';
import { useNavigate } from 'react-router-dom';

function UpdatePage() {
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
      <Update />
    </div>
  );
}

export default UpdatePage;
