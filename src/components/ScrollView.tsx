import { ScrollView as NativeScrollView, Text } from "react-native";
import React, { PropsWithChildren } from "react";
import { useAppTheme } from "./providers/Material3ThemeProvider";
import { Track, useActiveTrack } from "react-native-track-player";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ScrollView({ children, ...props }: PropsWithChildren) {
  const { colors } = useAppTheme();
  const { bottom } = useSafeAreaInsets();
  const track: Track | undefined = useActiveTrack();

  return (
    <NativeScrollView
      style={{
        backgroundColor: colors.background,
        paddingBottom: bottom + (track ? 80 : 0),
      }}
      {...props}
    >
      {children}
    </NativeScrollView>
  );
}
