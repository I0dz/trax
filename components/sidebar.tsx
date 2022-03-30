import NextImage from "next/image";
import NextLink from "next/link";
import {
  MdFavorite,
  MdHome,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdSearch,
} from "react-icons/md";

import {
  Box,
  Divider,
  LinkBox,
  LinkOverlay,
  List,
  ListIcon,
  ListItem,
} from "@chakra-ui/layout";

import { usePlaylist } from "../lib/hooks";

const navMenu = [
  {
    name: "Home",
    route: "/",
    icon: MdHome,
  },
  {
    name: "Search",
    route: "/search",
    icon: MdSearch,
  },
  {
    name: "Your Library",
    route: "/library",
    icon: MdLibraryMusic,
  },
];

const musicMenu = [
  {
    name: "Create Playlist",
    route: "/create",
    icon: MdPlaylistAdd,
  },
  {
    name: "Favourite",
    route: "/favourite",
    icon: MdFavorite,
  },
];

export default function Sidebar() {
  const { playlists } = usePlaylist();
  return (
    <Box
      width="100%"
      height="calc(100vh - 100px)"
      bg="black"
      paddingX="5px"
      color="gray"
    >
      <Box paddingY="20px" height="100%" display="flex" flexDirection="column">
        <Box width="100%" paddingX="20px">
          <NextImage src="/logo.svg" width={100} height={60} />
          <Box paddingY="20px">
            <List spacing={2} marginBottom="25px">
              {navMenu.map(menu => (
                <ListItem fontSize="16px" key={menu.name}>
                  <LinkBox>
                    <NextLink href={menu.route} passHref>
                      <LinkOverlay>
                        <ListIcon
                          as={menu.icon}
                          color="white"
                          marginRight="10px"
                        />
                        {menu.name}
                      </LinkOverlay>
                    </NextLink>
                  </LinkBox>
                </ListItem>
              ))}
            </List>
            <List spacing={2}>
              {musicMenu.map(menu => (
                <ListItem fontSize="16px" key={menu.name}>
                  <LinkBox>
                    <NextLink href={menu.route} passHref>
                      <LinkOverlay>
                        <ListIcon
                          as={menu.icon}
                          color="white"
                          marginRight="10px"
                        />
                        {menu.name}
                      </LinkOverlay>
                    </NextLink>
                  </LinkBox>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
        <Divider marginY="20px" color="gray.700" />
        <Box overflowY="auto">
          <List spacing={2}>
            {playlists.map(playList => (
              <ListItem
                paddingX="20px"
                fontSize="14px"
                key={playList.id}
                sx={{
                  transition: "all .3s",
                  "&:hover": {
                    color: "white",
                  },
                }}
              >
                <LinkBox>
                  <NextLink
                    href={{
                      pathname: "/playlist/[id]",
                      query: { id: playList.id },
                    }}
                    passHref
                  >
                    <LinkOverlay>{playList.name}</LinkOverlay>
                  </NextLink>
                </LinkBox>
              </ListItem>
            ))}
          </List>
        </Box>
      </Box>
    </Box>
  );
}
