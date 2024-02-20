import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack, VStack, useToast, Text } from "@chakra-ui/react"
import { useState } from "react";
import { validateInputs } from "../utils/validateInputs";
import login from "../utils/login";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Context } from "../App";


const Login = () => {

  const Navigate = useNavigate();
  const context = useOutletContext() as Context;
  const toast = useToast();

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [passwordSubmitted, setPasswordSubmitted] = useState(false);

  const isErrorName = !validateInputs.isValidName(name) && nameSubmitted;
  const isErrorPassword = !validateInputs.isValidPassword(password) && passwordSubmitted;


  const onChangeName = (e: any) => {
    setNameSubmitted(false);
    setName(e.target.value);
  }

  const onChangePassword = (e: any) => {
    setPasswordSubmitted(false)
    setPassword(e.target.value);
  }

  const onSubmit = async () => {
    setNameSubmitted(true);
    setPasswordSubmitted(true);
    if (!validateInputs.isValidName(name) || !validateInputs.isValidPassword(password)) {
      return;
    } else {
      await login({username: name, password: password})
      .then((response) => {
        const token = response;
        context.toggleLoggedIn();
        localStorage.setItem("token", token);
        localStorage.setItem('name', name);
        toast({
          title: 'Login successful.',
          position: "top-right",
          description: `Welcome ${name}!`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
        setName("");
        setPassword("");
        setNameSubmitted(false);
        setPasswordSubmitted(false);

        Navigate("/projects")
      })
      .catch((error) => {
        toast({
          title: 'Error logging in. Please try again.',
          position: "top-right",
          description: `${error}`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
        setName("");
        setPassword("");
        setNameSubmitted(false);
        setPasswordSubmitted(false);
      })
    }
  }

  return (
    <Box>
      <VStack >
        <Heading mb={6}>Log-In</Heading>
        <Box maxWidth={"75%"} width={"100%"}>
          <Stack spacing={3}>
            <Box>
              <FormControl isInvalid={isErrorName} isRequired>
                <FormLabel>User Name:</FormLabel>
                <Input type='text' value={name ? name : ""} onChange={onChangeName} />
                {!isErrorName ? null : (
                  <FormErrorMessage>Name is required.</FormErrorMessage>
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
              {/* No functionality yet for looking up password */}
              <Text as={"em"} flex={1} fontSize={"small"} _hover={{ color: "blue" }}>Forgot password?</Text>
            </Box>
            <Button
            onClick={onSubmit}
            >Submit
            </Button>
          </Stack>
        </Box>
      </VStack>
    </Box>
  )
}

export default Login