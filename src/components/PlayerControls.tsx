import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, IconButton } from "react-native-paper";
import TrackPlayer, {
  Event,
  RepeatMode,
  Track,
  useActiveTrack,
  useIsPlaying,
} from "react-native-track-player";
import { useAppTheme } from "./providers/Material3ThemeProvider";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { addFavMusic, removeFavMusic } from "@/features/slices/favSlice";

export default function PlayerControls() {
  const dispatch = useDispatch();
  const { colors } = useAppTheme();
  const track = useActiveTrack();
  const { playing, bufferingDuringPlay } = useIsPlaying();

  const { musics } = useSelector((state: RootState) => state.favourites);

  const [isFab, setisFab] = useState<boolean>(musics.includes(track));
  const [isLooped, setisLooped] = useState(false);
  //
  TrackPlayer.addEventListener(
    Event.PlaybackActiveTrackChanged,
    ({ track }) => {
      setisFab(musics.includes(track));
      setisLooped(false);
      console.log(musics);
    },
  );

  const togglePlayback = async () => {
    if (!playing) {
      await TrackPlayer.play();
    } else {
      await TrackPlayer.pause();
    }
  };
  const skipToPrevious = async () => {
    await TrackPlayer.skipToPrevious();
  };
  const skipToNext = async () => {
    await TrackPlayer.skipToNext();
  };
  const handleFav = async () => {
    setisFab((prev) => !prev);
    if (musics.includes(track)) {
      dispatch(removeFavMusic(track));
    } else {
      dispatch(addFavMusic(track));
    }
  };
  const handleLoop = async () => {
    setisLooped((prev) => !prev);
    // TrackPlayer.setRepeatMode("Off");
  };

  // useEffect(() => {}, [isFab]);

  return (
    <View className="flex-row w-full items-center justify-evenly">
      <IconButton
        icon="heart"
        onPress={handleFav}
        iconColor={isFab ? colors.tertiary : colors.outline}
      />
      <IconButton
        icon="play-skip-back"
        onPress={skipToPrevious}
        iconColor={colors.secondary}
      />
      {bufferingDuringPlay === true ? (
        <ActivityIndicator size={48} style={{ padding: 14 }} />
      ) : (
        <IconButton
          icon={playing ? "pause" : "play"}
          onPress={() => togglePlayback()}
          size={48}
          iconColor={colors.secondary}
          containerColor={colors.backdrop}
        />
      )}
      <IconButton
        icon="play-skip-forward"
        onPress={skipToNext}
        iconColor={colors.secondary}
      />
      <IconButton
        icon="infinite"
        onPress={handleLoop}
        iconColor={isLooped ? colors.tertiary : colors.outline}
      />
    </View>
  );
}
