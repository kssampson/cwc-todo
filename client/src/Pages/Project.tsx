import { Box, Text } from "@chakra-ui/react"
import { useLoaderData, useParams } from "react-router-dom";
import { Project as ProjectType } from './Projects'
import CreateTasksAccordian from "../components/Proj/CreateTasksAccordian";
import { SetStateAction, useState } from "react";

export type Task = {
  name: string;
  status: "To Do" | "In Progress" | "Completed";
  subTasksCount: number;
  completedSubTasksCount: number;
}

const statusGroups = [
    {
      name: "To Do"
    },
    {
      name: "In Progress"
    },
    {
      name: "Completed"
    }
  ]

  const fakeTasks: Task[] = [
    {
      name: "task A",
      status: 'To Do',
      subTasksCount: 10,
      completedSubTasksCount: 0
    },
    {
      name: "task B",
      status: 'In Progress',
      subTasksCount: 13,
      completedSubTasksCount: 0
    },
    {
      name: "task C",
      status: 'Completed',
      subTasksCount: 8,
      completedSubTasksCount: 3
    },
    {
      name: "task D",
      status: 'Completed',
      subTasksCount: 12,
      completedSubTasksCount: 10
    },
    {
      name: "task E",
      status: 'To Do',
      subTasksCount: 9,
      completedSubTasksCount: 2
    },
    {
      name: "task F",
      status: 'To Do',
      subTasksCount: 7,
      completedSubTasksCount: 6
    },
    {
      name: "task G",
      status: 'To Do',
      subTasksCount: 8,
      completedSubTasksCount: 5
    },
    {
      name: "task H",
      status: 'In Progress',
      subTasksCount: 10,
      completedSubTasksCount: 4
    },
  ]

const Project = () => {
  const { id } = useParams();
  const data = useLoaderData() as ProjectType[];
  const project = data[0];
  const [tasks, setTasks] = useState(fakeTasks)


  return (
    <Box m={10}>
      <Box mb={20}>
        <Text mb={4} mt={2} fontSize={20}>{`${project.name}`}</Text>
        <Text >{`${project.description}` || "Add a description"}</Text>
      </Box>
      <Box display={"flex"} gap={10}>
        {statusGroups.map((group, idx) => {
          return (
            <Box key={idx} flex={1} border={"1px solid"}>
              <Text fontSize={18} mt={2} textAlign={"center"}>{group.name}</Text>
              {fakeTasks.map((task, idx) => {
                if (group.name === task.status) {
                  return (
                    <Box
                    mt={8}
                    mx={10}
                    p={4}
                    border={"1px solid"}
                    display={"flex"}
                    justifyContent={"space-between"}
                    _hover={{cursor: "pointer", backgroundColor: "peachpuff"}}
                    >
                      <Text key={idx}>{`${task.name}`}</Text>
                      <Text key={idx}>{`${task.completedSubTasksCount}/${task.subTasksCount}`}</Text>
                    </Box>
                  )
                }
              })}
                <Box>
                  { group.name === "To Do" && (
                    <CreateTasksAccordian
                      tasks={tasks}
                      setTasks={setTasks} />
                    )
                  }
                </Box>
            </Box>
          )
        })}
      </Box>
    </Box>
  )
}

export default Project;