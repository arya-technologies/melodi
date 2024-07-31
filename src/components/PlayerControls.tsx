import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { ActivityIndicator, IconButton } from "react-native-paper";
import TrackPlayer, {
  Event,
  RepeatMode,
  Track,
  useActiveTrack,
  useIsPlaying,
  useTrackPlayerEvents,
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
  const { repeatMode } = useSelector(
    (state: RootState) => state.settings.controls.player,
  );

  const [isFab, setisFab] = useState<boolean>(false);
  const [isLooped, setisLooped] = useState<boolean>(
    repeatMode === RepeatMode.Track ? true : false,
  );

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], ({ track }) => {
    const isAllready = musics?.find((item) => item?.id === track?.id);
    if (isAllready) {
      setisFab(true);
    } else {
      setisFab(false);
    }
    setisLooped(false);
  });

  const togglePlayback = () => {
    if (!playing) {
      TrackPlayer.play();
    } else {
      TrackPlayer.pause();
    }
  };
  const skipToPrevious = () => {
    TrackPlayer.skipToPrevious();
  };
  const skipToNext = () => {
    TrackPlayer.skipToNext();
  };
  const handleFav = () => {
    if (!isFab) {
      dispatch(addFavMusic(track!));
    } else {
      dispatch(removeFavMusic(track!));
    }
    setisFab((prev) => !prev);
  };
  const handleLoop = () => {
    setisLooped((prev) => !prev);
    TrackPlayer.setRepeatMode(isLooped ? RepeatMode.Track : RepeatMode.Queue);
  };

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
          onPress={togglePlayback}
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
