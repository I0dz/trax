import { Flex, Grid, Text } from "@chakra-ui/layout";

import { useStoreState } from "../lib/store";
import Player from "./player";

export default function PlayerBar() {
  const songs = useStoreState(state => state.activeSongs);
  const activeSong = useStoreState(state => state.activeSong);
  return (
    activeSong && (
      <Grid
        height="100px"
        width="100vw"
        paddingX="20px"
        color="white"
        templateColumns="20% auto 20%"
        alignItems="center"
      >
        <Flex direction="column" alignContent="center">
          <Text fontSize="large">{activeSong.name}</Text>
          <Text fontSize="small">{activeSong.artist.name}</Text>
        </Flex>
        <Player songs={songs} activeSong={activeSong} />
      </Grid>
    )
  );
}
