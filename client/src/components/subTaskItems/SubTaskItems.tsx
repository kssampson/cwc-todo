import { Box, Button, IconButton, Text, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import SubTaskItemDescriptionDetail from "./SubTaskItemDescriptionDetail";
import AddSubTaskItem from "./AddSubTaskItem";
import { SubTask } from "../subTasks/TaskModal";
import DeleteSubTaskItem from "../../utils/deleteSubTaskItem";

type Props = {
  subTaskId: number;
  taskId: number;
  subTask: SubTask;
}

const SubTaskItems = ( {subTaskId, taskId, subTask}: Props ) => {

  const [subTaskItems, setSubTaskItems] = useState(subTask.items);
  const [editDescriptionClicked, setEditDescriptionClicked] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<number>(0);
  const [addNewClicked, setAddNewClicked] = useState(false);

  const toast = useToast();

  const toggleEditField = (id: number) => {
    setSelectedItem(id)
    setEditDescriptionClicked(!editDescriptionClicked);
  }

  const onClickAddNew = () => {
    setAddNewClicked(!addNewClicked)
  }

  const handleItemDelete = async (itemId: number) => {
    try {
      const token = localStorage.getItem('token');
      const response = await DeleteSubTaskItem(subTaskId, itemId, token);
      setSubTaskItems(response);
      toast({
        title: `Success`,
        position: "top-right",
        description: `Sub task item has been deleted!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: `Error`,
        position: "top-right",
        description: `${error}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      {subTaskItems && (
        <Box display={"flex"} alignItems={"left"} flexDirection={"column"} pt={2} w={"100%"} >
          {subTaskItems.map((item, idx) => {
            return (
              <>
                {!editDescriptionClicked && (
                  <Box display={"flex"} flexDir={"row"} key={idx}>
                    <IconButton
                      onClick={() => toggleEditField(item.id)}
                      aria-label={"edit icon"}
                      icon={<EditIcon />}
                      background="none"
                      size="sm"
                      >
                    </IconButton>
                    <Text flex={1} p={1}>{item.description}</Text>
                    <IconButton
                      aria-label={"delete icon"}
                      icon={<DeleteIcon />}
                      background="none"
                      size="sm"
                      _hover={{ color: "gray.50" }}
                      onClick={() => handleItemDelete(item.id)}
                      >
                    </IconButton>
                  </Box>
                )}
                {editDescriptionClicked && selectedItem === item.id && (
                  <>
                    <SubTaskItemDescriptionDetail
                    itemId={item.id}
                    editDescriptionClicked={editDescriptionClicked}
                    setEditDescriptionClicked={setEditDescriptionClicked}
                    subTaskId={subTaskId}
                    setSelectedItem={setSelectedItem}
                    subTaskItems={subTaskItems}
                    setSubTaskItems={setSubTaskItems}
                    />
                  </>
                )}
              </>
            )
          })}
          {!addNewClicked && (
            <Button onClick={onClickAddNew}>Add New To Do</Button>
          )}
          {addNewClicked && (
            <AddSubTaskItem
            addNewClicked={addNewClicked}
            setAddNewClicked={setAddNewClicked}
            subTaskId={subTaskId}
            subTaskItems={subTaskItems}
            setSubTaskItems={setSubTaskItems}
            />
          )}
        </Box>
      )}
    </>
  )
}

export default SubTaskItems;