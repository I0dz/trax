import Head from "next/head";
import Image from "next/image";

import { Box, Flex, Text } from "@chakra-ui/layout";

import Artist from "../components/artist";
import GradientLayout from "../components/gradientLayout";
import prisma from "../lib/prisma";

export default function Home({ artists }) {
  return (
    <Box>
      <GradientLayout
        color="green"
        description="10 public playlists"
        roundImage
        image="/lodz.jpg"
        subtitle="profile"
        title="Lodz"
      >
        <Box paddingX="40px" color="white">
          <Box marginBottom="30px">
            <Text as="h2" fontSize="2xl" fontWeight="bold">
              Top artists this month
            </Text>
            <Text fontWeight="medium">Only visible to you</Text>
          </Box>
          <Flex>
            {artists.map(artist => {
              return <Artist name={artist.name} key={artist.id} />;
            })}
          </Flex>
        </Box>
      </GradientLayout>
    </Box>
  );
}

export async function getServerSideProps() {
  const artists = await prisma.artist.findMany({});
  return {
    props: {
      artists,
    },
  };
}
