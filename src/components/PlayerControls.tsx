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

  const [isFab, setisFab] = useState<boolean>(musics.includes(track!));
  const [isLooped, setisLooped] = useState(false);

  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], ({ track }) => {
    setisFab(musics.includes(track!));
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
    setisFab((prev) => !prev);
    if (!musics.includes(track!)) {
      dispatch(addFavMusic(track!));
    } else {
      dispatch(removeFavMusic(track!));
    }
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
