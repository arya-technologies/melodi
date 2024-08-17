import RenderLocalTracks from "@/components/RenderLocalTracks";
import View from "@/components/View";
import { useAppTheme } from "@/components/providers/Material3ThemeProvider";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import {
  SortSongFields,
  SortSongOrder,
  getAll,
} from "react-native-get-music-files";
import { Song } from "react-native-get-music-files/lib/typescript/src/NativeTurboSongs";
import { Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Songs() {
  const { colors } = useAppTheme();
  const { bottom } = useSafeAreaInsets();

  const [songs, setsongs] = useState<Song[]>([]);
  const [error, seterror] = useState<string>();

  useEffect(() => {
    (async function () {
      seterror("");
      const response = await getAll({
        limit: 20,
        offset: 0,
        coverQuality: 50,
        minSongDuration: 1000,
        sortBy: SortSongFields.TITLE,
        sortOrder: SortSongOrder.DESC,
      });
      if (typeof response === "string") {
        seterror(response);
      } else {
        setsongs(response);
      }
    })();
  }, []);

  if (error) {
    return (
      <View>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      contentContainerStyle={{
        paddingBottom: bottom,
      }}
      style={{ backgroundColor: colors.background }}
      data={songs}
      renderItem={({ item }) => RenderLocalTracks(item)}
    />
  );
}
