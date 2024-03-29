import { Box, FormControl, IconButton, Input, useToast} from "@chakra-ui/react";
import { CloseIcon, CheckIcon } from '@chakra-ui/icons'
import { useState } from "react";
import updateSubTaskItemDescription from "../../utils/updateSubTaskItemDescription";
import { Item } from "../subTasks/SubTaskAccordian";

type Props = {
  subTaskItems: Item[];
  setSubTaskItems: React.Dispatch<React.SetStateAction<Item[]>>
  itemId: number;
  editDescriptionClicked: boolean;
  setEditDescriptionClicked: (value: boolean) => void;
  subTaskId: number;
  setSelectedItem: React.Dispatch<React.SetStateAction<number>>;
}

const SubTaskItemDescriptionDetail = ( {subTaskItems, setSubTaskItems, itemId, editDescriptionClicked, setEditDescriptionClicked, subTaskId, setSelectedItem}: Props ) => {

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
      const response = await updateSubTaskItemDescription(subTaskId, itemId, newValue, token)
      setSelectedItem(response);
      setSubTaskItems([...subTaskItems, response])
      //not seeing the edit. I just added the state and state setter. It is not working as expected but giving a positive message anyway. Check to see if it made it to the db
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