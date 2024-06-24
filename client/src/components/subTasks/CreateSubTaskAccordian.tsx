import { Accordion, AccordionButton, AccordionItem, AccordionPanel, Box, Button, FormControl, FormErrorMessage, FormLabel, Input, useToast} from "@chakra-ui/react";
import { AddIcon, CloseIcon } from '@chakra-ui/icons'
import { useState } from "react";
import { SubTask } from "./TaskModal";
import createSubTask from "../../utils/createSubTask";

type Props = {
  subTasks: SubTask[];
  setSubTasks: React.Dispatch<React.SetStateAction<SubTask[]>>;
  taskId: number;
}

const CreatSubTaskAccordian = ({subTasks, setSubTasks, taskId}: Props) => {

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
      const newSubTask = {name: name, description: description, taskId: taskId, status: 'ToDo'}
      const token = localStorage.getItem("token");
      try {
        const response = await createSubTask(newSubTask, token)
        setSubTasks(response)
        setName("");
        setDescription("");
        setSubmitClickedName(false);
        toast({
          title: 'Task creation successful.',
          position: "top-right",
          description: `You're ready todo it with Todoucan!`,
          status: 'success',
          duration: 3000,
          isClosable: true,
        })
      } catch (error) {
        toast({
          title: 'Error creating task. Please try again.',
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
    <Accordion allowToggle index={isOpen ? 0 : 1} flex={1} m={10} _hover={{cursor: "pointer"}}>
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
                  Add a Sub-Task
                </Box>
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4} borderLeft={"1px solid"} borderRight={"1px solid"} borderBottom={"1px solid"}>
            <Box>
              <FormControl isRequired isInvalid={isErrorName}>
                <FormLabel>Sub-Task Name:</FormLabel>
                <Input
                type='text'
                value={name}
                onChange={onChangeName}
                />
                <FormErrorMessage>Sub task name is required.</FormErrorMessage>
              </FormControl>
            </Box>
            <Box>
              <FormControl>
                <FormLabel>Sub-Task Description:</FormLabel>
                <Input value={description} onChange={onChangeDescription}></Input>
              </FormControl>
            <Button
            mt={5}
            w={"100%"}
            onClick={onSubmit}
            >Create Sub-Task
            </Button>
            </Box>
            </AccordionPanel>
          </>
        )}
      </AccordionItem>
    </Accordion>
  )
}

export default CreatSubTaskAccordian;