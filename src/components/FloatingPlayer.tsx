import { Slider } from "@miblanchard/react-native-slider";
import React from "react";
import { Dimensions, Image, Text, View } from "react-native";
import { ActivityIndicator, IconButton } from "react-native-paper";
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
  const togglePlayback = async () => {
    console.log("play pressed");
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

  const { position, duration } = useProgress();
  const { width } = Dimensions.get("screen");

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
              source={{ uri: track?.artwork }}
              className="h-12 w-12 rounded-md"
            />
            <Text
              className="tracking-wide font-bold ml-2"
              style={{ color: colors.secondary }}
            >
              {track?.title}
            </Text>
          </View>
          <View className="flex-row ">
            <IconButton
              icon="play-skip-back"
              onPress={skipToPrevious}
              iconColor={colors.secondary}
              className="m-0"
            />
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
