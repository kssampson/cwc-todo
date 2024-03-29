import { Text, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, IconButton, useToast }
 from "@chakra-ui/react";
 import { DeleteIcon} from '@chakra-ui/icons';
// import { SubTask } from "./TaskModal";
import deleteSubTask from "../../utils/deleteSubTask";
// import onClickEditSubTask from "../../utils/updateSubTaskName";
import { useState } from "react";
import SubTaskNameDetail from "./SubTaskNameDetail";
import { SubTask } from "./TaskModal";
import SubTaskDescriptionDetail from "./SubTaskDescriptionDetail";


type Props = {
  subTaskName: string;
  subTaskStatus: string;
  subTaskDescription: string;
  taskId: number;
  subTaskId: number;
  setSubTasks: React.Dispatch<React.SetStateAction<SubTask[]>>;
  subTask: SubTask;
}

///trying something here....
export type Item = {
  id: number;
  description: string;
  status: string;
  subTaskId: number;
}

const SubTaskAccordian = ( { subTaskName, subTaskStatus, subTaskDescription, taskId, subTaskId, setSubTasks, subTask}: Props ) => {

  const token = localStorage.getItem('token');
  const toast = useToast();
  const [editNameClicked, setEditNameClicked] = useState<boolean>(false);
  const [editDescriptionClicked, setEditDescriptionClicked] = useState<boolean>(false);

  const onClickDeleteSubTask = async (e: any) => {
    e.stopPropagation()
    console.log('delete icon clicked')
    try {
      const response = await deleteSubTask(taskId, subTaskId, token)
      setSubTasks(response);
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
                editNameClicked={editNameClicked}
                setEditNameClicked={setEditNameClicked}
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
                  onClick={onClickDeleteSubTask}
                  >
                </IconButton>
                <AccordionIcon />
              </Box>
            </AccordionButton>
          </h2>
          <AccordionPanel
          borderTop={"1px"}
          pb={4}
          pt={4}
          >
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box flex={1}>
                {/* {subTaskDescription} */}
                <SubTaskDescriptionDetail
                subTaskDescription={subTaskDescription}
                editDescriptionClicked={editDescriptionClicked}
                setEditDescriptionClicked={setEditDescriptionClicked}
                subTaskId={subTaskId}
                taskId={taskId}
                subTask={subTask}
                />
              </Box>
            </Box>
          </AccordionPanel>
        </Box>
      </AccordionItem>
    </Accordion>
  )
}

export default SubTaskAccordian;