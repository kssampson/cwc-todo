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
        const response = await resetPassword(forgotPasswordEmail)
        onClose()
        setForgotPasswordEmail("")
      } catch (error) {
        throw error
      }
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