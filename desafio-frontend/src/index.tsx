import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Users from './components/Users';
import App from './App';
import Register from './components/Register';
import User from './components/User';

const router = createBrowserRouter([
  {
    path: "/users",
    element: <Users />
  },
  {
    path: "/users/:id",
    element: <User />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/",
    element: <App />
  }
])

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
