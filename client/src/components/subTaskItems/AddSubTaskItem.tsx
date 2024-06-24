import { Box, FormControl, IconButton, Input } from "@chakra-ui/react";
import { CloseIcon, CheckIcon } from '@chakra-ui/icons'
import { useState } from "react";
import createSubTaskItem from "../../utils/createSubTaskItem";
import { Item } from "../subTasks/SubTaskAccordian";

type Props = {
  subTaskItems: Item[];
  setSubTaskItems: React.Dispatch<React.SetStateAction<Item[]>>
  addNewClicked: boolean;
  setAddNewClicked: React.Dispatch<React.SetStateAction<boolean>>;
  subTaskId: number;
}

const AddSubTaskItem = ( {subTaskItems, setSubTaskItems, addNewClicked, setAddNewClicked, subTaskId }: Props ) => {
  const [description, setDescription] = useState("");

  const onChangeDescription = (e: any) => {
    setDescription(e.target.value)
  }

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      const submissionData = {description: description, status: "To Do", subTaskId: subTaskId}
      const response = await createSubTaskItem(submissionData, token)
      setSubTaskItems([...subTaskItems, response])
    } catch (error) {
      console.log('error in submit!', error)
    }

  }

  return (
    <Box display="flex">
      <FormControl flex={1} isRequired>
        <Input
        type={'text'}
        fontSize="medium"
        width="90%" size="sm"
        onChange={onChangeDescription}/>
      </FormControl>
      <IconButton
      onClick={handleSubmit}
      aria-label={"submit icon"}
      icon={<CheckIcon />}
      _hover={description.length ? { color: "green" } : { color: "red" }} background="none"
      size="sm"
      ></IconButton>
      <IconButton
      onClick={(e) => {
        setAddNewClicked(!addNewClicked)
      }}
      aria-label={"cancel icon"}
      icon={<CloseIcon />}
      background="none"
      size="sm"
      _hover={{ color: "red" }}
      ></IconButton>
    </Box>
  )
}

export default AddSubTaskItem;