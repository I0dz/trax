import { AiOutlineClockCircle } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";

import { Box } from "@chakra-ui/layout";
import { IconButton, Table, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react";

import { formatDate, formatDuration } from "../lib/formatters";
import { Song, useStoreActions } from "../lib/store";

export default function SongsTable({ songs }) {
  const playSongs = useStoreActions(actions => actions.changeActiveSongs);
  const setActiveSong = useStoreActions(actions => actions.changeActiveSong);

  return (
    <Box bg="transparent" color="white">
      <Box padding="10px" marginBottom="20px">
        <Box marginBottom="30px">
          <IconButton
            icon={<BsFillPlayFill fontSize="30px" />}
            aria-label="play"
            colorScheme="green"
            size="lg"
            isRound
            onClick={() => play()}
          />
        </Box>
        <Table variant="unstyled">
          <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,.2)">
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Date Added</Th>
              <Th>
                <AiOutlineClockCircle size="18px" />
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs.map((song, i) => {
              return (
                <Tr
                  onClick={() => play(song)}
                  key={song.id}
                  cursor="pointer"
                  sx={{
                    transition: "all .3s",
                    "&:hover": {
                      bg: "rgba(255,255,255,.1)",
                    },
                  }}
                >
                  <Td>{i + 1}</Td>
                  <Td>{song.name}</Td>
                  <Td>{formatDate(song.createdAt)}</Td>
                  <Td>{formatDuration(song.duration)}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );

  function play(activeSong?: Song) {
    playSongs(songs);
    setActiveSong(activeSong ?? songs[0]);
  }
}
