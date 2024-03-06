import { Text, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, IconButton, useToast }
 from "@chakra-ui/react";
 import { DeleteIcon, EditIcon} from '@chakra-ui/icons';
// import { SubTask } from "./TaskModal";
import deleteSubTask from "../../utils/deleteSubTask";
import onClickEditSubTask from "../../utils/updateSubTask";
import { useState } from "react";
import SubTaskNameDetail from "./SubTaskNameDetail";

type Props = {
  subTaskName: string;
  subTaskStatus: string;
  subTaskDescription: string;
  taskId: number;
  subTaskId: number;
}

const SubTaskAccordian = ( { subTaskName, subTaskStatus, subTaskDescription, taskId, subTaskId }: Props ) => {

  const token = localStorage.getItem('token');
  const toast = useToast();

  const [subTaskDeleted, setSubTaskDeleted] = useState<boolean>(false);
  const [editClicked, setEditClicked] = useState<boolean>(false);


  const oncClickDeleteSubTask = async () => {
    try {
      const response = await deleteSubTask(taskId, subTaskId, token)
      console.log('repsonse for subTaskDelete: ', response)
      toast({
        title: 'Success!',
        position: "top-right",
        description: `Sub task deleted.`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      })
    } catch (error) {
      toast({
        title: 'Not Successful.',
        position: "top-right",
        description: `Error deleting the sub task: ${error}`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      })
    }
  }

  return (
    <Accordion allowToggle>
        <AccordionItem mt={5} mr={5} ml={5} border={"1px"}>
        <Box>
          <h2>
            <AccordionButton>
                <SubTaskNameDetail
                subTaskName={subTaskName}
                editClicked={editClicked}
                setEditClicked={setEditClicked}
                subTaskId={subTaskId}
                taskId={taskId}
                />
              <Box display="flex" alignItems={"center"} justifyContent={"right"} flex={1}>
                <Text>{subTaskStatus}</Text>
                <IconButton
                  aria-label={"delete icon"}
                  icon={<DeleteIcon />}
                  background="none"
                  size="sm"
                  _hover={{ color: "gray.50" }}
                  onClick={oncClickDeleteSubTask}
                  >
                </IconButton>
                <AccordionIcon />
              </Box>
            </AccordionButton>
          </h2>
          <AccordionPanel borderTop={"1px"} pb={4}>{subTaskDescription}</AccordionPanel>
        </Box>
      </AccordionItem>
    </Accordion>
  )
}

export default SubTaskAccordian;