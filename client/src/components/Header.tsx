import { Box, Image, Stack, Heading, Center } from "@chakra-ui/react"
import todoucan from './todoucan.png'
import { Link } from "react-router-dom";

type Props = {
  loggedIn: boolean
};

const pages = [
  {name: "Log In", path: "/log-in", showIfLoggedIn: false},
  {name: "Sign Up", path: "/sign-up", showIfLoggedIn: false},
  {name: "Projects", path: "/projects", showIfLoggedIn: true},
  {name: "Account", path: "/profile", showIfLoggedIn: true}
];

const Header = ( { loggedIn }: Props ) => {

  return (
    <Box borderBottom="1px solid black" backgroundColor="peachpuff" p={2} mb={2}>
        <Stack direction='row' align="center">
          <Image
            borderRadius='full'
            boxSize='80px'
            objectFit='cover'
            src={todoucan}
            alt='Dan Abramov'
            border="1px solid black"
          />
          <Heading ml={2} fontSize={28}>Todoucan</Heading>
        </Stack>
      <Center justifyContent="space-around">
        <Stack direction="row" spacing="20px">
          {pages.map((page, idx) => {
            return (loggedIn && page.showIfLoggedIn) || (!loggedIn && !page.showIfLoggedIn) ?
            (<Link to={page.path} key={idx}>
              <Box >{page.name}</Box>
            </Link>)
            : null;
          })}
        </Stack>
      </Center>
    </Box>
  )

}

export default Header