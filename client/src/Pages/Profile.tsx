import { Box, Button, HStack, Heading, VStack, useToast, Text } from "@chakra-ui/react"
import { useState } from "react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { Context } from "../App";

type Data = {
  user: string,
  email: string
}

const Profile = () => {

  const Navigate = useNavigate();
  const context = useOutletContext() as Context
  const toast = useToast();
  const data = useLoaderData() as Data;

  const logOut = () => {
    localStorage.removeItem("token");
    context.toggleLoggedIn();

    Navigate("/log-in");
    toast({
      title: 'Success',
      position: "top-right",
      description: "You've successfully logged out",
      status: 'success',
      duration: 3000,
      isClosable: true,
    })
  }

  return (
    <Box>
      <VStack>
        <Heading mb={6} mt={5}>Account Details</Heading>
        <Text>Welcome {data.user}. You can edit your account details here.</Text>
        <HStack>
          <Text fontSize='6l'>Username:</Text>
          <Text fontSize='6l'>{data.user}</Text>
        </HStack>
        <HStack>
          <Button
          onClick={logOut}
          >Log Out</Button>
          <Button>Delete Account</Button>

        </HStack>

      </VStack>
    </Box>
  )
}

export default Profile;