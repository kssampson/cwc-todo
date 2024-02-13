import { Box, Button, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack, VStack } from "@chakra-ui/react"
import { useState } from "react";
import { validateInputs } from "../utils/validateInputs";
import login from "../utils/login";
import { useNavigate } from "react-router-dom";


const Login = () => {

  const Navigate = useNavigate();

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
      const token = await login({username: name, password: password})

      localStorage.setItem("token: ", token);
      Navigate("/projects")

      setName("");
      setPassword("");
      setNameSubmitted(false);
      setPasswordSubmitted(false);
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