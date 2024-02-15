import React, { useState } from 'react';
import { ChakraProvider } from "@chakra-ui/react";
import Header from './components/Header';
import { Outlet, useLoaderData } from 'react-router-dom';

type Data = {
  email: string,
  user: string
}

export type Context = {
  loggedIn: boolean,
  toggleLoggedIn: () => void
}

function App() {

  const data = useLoaderData() as Data || undefined;
  const [loggedIn, setLoggedIn] = useState(data.email ? true : false);

  const toggleLoggedIn = () => {
    setLoggedIn(!loggedIn);
  }

  const context: Context = {loggedIn, toggleLoggedIn};

  return (
    <ChakraProvider>
      <Header loggedIn={loggedIn}/>
      <Outlet context={context}/>
    </ChakraProvider>
  )
}

export default App;
