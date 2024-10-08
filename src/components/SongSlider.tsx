import { Slider } from "@miblanchard/react-native-slider";
import React from "react";
import { Text, View } from "react-native";
import { useProgress } from "react-native-track-player";
import { seekTo } from "react-native-track-player/lib/src/trackPlayer";
import { useAppTheme } from "./providers/Material3ThemeProvider";

export default function SongSlider() {
  const { colors } = useAppTheme();
  const { position, duration } = useProgress();

  return (
    <View className="w-full px-4">
      <Slider
        value={position}
        minimumValue={0}
        maximumValue={duration}
        thumbTintColor={colors.secondary}
        maximumTrackTintColor={colors.onSecondary}
        minimumTrackTintColor={colors.secondary}
        onSlidingComplete={(value) => seekTo(value[0])}
        animateTransitions
      />
      <View className="flex-row w-full justify-between">
        <Text className=" font-bold" style={{ color: colors.secondary }}>
          {new Date(position * 1000).toISOString().substring(15, 19)}
        </Text>
        <Text className=" font-bold" style={{ color: colors.secondary }}>
          {new Date(duration * 1000).toISOString().substring(15, 19)}
        </Text>
      </View>
    </View>
  );
}
