import React, { PropsWithChildren } from "react";
import { View } from "react-native";
import { Text } from "react-native-paper";
import { Track } from "react-native-track-player";
import { useAppTheme } from "./providers/Material3ThemeProvider";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

type SongInfoProps = PropsWithChildren<{
  track: Track | null | undefined;
}>;

export default function SongInfo({ track }: SongInfoProps) {
  const { colors } = useAppTheme();

  return (
    <View>
      <Text
        style={{ color: colors.secondary }}
        className="font-bold text-xl tracking-wide text-center mb-6"
      >
        {track?.title}
      </Text>
    </View>
  );
}
