import { Box, FormControl,IconButton, Input, Text, useToast } from "@chakra-ui/react";
import { EditIcon, CloseIcon, CheckIcon } from '@chakra-ui/icons'
import { useState } from "react";
import editAccountDetails from "../../utils/editAccountDetails";
import updateSubTask from "../../utils/updateSubTask";

type Props = {
  subTaskName: string;
  editClicked: boolean;
  setEditClicked: (value: boolean) => void;
  subTaskId: number;
  taskId: number;
}

const SubTaskNameDetail = ( {subTaskName, editClicked, setEditClicked, subTaskId, taskId}: Props ) => {

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
      await updateSubTask(taskId, subTaskId, newValue, token)
      toast({
        title: 'Edit successful.',
        position: "top-right",
        description: `Your has been successfully changed.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      // data.updateData(updatedUser);
      setUpdated(true);
      // setAccountDetails(updatedUser)
      toggleEditField()
    } catch (error) {
      toast({
        title: 'Edit not successful.',
        position: "top-right",
        description: `Error changing your ___: ${error}`,
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
      <Box display="flex" alignItems={"center"}>
          <Text flex={1}>{updated ? newValue : `${subTaskName}`}</Text>
          <IconButton onClick={toggleEditField} aria-label={"edit icon"} icon={<EditIcon />} background="none" size="sm"></IconButton>
      </Box>
      )}
      {editClicked && (
        <Box display="flex">
            <FormControl flex={1} isRequired>
              <Input
              type={'text'}
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

export default SubTaskNameDetail;