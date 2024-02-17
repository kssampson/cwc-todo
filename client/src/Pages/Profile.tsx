import { Box, Button, HStack, Heading, VStack, useToast, Text, Avatar } from "@chakra-ui/react"
// import { useState } from "react";
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
    <Box py={10}>
      <VStack spacing={4}>
        <Text textAlign="center" mb={4} fontSize={20}>
          Account Details
        </Text>
        <Text textAlign="center">
          Welcome {data.user}. You can manage your account details here.
        </Text>
      </VStack>
      <VStack m={10} alignItems="center">
        <Box display="flex" width="60%" gap={10} py={8} alignItems="center">
          <Box border="1px solid black">
            <Avatar size="2xl" name={data.user} />
          </Box>
          <Box w="100%" display="flex" flexDirection="column" gap={4} border="1px solid black">
            <Box display="flex">
              <Text w="40%">Username:</Text>
              <Text>{data.user}</Text>
            </Box>
            <Box display="flex">
              <Text w="40%">Email:</Text>
              <Text>{data.email}</Text>
            </Box>
            <Box display="flex">
              <Text w="40%">Password:</Text>
              <Text>********</Text>
            </Box>
          </Box>
        </Box>
        <HStack p={10}>
          <Button onClick={logOut}>Log Out</Button>
          <Button>Delete Account</Button>
        </HStack>
      </VStack>
    </Box>
  )
}

export default Profile;