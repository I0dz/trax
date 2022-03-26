import { Box } from "@chakra-ui/layout";

import Sidebar from "./sidebar";

export default function playerLayout({ children }) {
  return (
    <Box width="100vw" height="100vh">
      <Box
        position="absolute"
        top="0"
        width="250px"
        height="100vh"
        left="0"
        background="cornflowerblue"
      >
        <Sidebar />
      </Box>
      <Box marginLeft="250px" marginBottom="250px">
        {children}
      </Box>
      <Box
        position="absolute"
        bottom="0"
        left="0"
        height="100px"
        background="tan"
        width="100vw"
      >
        player
      </Box>
    </Box>
  );
}
