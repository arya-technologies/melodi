import { RootState } from "@/app/store";
import { useAppTheme } from "@/components/providers/Material3ThemeProvider";
import React from "react";
import { FlatList as NativeFlatlist } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Track, useActiveTrack } from "react-native-track-player";
import { useSelector } from "react-redux";

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
  const track: Track = useActiveTrack();

  return (
    <NativeFlatlist
      {...props}
      contentContainerStyle={{
        paddingBottom: bottom + track ? floatingPlayerHeight! : 0,
      }}
      style={{ backgroundColor: colors.background }}
      data={data}
      renderItem={renderItem}
      ItemSeparatorComponent={ItemSeparatorComponent}
      keyExtractor={keyExtractor}
    />
  );
}
