import { Box, FormControl, FormErrorMessage, FormLabel, Heading, Input, Stack, VStack, Button } from "@chakra-ui/react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { validateInputs } from "../utils/validateInputs";
import saveResetPassword from "../utils/saveResetPassword";

const ResetPassword = () => {

  const { id, token } = useParams();
  let idNum = Number(id);

  const [password, setPassword] = useState("");
  const [secondPassword, setSecondPassword] = useState("")

  const [passwordSubmitted, setPasswordSubmitted] = useState(false);
  const [secondPasswordSubmitted, setSecondPasswordSubmitted] = useState(false);

  const isErrorPassword = !validateInputs.isValidPassword(password) && passwordSubmitted;
  const isErrorSecondPassword = !validateInputs.isValidSecondPassword(password, secondPassword) && secondPasswordSubmitted;

  const onChangePassword = (e: any) => {
    setPasswordSubmitted(false)
    setPassword(e.target.value);
  }

  const onChangeSecondPassword = (e: any) => {
    setSecondPasswordSubmitted(false);
    setSecondPassword(e.target.value);
  }

  const onSubmit = async () => {
   setPasswordSubmitted(true);
   setSecondPasswordSubmitted(true);
   const data = {password: password, id: idNum, token: token}
   await saveResetPassword(data)
  }

  return (
    <Box>
      <VStack >
        <Heading mb={6}>Reset Your Password</Heading>
        <Box maxWidth={"75%"} width={"100%"}>
          <Stack spacing={3}>
          <Box>
              <FormControl isRequired isInvalid={isErrorPassword}>
                <FormLabel>Password:</FormLabel>
                <Input type='password' value={password} onChange={onChangePassword} />
                {!isErrorPassword ? null : (
                  <FormErrorMessage>Password is required.</FormErrorMessage>
                )}
              </FormControl>
            </Box>
            <Box>
              <FormControl  isRequired isInvalid={isErrorSecondPassword}>
                <FormLabel>Confirm Password:</FormLabel>
                <Input type='password' value={secondPassword} onChange={onChangeSecondPassword} />
                {!isErrorSecondPassword ? null : (
                  <FormErrorMessage>Passwords Do Not Match.</FormErrorMessage>
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

export default ResetPassword;