import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Button,
  Input,
  useToast
} from '@chakra-ui/react'
import { useState } from 'react';
import resetPassword from '../../utils/resetPassword';
import { validateInputs } from '../../utils/validateInputs';

type Props = {
  isOpen: boolean,
  onClose: () => void
}

const ForgotPasswordModal = ({isOpen, onClose}: Props) => {

  const toast = useToast();

  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");

  const onChangeEmail = (e: any) => {
    setForgotPasswordEmail(e.target.value)
  }

  const submitEmail = async (e: any) => {
    if (validateInputs.isValidEmail(forgotPasswordEmail)) {
      try {
        await resetPassword(forgotPasswordEmail)
        setForgotPasswordEmail("")
      } catch (error: any) {
        //if passed dto but not found in database, we will communicate in email sent from backend.
        if (error.response.data.message === 'Email not found!') {
          setForgotPasswordEmail("")
          toast({
            title: `Success`,
            position: "top-right",
            description: `Please check your email for further instruction`,
            status: 'success',
            duration: 3000,
            isClosable: true,
          })
          //if manual check did not perform, forgotPasswordEmailDto will type check it
        } else {
          toast({
            title: `Invalid email format: ${forgotPasswordEmail}`,
            position: "top-right",
            description: `${error}`,
            status: 'error',
            duration: 3000,
            isClosable: true,
          })
        }
      }
      //if manual email check caught a format error:
    } else {
      setForgotPasswordEmail("")
      toast({
        title: `Invalid email format: ${forgotPasswordEmail}`,
        position: "top-right",
        description: `Please enter a valid email format`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
    onClose()
  }

  return (
      <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Reset Your Password</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel requiredIndicator>Please enter the email used when creating your account:</FormLabel>
              <Input
              required
              placeholder='email'
              type="text"
              value={forgotPasswordEmail}
              onChange={onChangeEmail}/>
            </FormControl>
          </ModalBody>
          <ModalFooter alignSelf={"center"}>
            <Button
            variant='solid'
            onClick={submitEmail}
            >Submit</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
  )
}

export default ForgotPasswordModal;