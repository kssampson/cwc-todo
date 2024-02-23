import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Input,
  Box,
  VStack,
  Stack,
  FormErrorMessage,
  Heading,
  useToast,
} from '@chakra-ui/react'
import { useState } from 'react';
import { validateInputs } from '../../utils/validateInputs';
import ConfirmDeleteButton from './ConfirmDelete';
import deleteAccount from '../../utils/deleteAccount';
import { useNavigate } from 'react-router-dom';

type Props = {
  isOpen: boolean,
  onClose: () => void,
  id: number
}

const DeleteAccountModal = ({isOpen, onClose, id}: Props) => {

  const Navigate = useNavigate();
  const toast = useToast();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("")

  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [passwordSubmitted, setPasswordSubmitted] = useState(false);
  const [secondPasswordSubmitted, setSecondPasswordSubmitted] = useState(false);

  const isErrorName = !validateInputs.isValidName(name) && nameSubmitted;
  const isErrorEmail = !validateInputs.isValidEmail(email) && emailSubmitted;
  const isErrorPassword = !validateInputs.isValidPassword(password) && passwordSubmitted;
  const isErrorSecondPassword = !validateInputs.isValidSecondPassword(password, secondPassword) && secondPasswordSubmitted;

  const onChangeName = (e: any) => {
    setNameSubmitted(false);
    setName(e.target.value);
  }

  const onChangeEmail = (e: any) => {
    setEmailSubmitted(false);
    setEmail(e.target.value);
  }

  const onChangePassword = (e: any) => {
    setPasswordSubmitted(false)
    setPassword(e.target.value);
  }

  const onChangeSecondPassword = (e: any) => {
    setSecondPasswordSubmitted(false);
    setSecondPassword(e.target.value);
  }

  const submit = async () => {
    setNameSubmitted(true);
    setEmailSubmitted(true);
    setPasswordSubmitted(true);
    setSecondPasswordSubmitted(true);

    try {
      const token = localStorage.getItem("token");
      await deleteAccount(id, name, email, password, token)
      toast({
        title: `We're sorry to see you go.`,
        position: "top-right",
        description: "Thanks from Todoucan!",
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      setName("");
      setEmail("");
      setPassword("");
      setSecondPassword("");

      setNameSubmitted(false);
      setEmailSubmitted(false);
      setPasswordSubmitted(false);
      setSecondPasswordSubmitted(false);

      Navigate('/sign-up')
    } catch (error) {
      console.log('error: ', error)
      toast({
        title: `We had an error deleting your account.`,
        position: "top-right",
        description: `${error}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      setName("");
      setEmail("");
      setPassword("");
      setSecondPassword("");

      setNameSubmitted(false);
      setEmailSubmitted(false);
      setPasswordSubmitted(false);
      setSecondPasswordSubmitted(false);
    }
    onClose();
  }



  return (
    <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalCloseButton />
          <ModalBody>
          <Box>
            <VStack >
              <Heading mb={6}>Delete Your Account</Heading>
              <Box maxWidth={"75%"} width={"100%"}>
                <Stack spacing={3}>
                  <Box>
                    <FormControl isInvalid={isErrorName} isRequired>
                      <FormLabel>Username:</FormLabel>
                      <Input type='text' value={name ? name : ""} onChange={onChangeName} />
                      {!isErrorName ? null : (
                        <FormErrorMessage>Name is required.</FormErrorMessage>
                      )}
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl isInvalid={isErrorEmail} isRequired>
                      <FormLabel>Email:</FormLabel>
                      <Input type='email' value={email} onChange={onChangeEmail} />
                      {!isErrorEmail ? null : (
                        <FormErrorMessage>Email is required.</FormErrorMessage>
                      )}
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl isInvalid={isErrorPassword} isRequired>
                      <FormLabel>Password:</FormLabel>
                      <Input type='password' value={password} onChange={onChangePassword} />
                      {!isErrorPassword ? null : (
                        <FormErrorMessage>Password is required.</FormErrorMessage>
                      )}
                    </FormControl>
                  </Box>
                  <Box>
                    <FormControl isInvalid={isErrorSecondPassword} isRequired>
                      <FormLabel>Confirm Password:</FormLabel>
                      <Input type='password' value={secondPassword} onChange={onChangeSecondPassword} />
                      {!isErrorSecondPassword ? null : (
                        <FormErrorMessage>Passwords Do Not Match.</FormErrorMessage>
                      )}
                    </FormControl>
                  </Box>
                </Stack>
              </Box>
            </VStack>
          </Box>
          </ModalBody>
          <ModalFooter alignSelf={"center"} m={8}>
            <Button onClick={onClose} mr={4}>
                Cancel
              </Button>
            <ConfirmDeleteButton submit={submit}/>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default DeleteAccountModal;