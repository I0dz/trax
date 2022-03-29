import { Box, Flex, Text } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";

interface GradientLayoutProps {
  color: string;
  image: string;
  children: any;
  title: string;
  subtitle: string;
  description: string;
  roundImage: boolean;
}

export default function GradientLayout({
  color,
  image,
  children,
  description,
  roundImage,
  subtitle,
  title,
}: GradientLayoutProps) {
  return (
    <Box
      height="calc(100vh - 100px)"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}
    >
      <Flex align="end" padding="40px" color="white">
        <Image
          borderRadius={roundImage ? "100%" : "3px"}
          alt={"avatar"}
          src={image}
          boxShadow="2xl"
          boxSize="160px"
        />
        <Flex direction="column" lineHeight="40px" paddingX="20px">
          <Text fontSize="x-small" textTransform="uppercase" fontWeight="700">
            {subtitle}
          </Text>
          <Text as="h1" fontSize="6xl">
            {title}
          </Text>
          <Text fontSize="x-small">{description}</Text>
        </Flex>
      </Flex>
      <Box paddingY="50px">{children}</Box>
    </Box>
  );
}
