import { useAppTheme } from "@/components/providers/Material3ThemeProvider";
import SongItem from "@/components/SongItem";
import { playlistData } from "@/constants";
import React, { useState } from "react";
import { FlatList, Pressable } from "react-native";
import { Divider } from "react-native-paper";
import TrackPlayer, {
  Event,
  Track,
  useTrackPlayerEvents,
} from "react-native-track-player";

export default function Explore() {
  const { colors } = useAppTheme();

  const getmusic = async () => {
    // const res = await getYtMusic("qnQCd_nZn_g");
    // console.log(res);
    // const music = await ytdl.getBasicInfo(
    //   "https://music.youtube.com/watch?v=i8VAQ8Cy5rs",
    // );
    //
    // console.log(music);
  };

  // const [activestate, setactivestate] = useState<number>();
  const [queue, setqueue] = useState<Track[]>();

  useTrackPlayerEvents(
    [Event.MetadataCommonReceived, Event.PlaybackActiveTrackChanged],
    async () => {
      // TrackPlayer.getActiveTrackIndex().then((res) => setactivestate(res));
      TrackPlayer.getQueue().then((res) => setqueue(res));
    },
  );

  const handlePlay = async (track: Track) => {
    const alreadyInQueue = queue?.findIndex((item) => item.id === track.id);
    if (alreadyInQueue !== -1) {
      TrackPlayer.skip(alreadyInQueue!).then(() => TrackPlayer.play());
    } else if (alreadyInQueue === -1) {
      TrackPlayer.add(track).then((index: any) =>
        TrackPlayer.skip(index).then(() => TrackPlayer.play()),
      );
    }
  };

  return (
    <FlatList
      contentContainerStyle={{ paddingBottom: 80 }}
      style={{ backgroundColor: colors.background }}
      data={playlistData}
      renderItem={({ item }) => (
        <Pressable onPress={() => handlePlay(item)}>
          <SongItem track={item} />
        </Pressable>
      )}
      keyExtractor={(track) => track.id}
    />
  );
}
