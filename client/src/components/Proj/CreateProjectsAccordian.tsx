import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Button, FormControl, FormErrorMessage, FormLabel, Input, Textarea, useToast} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from '@chakra-ui/icons'
import { useState } from "react";
import { Project } from "../../Pages/Projects";
import { Data } from "../../Pages/Profile";
import createProject from "../../utils/createProject";

type Props = {
  projects: Project[],
  setProjects: React.Dispatch<React.SetStateAction<Project[]>>,
  id: number
}

const CreateProjectsAcordian = ({projects, setProjects, id}: Props) => {

  const toast = useToast();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitClickedName, setSubmitClickedName] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const isErrorName = name === "" && submitClickedName;

  const onChangeName = (e: any) => {
    setSubmitClickedName(false);
    setName(e.target.value);
  }

  const onChangeDescription = (e: any) => {
    setDescription(e.target.value);
  }

  const onSubmit = async () => {
    setSubmitClickedName(true);

    if (name !== "") {
      setIsOpen(false);
      const newProject = {name: name, description: description, id: id, status: 'ToDo'}
      const token = localStorage.getItem("token");
      try {
        const response = await createProject(newProject, token)
        setProjects([...projects, ...response])
        setName("");
        setDescription("");
        setSubmitClickedName(false);
        toast({
          title: 'Project creation successful.',
          position: "top-right",
          description: `You're ready todo it with Todoucan!`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } catch (error) {
        toast({
          title: 'Error creating project. Please try again.',
          position: "top-right",
          description: `${error}`,
          status: 'error',
          duration: 3000,
          isClosable: true,
        })
      }
    }
  }


  return (
    <Accordion allowToggle index={isOpen ? 0 : 1} flex={1} m={10} _hover={{cursor: "pointer", backgroundColor: "peachpuff"}}>
      <AccordionItem>
        {({ isExpanded }) => (
          <>
            <h2>
              <AccordionButton onClick={() => setIsOpen(!isOpen)} border={"1px solid"}  h={"58px"}>
                {isExpanded ? (
                  <CloseIcon fontSize='12px' />
                ) : (
                  <AddIcon fontSize='12px' />
                )}
                <Box as="span" flex='1' textAlign='left' ml={3} p={2}>
                  Add a Project
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} borderLeft={"1px solid"} borderRight={"1px solid"} borderBottom={"1px solid"}>
            <Box>
              <FormControl isRequired isInvalid={isErrorName}>
                <FormLabel>Project Name:</FormLabel>
                <Input
                type='text'
                value={name}
                onChange={onChangeName}
                />
                <FormErrorMessage>Project name is required.</FormErrorMessage>
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>Project Description:</FormLabel>
                {/* TextArea throwing error, come back and resolve later, use Input for now */}
                {/* <Textarea value={description} onChange={onChangeDescription}></Textarea> */}
                <Input value={description} onChange={onChangeDescription}></Input>
              </FormControl>
            <Button
            mt={5}
            w={"100%"}
            onClick={onSubmit}
            >Create
            </Button>
            </Box>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  )
}

export default CreateProjectsAcordian;