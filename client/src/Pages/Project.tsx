import { Box, Text, useDisclosure } from "@chakra-ui/react"
import { useLoaderData, useParams } from "react-router-dom";
import { Project as ProjectType } from './Projects'
import CreateTasksAccordian from "../components/Proj/CreateTasksAccordian";
import { useState } from "react";
// import TaskCard from "../components/tasks/TaskCard";
import TaskModal, { SubTask } from "../components/subTasks/TaskModal";

export type Task = {
  name: string;
  status: "ToDo" | "In Progress" | "Completed";
  description?: string;
  subTasksCount: number;
  completedSubTasksCount: number;
  id: number;
  subTasks: SubTask[];
}

const statusGroups = [
    {
      name: "ToDo"
    },
    {
      name: "In Progress"
    },
    {
      name: "Completed"
    }
  ]

const Project = () => {
  const { id } = useParams();
  const data = useLoaderData() as ProjectType[];
  const project = data[0];
  const [tasks, setTasks] = useState(project.tasks)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const [selectedTask, setSelectedTask] = useState<Task>(tasks[0]);

  const onClickTask = (task: any) => {
    setSelectedTask(task)
    onOpen()
  }

  return (
    <Box m={10}>
      <Box mb={20}>
        <Text mb={4} mt={2} fontSize={20}>{`${project.name}`}</Text>
        <Text >{`${project.description}` || "Add a description"}</Text>
      </Box>
      <Box display={"flex"} gap={10}>
        {statusGroups.map((group, idx) => {
          return (
            <Box flex={1} border={"1px solid"}>
              <Text fontSize={18} mt={2} textAlign={"center"}>{group.name}</Text>
              {tasks.map((task, idx) => {
                if (group.name === task.status) {
                  return (
                    <Box
                    mt={8}
                    mx={10}
                    p={4}
                    border={"1px solid"}
                    display={"flex"}
                    justifyContent={"space-between"}
                    onClick={() => onClickTask(task)}
                    _hover={ {cursor: "pointer", backgroundColor: "gray.50"}}
                    >
                      <Text >{`${task.name}`}</Text>
                      <Text>{`${task.description}`}</Text>
                      {/* <Text >{`${task.completedSubTasksCount}/${task.subTasksCount}`}</Text>
                      {/* <TaskCard taskName={task.name} taskStatus={task.status} description={task.description || "This task has no description."}/> */}
                    </Box>
                  )
                } else { return null }
              })}
                <Box>
                  { group.name === "ToDo" && (
                    <CreateTasksAccordian
                      projectId={project.id}
                      tasks={tasks}
                      setTasks={setTasks} />
                    )
                  }
                </Box>
            </Box>
          )
        })}
      </Box>
      {tasks.length ? (
        <TaskModal
          isOpen={isOpen}
          onClose={onClose}
          taskName={selectedTask.name}
          taskDescription={selectedTask.description || "This task has no description"}
          taskId={selectedTask.id}
          task={selectedTask}
          />
      ) : null}
    </Box>
  )
}

export default Project;