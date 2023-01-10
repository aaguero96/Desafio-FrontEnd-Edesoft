import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Users from './components/Users';
import App from './App';
import Register from './components/Register';
import User from './components/User';
import Update from './components/Update';
import Delete from './components/Delete';
import Login from './pages/Login';
import { Provider } from 'react-redux';
import { store } from './store';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/users",
    element: <Users />
  },
  {
    path: "/users/:id",
    element: <User />
  },
  {
    path: "/edit/:id",
    element: <Update />
  },
  {
    path: "/register",
    element: <Register />
  },
  {
    path: "/delete/:id",
    element: <Delete />
  },
  {
    path: "/",
    element: <App />
  }
]);



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
