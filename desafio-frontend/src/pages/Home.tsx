import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import User from '../components/User';
import { UserState } from '../utilities/userInterface';

function Home() {
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
      <User />
    </div>
  );
}

export default Home;
