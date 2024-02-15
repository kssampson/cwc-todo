import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RouterProvider, createBrowserRouter, redirect } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Projects from './Pages/Projects';
import Profile from './Pages/Profile';
import axios from 'axios';


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
      },
      {
        path: "projects",
        element: <Projects />,
      },
      {
        path: "profile",
        element: <Profile />,
        loader: async () => {
          //get a token from local storage
          const token = localStorage.getItem("token");

          //if we have token, we use it as a bearer token on our request for user data
          if (token) {
            // console.log('name', name)
            try {
                const response = await axios.get("http://localhost:3001/auth/profile",
                { headers: { Authorization: `Bearer ${token}` } }
              );
              return response.data;
            } catch (error) {
              return redirect("/log-in")
            }
          } else {
            return redirect("/log-in")
          }

          //if we don't have a token. we'll show an error toast and redirect the user to the sign up page.

          //if you have an expired token, we will show an error toast and redirect the user to login page
          // return "LOADER";
        }
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(<RouterProvider router={router}/>);

