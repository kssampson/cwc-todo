import { Box, Button, Heading, VStack, useToast } from "@chakra-ui/react"
import { useEffect, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";


const Profile = () => {

  const Navigate = useNavigate();
  const toast = useToast();

  const data = useLoaderData();
  const [userData, setUserData] = useState(data);

  const logOut = () => {
    localStorage.removeItem("token");

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
  console.log("userData State: ", userData)
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