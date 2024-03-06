import { Card, CardBody, CardFooter, Heading, Stack, Text } from "@chakra-ui/react";

type Props = {
  taskName: string,
  description?: string,
  taskStatus: string
}


const TaskCard = ({taskName, description, taskStatus}: Props) => {
  return (
    <Card maxW='sm' _hover={{ cursor: "pointer", backgroundColor: "peachpuff" }}>
      <CardBody>
        {/* <Image
          src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
          alt='Green double couch with wooden legs'
          borderRadius='lg'
        /> */}
        <Stack mt='6' spacing='3'>
          <Heading size='md'>Task: {taskName}</Heading>
          <Text>
            {description}
          </Text>
        </Stack>
      </CardBody>
      <CardFooter>
      </CardFooter>
    </Card>
  )
}

export default TaskCard;