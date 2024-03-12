import { Box, FormControl, IconButton, Input, Text, useToast } from "@chakra-ui/react";
import { EditIcon, CloseIcon, CheckIcon } from '@chakra-ui/icons'
import { useState } from "react";
import updateSubTaskItemDescription from "../../utils/updateSubTaskItemDescription";

type Props = {
  subTaskItemDescription: string;
  subTaskItemId: number;
  editDescriptionClicked: boolean;
  setEditDescriptionClicked: (value: boolean) => void;
  subTaskId: number;
  taskId: number;
}

const SubTaskItemDescriptionDetail = ( {subTaskItemDescription, subTaskItemId, editDescriptionClicked, setEditDescriptionClicked, subTaskId, taskId}: Props ) => {

  const [newValue, setNewValue] = useState("")
  const [updated, setUpdated] = useState(false);

  const toast = useToast();
  const token = localStorage.getItem("token");

  const toggleEditField = () => {
    setEditDescriptionClicked(!editDescriptionClicked);
  }

  const updateValue = (e: any) => {
    setNewValue(e.target.value)
  }

  const handleSubmit = async () => {
    try {
      await updateSubTaskItemDescription(subTaskItemDescription, taskId, subTaskId, subTaskItemId, newValue, token)
      toast({
        title: 'Edit successful.',
        position: "top-right",
        description: `Your has been successfully changed.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
      setUpdated(true);
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
        onClick={(e) => {
          toggleEditField()
        }}
        aria-label={"cancel icon"}
        icon={<CloseIcon />}
        background="none"
        size="sm"
        _hover={{ color: "red" }}
        ></IconButton>
      </Box>
    </>
  )
}

export default SubTaskItemDescriptionDetail;