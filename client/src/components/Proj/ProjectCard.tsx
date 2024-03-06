import { Button, ButtonGroup, Card, CardBody, CardFooter, Divider, Heading, Stack, Text } from "@chakra-ui/react";

type Props = {
  projectName: string,
  description: string,
  projectStatus: string
}


const ProjectCard = ({projectName, description, projectStatus}: Props) => {
  return (
    <Card maxW='sm' _hover={{ cursor: "pointer", backgroundColor: "peachpuff" }}>
      <CardBody>
        {/* <Image
          src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
          alt='Green double couch with wooden legs'
          borderRadius='lg'
        /> */}
        <Stack mt='6' spacing='3'>
          <Heading size='md'>Project Title: {projectName}</Heading>
          <Text>
            {description}
          </Text>
          <Text color='blue.600' fontSize='2xl'>
          {projectStatus}
          </Text>
        </Stack>
      </CardBody>
      <CardFooter>
      </CardFooter>
    </Card>
  )
}

export default ProjectCard;