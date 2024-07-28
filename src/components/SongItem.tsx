import React from "react";
import { Track } from "react-native-track-player";
import { useAppTheme } from "./providers/Material3ThemeProvider";
import View from "./View";
import { Text } from "react-native-paper";
import { Image } from "react-native";

type SongItemsProps = {
  track: Track | undefined;
};

export default function SongItem({ track }: SongItemsProps) {
  const { colors } = useAppTheme();

  return (
    <View className="flex-row items-center px-4 py-2">
      <Image
        source={{ uri: track?.artwork }}
        className="h-14 w-14 rounded-md"
      />
      <View className="ml-2 flex-1">
        <Text variant="titleMedium">{track?.title}</Text>
        <View className="flex-row justify-between mt-2">
          <Text variant="labelMedium">{track?.artist}</Text>
          <Text variant="labelMedium">
            {Math.floor(track?.duration / 60)
              .toString()
              .padStart(2, "0")}
            :{(track?.duration % 60).toString().padStart(2, "0")}
          </Text>
        </View>
      </View>
    </View>
  );
}
