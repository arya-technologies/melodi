import { Slider } from "@miblanchard/react-native-slider";
import React from "react";
import { Dimensions, Image, View } from "react-native";
import { ActivityIndicator, IconButton, Text } from "react-native-paper";
import TrackPlayer, {
  State,
  Track,
  useIsPlaying,
  useProgress,
} from "react-native-track-player";
import { useAppTheme } from "./providers/Material3ThemeProvider";

type FloatingPlayerProps = {
  track: Track | undefined;
};

export default function FloatingPlayer({ track }: FloatingPlayerProps) {
  const { colors } = useAppTheme();

  const { playing, bufferingDuringPlay } = useIsPlaying();
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

  const { position, duration } = useProgress();

  if (track) {
    return (
      <>
        <Slider
          disabled
          thumbStyle={{ opacity: 0 }}
          containerStyle={{
            flex: 1,
            justifyContent: "flex-start",
            position: "absolute",
            width: "100%",
            height: 2,
          }}
          trackStyle={{ height: 2 }}
          value={position}
          minimumValue={0}
          maximumValue={duration}
          maximumTrackTintColor={colors.onSecondary}
          minimumTrackTintColor={colors.secondary}
          animateTransitions={true}
        />
        <View className="relative w-full h-full flex-row items-center justify-between px-4 py-2">
          <View className="flex-row items-center">
            <Image
              source={{
                uri:
                  track?.artwork ||
                  "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              }}
              className="h-12 w-12 rounded-md"
            />
            <Text
              variant="labelLarge"
              numberOfLines={1}
              className="tracking-wide font-bold ml-2"
            >
              {track?.title}
            </Text>
          </View>
          <View
            className="flex-row absolute right-0 h-full items-center"
            style={{ backgroundColor: colors.elevation.level2 }}
          >
            {bufferingDuringPlay === true ? (
              <ActivityIndicator style={{ margin: 8 }} />
            ) : (
              <IconButton
                icon={playing ? "pause" : "play"}
                onPress={togglePlayback}
                iconColor={colors.secondary}
                className="m-0"
              />
            )}
            <IconButton
              icon="play-skip-forward"
              onPress={skipToNext}
              iconColor={colors.secondary}
              className="m-0"
            />
          </View>
        </View>
      </>
    );
  }

  return (
    <View>
      <Text>No track</Text>
    </View>
  );
}
