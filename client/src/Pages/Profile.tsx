import { Box, Button, Heading, VStack, useToast } from "@chakra-ui/react"
import { useState } from "react";
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { Context } from "../App";


const Profile = () => {

  const Navigate = useNavigate();
  const context = useOutletContext() as Context
  const toast = useToast();
  const data = useLoaderData();
  const [userData, setUserData] = useState(data);

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
        <Heading mb={6}>Account Details</Heading>
        <Button
        onClick={logOut}
        >Log Out</Button>
      </VStack>
    </Box>
  )
}

export default Profile;