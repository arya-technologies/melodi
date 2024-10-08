import { RootState } from "@/app/store";
import { useAppTheme } from "@/components/providers/Material3ThemeProvider";
import React from "react";
import { FlatList as NativeFlatlist, View } from "react-native";
import { Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Track, useActiveTrack } from "react-native-track-player";
import { useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

interface FlatlistProps {
  data: object[];
  renderItem: () => {};
  ItemSeparatorComponent: React.ReactNode;
  keyExtractor: () => {};
}

export default function Flatlist({
  data,
  renderItem,
  ItemSeparatorComponent,
  keyExtractor,
  ...props
}: FlatlistProps) {
  const { colors } = useAppTheme();
  const { bottom } = useSafeAreaInsets();
  const { floatingPlayerHeight } = useSelector(
    (state: RootState) => state.settings.appearance,
  );
  const track: Track | undefined = useActiveTrack();

  return (
    <NativeFlatlist
      {...props}
      contentContainerStyle={{
        paddingBottom: track! ? floatingPlayerHeight! : bottom,
      }}
      style={{ backgroundColor: colors.background }}
      data={data}
      renderItem={renderItem}
      keyExtractor={keyExtractor}
    />
  );
}
