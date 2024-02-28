import { Box, Button, useToast, Text, Avatar, IconButton, VStack, useDisclosure} from "@chakra-ui/react"
import { EditIcon } from '@chakra-ui/icons'
import { useLoaderData, useNavigate, useOutletContext } from "react-router-dom";
import { Context } from "../App";
import UserDetails from "../components/Profile/UserDetails";
import { useState } from "react";
import DeleteAccountModal from "../components/Profile/DeleteAccountModal";

export type Data = {
  username: string,
  email: string,
  id: number
}

const Profile = () => {

  const { isOpen, onOpen, onClose } = useDisclosure()

  const Navigate = useNavigate();
  const context = useOutletContext() as Context
  const toast = useToast();
  const LoaderData = useLoaderData() as Data;
  const [data, setData] = useState(LoaderData);

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

  const updateData = (updatedData: any | void) => {
    setData(updatedData)
  }

  const openModal = () => {
    onOpen()
  }

  return (
    <Box py={10}>
        <Text textAlign="center" mb={4} fontSize={20}>
          Account Details
        </Text>
        <Text textAlign="center">
          Welcome {data.username}. You can manage your account details here.
        </Text>
        <Box display="flex" width="60%" gap={10} py={20} m="0 auto" lineHeight="32px">
          <Box display="flex" alignItems="center">
            <VStack>
              <Avatar size="2xl" name={data.username}/>
              <IconButton aria-label={"edit icon"} icon={<EditIcon/>} background="none" size="sm"></IconButton>
            </VStack>
          </Box>
          <Box w="100%" display="flex" flexDirection="column" gap={3}>
            <UserDetails fieldDesc={"username"} userDetail={data.username} id={data.id} updateData={updateData}/>
            <UserDetails fieldDesc={"email"} userDetail={data.email} id={data.id} updateData={updateData}/>
            <UserDetails fieldDesc={"password"} userDetail={"*********"} id={data.id} updateData={updateData}/>
          </Box>
        </Box>
        <Box display="flex" gap={4} justifyContent="center">
          <Button onClick={logOut}>Log Out</Button>
          <Button onClick={onOpen} colorScheme="red">Delete Account</Button>
        </Box>
        <DeleteAccountModal isOpen={isOpen} onClose={onClose} id={data.id}/>
    </Box>
  )
}

export default Profile;