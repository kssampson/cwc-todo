import { AbsoluteCenter, AccordionButton, AccordionItem, Box, Divider, FormControl,IconButton, Input, Text, useToast } from "@chakra-ui/react";
import { EditIcon, CloseIcon, CheckIcon } from '@chakra-ui/icons'
import { useState } from "react";
import updateSubTaskDescription from "../../utils/updateSubTaskDescription";
import SubTaskItems from "../subTaskItems/SubTaskItems";

type Props = {
  subTaskDescription: string;
  editDescriptionClicked: boolean;
  setEditDescriptionClicked: (value: boolean) => void;
  subTaskId: number;
  taskId: number;
}

const SubTaskDescriptionDetail = ( {subTaskDescription, editDescriptionClicked, setEditDescriptionClicked, subTaskId, taskId}: Props ) => {

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
      await updateSubTaskDescription(taskId, subTaskId, newValue, token)
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
    {!editDescriptionClicked && (
      <Box display={"flex"} flexDirection={"column"}>
        <Box display="flex" alignItems={"center"} mb={4}>
            <IconButton onClick={(e) => {
              toggleEditField()
              }}
              aria-label={"edit icon"}
              icon={<EditIcon />}
              background="none"
              size="sm"
              >
            </IconButton>
              <Text flex={1}>{updated ? newValue : `${subTaskDescription}`}</Text>
        </Box>
        <Box position='relative' padding={1}>
          <Divider pt={2}/>
          <AbsoluteCenter bg='white' px='4'>
            To Do
          </AbsoluteCenter>
        </Box>
        <SubTaskItems subTaskId={subTaskId} taskId={taskId}/>
      </Box>
      )}
      {editDescriptionClicked && (
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
        <Box position='relative'>
          <Divider pt={6}/>
          <AbsoluteCenter bg='white' px='4'>
            To Do
          </AbsoluteCenter>
        </Box>
        <SubTaskItems subTaskId={subTaskId} taskId={taskId}/>
        </>
      )}
      </>
  )
}

export default SubTaskDescriptionDetail;