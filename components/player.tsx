import { action } from "easy-peasy";
import { useEffect, useRef, useState } from "react";
import ReactHowler from "react-howler";
import {
  MdOutlinePauseCircleFilled,
  MdOutlinePlayCircleFilled,
  MdOutlineRepeat,
  MdShuffle,
  MdSkipNext,
  MdSkipPrevious,
} from "react-icons/md";

import {
  ButtonGroup,
  Center,
  Flex,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Text,
} from "@chakra-ui/react";

import { formatDuration } from "../lib/formatters";
import { samples } from "../lib/samples";
import { Song, useStoreActions } from "../lib/store";

interface PlayerProps {
  songs: Song[];
  activeSong: Song;
}
export default function Player({ songs, activeSong }: PlayerProps) {
  const [playing, setPlaying] = useState<boolean>(true);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [index, setIndex] = useState(
    songs.findIndex(song => song.id === activeSong.id)
  );
  const [seek, setSeek] = useState(0.0);
  const [isSeeking, setIsSeeking] = useState<boolean>(false);
  const [duration, setDuration] = useState(0.0);
  const soundRef = useRef(null);
  const repeatRef = useRef(repeat);

  const setActiveSong = useStoreActions(actions => actions.changeActiveSong);
  useEffect(() => {
    let timerId;

    if (playing && !isSeeking) {
      timerId = requestAnimationFrame(f);
      return () => {
        cancelAnimationFrame(timerId);
      };
    }

    cancelAnimationFrame(timerId);

    function f() {
      setSeek(soundRef.current.seek());
      timerId = requestAnimationFrame(f);
    }
  }, [playing, isSeeking]);

  useEffect(() => {
    setActiveSong(songs[index]);
  }, [index, setActiveSong, songs]);

  useEffect(() => {
    repeatRef.current = repeat;
  }, [repeat]);

  return (
    <Flex
      direction="column"
      flexGrow="1"
      alignSelf="stretch"
      justifyContent="space-evenly"
    >
      <ReactHowler
        playing={playing}
        ref={soundRef}
        src={activeSong?.url}
        onEnd={onEnd}
        onLoad={onLoad}
      />
      <Center>
        <ButtonGroup>
          <IconButton
            outline="none"
            variant="link"
            aria-label="shuffle"
            color={shuffle ? "white" : "gray"}
            fontSize="20px"
            icon={<MdShuffle />}
            onClick={toggleShuffle}
          />
          <IconButton
            outline="none"
            variant="link"
            color="white"
            aria-label="skip previous"
            fontSize="22px"
            icon={<MdSkipPrevious />}
            onClick={previousSong}
          />
          {playing ? (
            <IconButton
              outline="none"
              variant="link"
              color="white"
              aria-label="pause"
              fontSize="38px"
              icon={<MdOutlinePauseCircleFilled />}
              onClick={() => setPlayState(false)}
            />
          ) : (
            <IconButton
              outline="none"
              variant="link"
              color="white"
              aria-label="play"
              fontSize="38px"
              icon={<MdOutlinePlayCircleFilled />}
              onClick={() => setPlayState(true)}
            />
          )}
          <IconButton
            color="white"
            outline="none"
            variant="link"
            aria-label="skip next"
            fontSize="22px"
            icon={<MdSkipNext />}
            onClick={nextSong}
          />
          <IconButton
            color={repeat ? "white" : "gray"}
            outline="none"
            variant="link"
            aria-label="repeat"
            fontSize="20px"
            icon={<MdOutlineRepeat />}
            onClick={toggleRepeat}
          />
        </ButtonGroup>
      </Center>
      <Flex
        color="gray.600"
        justify="center"
        align="center"
        width="100%"
        maxWidth="500px"
        alignSelf="center"
      >
        <Text fontSize="small" style={{ fontVariantNumeric: "tabular-nums" }}>
          {formatDuration(seek)}
        </Text>
        <RangeSlider
          marginX="10px"
          aria-label={["min", "max"]}
          step={0.1}
          min={0}
          max={duration ? Number(duration.toFixed(2)) : 0}
          onChange={onSeek}
          value={[seek]}
          onChangeStart={() => setIsSeeking(true)}
          onChangeEnd={() => setIsSeeking(false)}
          id="player-range"
        >
          <RangeSliderTrack bg="gray.800">
            <RangeSliderFilledTrack bg="gray.400" />
          </RangeSliderTrack>
          <RangeSliderThumb index={0} />
        </RangeSlider>
        <Text fontSize="small" style={{ fontVariantNumeric: "tabular-nums" }}>
          {formatDuration(duration)}
        </Text>
      </Flex>
    </Flex>
  );

  function onEnd() {
    if (repeatRef.current) {
      setSeek(0);
      soundRef.current.seek(0);
      return;
    }
    nextSong();
  }
  function onLoad() {
    const songDuration: number = soundRef.current.duration();
    setDuration(songDuration);
  }

  function onSeek(e) {
    setSeek(parseFloat(e[0]));
    soundRef.current.seek(e[0]);
  }

  function setPlayState(value: boolean) {
    setPlaying(value);
  }

  function toggleShuffle() {
    setShuffle(state => !state);
  }
  function toggleRepeat() {
    setRepeat(state => !state);
  }

  function previousSong() {
    setIndex(state => (state === 0 ? songs.length - 1 : state - 1));
  }
  function nextSong() {
    setIndex(state => {
      if (shuffle) {
        return getNextIndex(state);
      }
      return state === songs.length - 1 ? 0 : state + 1;
    });
  }
  function getNextIndex(index: number): number {
    const [newIndex] = samples(songs.map((_, i) => i).filter(i => i !== index));
    return newIndex;
  }
}
