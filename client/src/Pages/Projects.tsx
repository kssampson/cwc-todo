import { useLoaderData, useNavigate } from "react-router-dom";
import { Data } from './Profile';
import { Box, Text } from "@chakra-ui/react";
import CreateProjectsAcordian from "../components/Proj/CreateProjectsAccordian";
import { useState } from "react";

export type Project = {
  id: number,
  name: string,
  description?: string,
  status: string
}

type LoaderData = {
  user: Data;
  projects: Project[];
}

const Projects = () => {
  const Navigate = useNavigate();
  const data = useLoaderData() as LoaderData;
  const [projects, setProjects] = useState(data.projects);
  const user = data.user as Data;

  const goToProject = (id: number) => {

    Navigate(`/project/${id}`)
  }

  return (
    <Box>
      <Text textAlign="center" mb={4} fontSize={20}>
          {user.username}'s Projects
        </Text>
        <Box m={5}>
          {projects.map((project, idx) => {
            return (
              <Box key={idx} display={"flex"} m={10} p={4} border={"1px solid"} onClick={() => goToProject(project.id)} _hover={{cursor: "pointer", backgroundColor: "peachpuff"}}>
                <Text flex={1}>{project.name}</Text>
                <Text flex={1} noOfLines={1}>{project.description}</Text>
                <Text flex={1} ml={20}>{project.status}</Text>
              </Box>
            )
          })}
          <CreateProjectsAcordian projects={projects} setProjects={setProjects} id={user.id}/>
        </Box>
    </Box>
  )
}

export default Projects;