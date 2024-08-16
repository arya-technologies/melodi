import { RootState } from "@/features/store";
import React from "react";
import { Image, View } from "react-native";
import { Text } from "react-native-paper";
import { Track } from "react-native-track-player";
import { useSelector } from "react-redux";
import { useAppTheme } from "./providers/Material3ThemeProvider";

type SongItemsProps = {
  track: Track | undefined;
};

export default function SongItem({ track }: SongItemsProps) {
  const { colors } = useAppTheme();

  const queue = useSelector((state: RootState) => state.queue.queue);
  const isAlreadyOnQueue = queue?.find((item) => item.id === track?.id);
  // const [isAlreadyOnQueue, setisAlreadyOnQueue] = useState<boolean>();

  return (
    <View
      className="flex-row items-center px-4 py-2"
      style={
        isAlreadyOnQueue && {
          backgroundColor: colors.elevation.level3,
        }
      }
    >
      <Image
        source={{ uri: track?.artwork }}
        className="h-14 w-14 rounded-md"
      />
      <View className="ml-2 flex-1">
        <Text variant="titleMedium">{track?.title}</Text>
        <View className="flex-row justify-between mt-2">
          <Text variant="labelMedium">{track?.artist}</Text>
          <Text variant="labelMedium">
            {Math.floor(track?.duration! / 60)
              .toString()
              .padStart(2, "0")}
            :{(track?.duration! % 60).toString().padStart(2, "0")}
          </Text>
        </View>
      </View>
    </View>
  );
}
