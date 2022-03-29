import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";

export default function Artist({ name }) {
  return (
    <Flex
      bg="rgba(0,0,0,.7)"
      borderRadius="4px"
      padding="10px"
      flexDirection="column"
      width="120px"
      height="180px"
      justifyContent="space-between"
      marginRight="25px"
    >
      <Image
        alt={name}
        src="/peep.png"
        borderRadius="100%"
        minWidth="100px"
        height="100px"
        objectFit="cover"
        objectPosition="center"
        alignSelf="center"
      />
      <Box>
        <Text textAlign="center" fontSize="14px" fontWeight="bold">
          {name}
        </Text>
        <Text textAlign="center" fontSize="9px">
          Artist
        </Text>
      </Box>
    </Flex>
  );
}
