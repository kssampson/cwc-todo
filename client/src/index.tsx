import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { RouterProvider, createBrowserRouter, redirect, useParams } from 'react-router-dom';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import Projects from './Pages/Projects';
import Profile from './Pages/Profile';
import axios from 'axios';
import { createStandaloneToast } from '@chakra-ui/react';
import ResetPassword from './Pages/ResetPassword';
import Project from './Pages/Project';

const { ToastContainer, toast } = createStandaloneToast()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: async () => {
      const token = localStorage.getItem("token");

      if (token) {
        try {
          const response = await axios.get("http://localhost:3001/auth/profile",
            { headers: { Authorization: `Bearer ${token}` } }
          );
          return response.data;
        } catch (error) {
          return {};
        }
      } else {
        return {};
      }
    },
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
        loader: async () => {
          const token = localStorage.getItem("token");
          if (token) {
            try {
                const response = await axios.get("http://localhost:3001/auth/user-projects",
                { headers: { Authorization: `Bearer ${token}` } }
              );
              return response.data;
            } catch (error) {
              toast({
                title: 'Error.',
                position: "top-right",
                description: 'Please sign into your account.',
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
              return redirect("/log-in")
            }
          } else {
            toast({
              title: 'Error.',
              position: "top-right",
              description: 'You must have an account.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            })
            return redirect("/sign-up")
          }
        }
      },
      {
        path: "profile",
        element: <Profile />,
        loader: async () => {
          const token = localStorage.getItem("token");
          if (token) {
            try {
                const response = await axios.get("http://localhost:3001/auth/profile",
                { headers: { Authorization: `Bearer ${token}` } }
              );
              return response.data;
            } catch (error) {
              toast({
                title: 'Error.',
                position: "top-right",
                description: 'Please sign into your account.',
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
              return redirect("/log-in")
            }
          } else {
            toast({
              title: 'Error.',
              position: "top-right",
              description: 'You must have an account.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            })
            return redirect("/sign-up")
          }
        },
      },
      {
        path: "/reset-password/:token/:id",
        element: <ResetPassword />,
      },
      {
        path: "project/:id",
        element: <Project />,
        loader: async ({params}) => {
          const token = localStorage.getItem("token");

          if (token) {
            try {
                const response = await axios.get(`http://localhost:3001/auth/project/${params.id}`,
                { headers: { Authorization: `Bearer ${token}` } }
              );
              if (!response.data.length) {
                toast({
                  title: 'Error.',
                  position: "top-right",
                  description: 'Project not accessible.',
                  status: 'error',
                  duration: 3000,
                  isClosable: true,
                })
                redirect('/projects')
              }
              console.log('response.data: ', response.data)
              return response.data;
            } catch (error) {
              toast({
                title: 'Error.',
                position: "top-right",
                description: 'Please sign into your account.',
                status: 'error',
                duration: 3000,
                isClosable: true,
              })
              return redirect("/log-in")
            }
          } else {
            toast({
              title: 'Error.',
              position: "top-right",
              description: 'You must have an account.',
              status: 'error',
              duration: 3000,
              isClosable: true,
            })
            return redirect("/sign-up")
          }
        }
      },
    ],
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <>
    <ToastContainer />
    <RouterProvider router={router}/>
  </>
);

