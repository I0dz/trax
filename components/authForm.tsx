import NextImage from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { SWRConfig } from "swr";

import { Box, Button, Flex, Input } from "@chakra-ui/react";

import { auth } from "../lib/mutations";

interface AuthFormProps {
  mode: "signup" | "signin";
}

const AuthForm: React.FC<AuthFormProps> = ({ mode }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [isCredentialsValid, setIsCredentialsValid] = useState<boolean | null>(
    null
  );

  return (
    <Flex
      width="100vw"
      height="100vh"
      bg="black"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
    >
      <Box marginBottom="40px">
        <NextImage src="/logo.svg" width={200} height={120} />
      </Box>
      <form onSubmit={onFormSubmit}>
        <Flex
          width="calc(100vw / 3)"
          height="calc(100vh / 3)"
          flexDirection="column"
          justifyContent="space-around"
          bg="white"
          borderRadius="6px"
          padding="24px"
        >
          <Input
            onChange={onEmailChange}
            placeholder="email"
            type="email"
            required
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
          <Input
            onChange={onPasswordChange}
            placeholder="password"
            type="password"
            required
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
          />
          <Button
            type="submit"
            isLoading={isLoading}
            textTransform="capitalize"
            fontSize="22px"
            fontWeight="bold"
            color="white"
            backgroundColor="green.500"
            width="200px"
            alignSelf="center"
            sx={{
              "&:hover": {
                bg: "green.400",
              },
            }}
          >
            {mode}
          </Button>
          {isCredentialsValid === false && (
            <Box color="red.500" textAlign="center" fontStyle="italic">
              Wrong email or password
            </Box>
          )}
        </Flex>
      </form>
    </Flex>
  );

  function onEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }

  function onPasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  async function onFormSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    setIsLoading(true);
    const user = await auth(mode, { email, password });
    setIsLoading(false);
    if (user.status === 401) {
      setIsCredentialsValid(false);
    } else {
      setIsCredentialsValid(true);
      router.push("/");
    }
  }
};

export default AuthForm;
