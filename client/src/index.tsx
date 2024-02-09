import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "sign-up",
        element: <SignUp />,
      },
      {
        path: "log-in",
        element: <Login/>
      }
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<RouterProvider router={router}/>);

