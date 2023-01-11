import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import User from './components/User';
import Delete from './components/Delete';
import Login from './pages/Login';
import { Provider } from 'react-redux';
import { store } from './store';
import RegisterPage from './pages/Register';
import Home from './pages/Home';
import UsersPage from './pages/Users';
import UpdatePage from './pages/Update';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    index: true,
  },
  {
    path: "/login",
    element: <Login />,
    index: true,
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/home/:id",
    element: <Home />
  },
  {
    path: "/users",
    element: <UsersPage />
  },
  {
    path: "/users/:id",
    element: <User />
  },
  {
    path: "/edit/:id",
    element: <UpdatePage />
  },
  {
    path: "/delete/:id",
    element: <Delete />
  },
  {
    path: "/*",
    element: <App />
  }
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
