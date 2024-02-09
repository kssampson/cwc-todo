import { Box, FormControl, Text, Heading, Input, Stack, VStack, Button, FormLabel, FormErrorMessage } from "@chakra-ui/react"
import { useState } from 'react';
import isValidEmail from "../utils/isValidEmail";
// import { create } from "domain";

const SignUp = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [nameSubmitted, setNameSubmitted] = useState(false);
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [passwordSubmitted, setPasswordSubmitted] = useState(false);

  const isErrorName = name === "" && nameSubmitted;
  const isErrorEmail = !isValidEmail(email) && emailSubmitted;
  const isErrorPassword = password === "" && passwordSubmitted;

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

  const onSubmit = () => {
    setNameSubmitted(true);
    setEmailSubmitted(true);
    setPasswordSubmitted(true);
    if (isErrorName || isErrorEmail || isErrorPassword) {
      console.log("data entry error")
      return;
    } else {
      // await createUserSubmit({name: name, email: email, password: password, signedIn: false})
      // setName("");
      // setEmail("");
      // setPassword("");
      console.log('no errors, continue with call to api')
    }
  }

  return (
    <Box>
      <VStack >
        <Heading mb={6}>Create an Account</Heading>
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

export default SignUp