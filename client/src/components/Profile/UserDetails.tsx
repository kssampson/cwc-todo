import { Box, FormControl,IconButton, Input, Text } from "@chakra-ui/react";
import { EditIcon, CloseIcon, CheckIcon } from '@chakra-ui/icons'
import { useState } from "react";
import editAccountDetails from "../../utils/editAccountDetails";

type Props = {
  fieldDesc: string,
  userDetail: string,
  id: number
}

const UserDetails = (data: Props) => {

  const [editClicked, setEditClicked] = useState(false);
  const [newValue, setNewValue] = useState("");

  const token = localStorage.getItem("token");

  const toggleEditField = () => {
    setEditClicked(!editClicked);
  }

  const updateValue = (e: any) => {
    setNewValue(e.target.value)
  }

  const handleSubmit = async () => {
    const submissionData = {
      fieldDesc: data.fieldDesc,
      accountId: data.id,
      userDetail: data.userDetail
    }
    editAccountDetails(submissionData, token);
  }

  return (
    <>
    {!editClicked && (
      <Box display="flex">
          <Text flex={1}>{data.fieldDesc}</Text>
          <Text flex={1}>{data.userDetail}</Text>
          <IconButton onClick={toggleEditField} aria-label={"edit icon"} icon={<EditIcon />} background="none" size="sm"></IconButton>
      </Box>
      )}
      {editClicked && (
        <Box display="flex">
          <Text flex={1}>{data.fieldDesc}</Text>
            <FormControl flex={1} isRequired>
              <Input type='text' fontSize="medium" width="90%" size="sm" onChange={updateValue}/>
            </FormControl>
            <IconButton
            onClick={handleSubmit}
            aria-label={"submit icon"}
            icon={<CheckIcon />}
            _hover={newValue.length ? { color: "green" } : { color: "red" }} background="none"
            size="sm"
            ></IconButton>
          <IconButton onClick={toggleEditField} aria-label={"cancel icon"} icon={<CloseIcon />} background="none" size="sm" _hover={{ color: "red" }}></IconButton>
        </Box>
      )}
      </>
  )
}

export default UserDetails;