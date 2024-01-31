import React from 'react';
import postButtonTest from './utils/postButtonTest'
import { Heading, Text, Box, Flex, Button, Stack } from "@chakra-ui/react";

function App() {

  const handleClick = (e: { preventDefault: () => void; }) => {
    const userData = {
      name: 'hobgoblin',
      email: 'hobgoblin@gmail.com',
      password: 'evil123',
      signedIn: false
    };
    postButtonTest(userData);
  }


  return (
    <Flex width={"100vh"} height={"100vh"} alignContent={"center"} justifyContent={"center"}>
      <Box maxW="2xl" m="0 auto">
        <Heading as="h1" textAlign="center" fontSize="5xl" mt="100px">
        Test for Adding a dummy user
        </Heading>
          <Text fontSize="xl" textAlign="center" mt="30px">
            The button below will add dummy user data to our user table in the db
          </Text>
          <Stack align="center">
            <Button
            colorScheme='teal'
            size="md"
            onClick={(e) => handleClick(e)}
            >
            Add User</Button>
          </Stack>
      </Box>
    </Flex>
  );
}

export default App;
