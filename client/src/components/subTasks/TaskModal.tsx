import { Box, Button, Modal, ModalCloseButton, ModalContent, ModalFooter, ModalOverlay, Text } from "@chakra-ui/react";
import SubTaskAccordian from "./SubTaskAccordian";
import { useEffect, useState } from "react";
import CreateSubTaskAccordian from "./CreateSubTaskAccordian";
import { Task } from "../../Pages/Project";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  taskName: string;
  taskDescription: string;
  taskId: number;
  task: Task;
}

export type SubTask = {
  name: string;
  description: string | "no description";
  status: string;
  id: number;
}

const TaskModal = ({ isOpen, onClose, taskName, taskDescription, taskId, task }: Props) => {

  const [subTasks, setSubTasks] = useState(task.subTasks);

  // console.log('task: ', task)

  useEffect(() => {
    setSubTasks(task.subTasks || [])
  }, [task])

      return (
          <Modal onClose={onClose} isOpen={isOpen} isCentered>
            <ModalOverlay />
            <ModalContent minW={"75%"}>
              <Box m={10}>
                <Text mb={4} mt={2} fontSize={20}>{taskName}</Text>
                <Text >{taskDescription}</Text>
              </Box>
              <ModalCloseButton />
              {subTasks.map((subTask, idx) => {
                return (
                    <SubTaskAccordian
                      subTaskName={`${subTask.name} ${idx + 1}`}
                      subTaskStatus={subTask.status}
                      subTaskDescription={subTask.description || "No description for this sub task"}
                      taskId={taskId}
                      subTaskId={subTask.id}
                      />
                  )
              })}
              <CreateSubTaskAccordian
              subTasks={subTasks}
              setSubTasks={setSubTasks}
              taskId={taskId}/>
              <ModalFooter>
                <Button onClick={onClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
      )
    }

export default TaskModal;