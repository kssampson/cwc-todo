import { Box, IconButton, Text } from "@chakra-ui/react";
import { useState } from "react";
import { EditIcon, DeleteIcon, CheckIcon } from '@chakra-ui/icons'

const SubTaskItems = () => {

  const fakeSubTaskItems = [
    {
      id: 1,
      description: "drive to the store",
      status: 'To Do'
    },
    {
      id: 2,
      description: "show your costco card",
      status: 'To Do'
    },
    {
      id: 3,
      description: "find chicken",
      status: 'To Do'
    },
    {
      id: 4,
      description: "search for chips",
      status: 'To Do'
    },
    {
      id: 5,
      description: "get apples",
      status: 'To Do'
    },
    {
      id: 6,
      description: "locate milk",
      status: 'To Do'
    },
  ]
  const [subTaskItems, setSubTaskItems] = useState(fakeSubTaskItems);

  return (
    <>
      {subTaskItems && (
        <Box display={"flex"} alignItems={"left"} flexDirection={"column"} pt={2} w={"100%"} >
          {subTaskItems.map((item) => {
            return (
              <Box display={"flex"} flexDir={"row"}>
                <IconButton
                  aria-label={"edit icon"}
                  icon={<EditIcon />}
                  background="none"
                  size="sm"
                  >
                </IconButton>
                <Text flex={1} p={1}>{item.description}</Text>
                <IconButton
                  aria-label={"delete icon"}
                  icon={<CheckIcon />}
                  background="none"
                  size="sm"
                  _hover={{ color: "gray.50" }}
                  >
                </IconButton>
                <IconButton
                  aria-label={"delete icon"}
                  icon={<DeleteIcon />}
                  background="none"
                  size="sm"
                  _hover={{ color: "gray.50" }}
                  >
                </IconButton>
              </Box>
            )
          })}
        </Box>
      )}
    </>
  )
}

export default SubTaskItems;