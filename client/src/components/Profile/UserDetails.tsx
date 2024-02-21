import { Box, FormControl,IconButton, Input, Text, useToast } from "@chakra-ui/react";
import { EditIcon, CloseIcon, CheckIcon } from '@chakra-ui/icons'
import { useState } from "react";
import editAccountDetails from "../../utils/editAccountDetails";

type Props = {
  fieldDesc: string,
  userDetail: string,
  id: number,
  updateData: Function
}

const UserDetails = (data: Props) => {

  const [editClicked, setEditClicked] = useState(false);
  const [newValue, setNewValue] = useState("");
  const [updated, setUpdated] = useState(false);

  const toast = useToast();
  const token = localStorage.getItem("token");

  const toggleEditField = () => {
    setEditClicked(!editClicked);
  }

  const updateValue = (e: any) => {
    setNewValue(e.target.value)
  }

  const handleSubmit = async () => {
    try {
      const submissionData = {
        fieldDesc: data.fieldDesc,
        id: data.id,
        userDetail: data.userDetail,
        newValue: newValue
      }
      const updatedUser = await editAccountDetails(submissionData, token)
      toast({
        title: 'Edit successful.',
        position: "top-right",
        description: `Your ${data.fieldDesc} has been successfully changed.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      data.updateData(updatedUser);
      setUpdated(true);
      // setAccountDetails(updatedUser)
      toggleEditField()
    } catch (error) {
      toast({
        title: 'Edit not successful.',
        position: "top-right",
        description: `Error changing your ${data.fieldDesc}: ${error}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
      setUpdated(false);
      toggleEditField()
    }
  }

  return (
    <>
    {!editClicked && (
      <Box display="flex">
        <Box flex={1}>
          <Text flex={1}>{data.fieldDesc}</Text>
          {data.fieldDesc === 'password' && (
            <Text as={"em"} flex={1} fontSize={"small"} _hover={{ color: "blue" }}>Forgot password?</Text>
          )}
        </Box>
          <Text flex={1}>{updated ? newValue : data.userDetail}</Text>
          <IconButton onClick={toggleEditField} aria-label={"edit icon"} icon={<EditIcon />} background="none" size="sm"></IconButton>
      </Box>
      )}
      {editClicked && (
        <Box display="flex">
          <Text flex={1}>{data.fieldDesc}</Text>
            <FormControl flex={1} isRequired>
              <Input
              type={data.fieldDesc === 'password' ? 'password' : 'text'}
              fontSize="medium"
              width="90%" size="sm"
              onChange={updateValue}/>
            </FormControl>
          <IconButton
          onClick={handleSubmit}
          aria-label={"submit icon"}
          icon={<CheckIcon />}
          _hover={newValue.length ? { color: "green" } : { color: "red" }} background="none"
          size="sm"
          ></IconButton>
          <IconButton
          onClick={toggleEditField}
          aria-label={"cancel icon"}
          icon={<CloseIcon />}
          background="none"
          size="sm"
          _hover={{ color: "red" }}
          ></IconButton>
        </Box>
      )}
      </>
  )
}

export default UserDetails;