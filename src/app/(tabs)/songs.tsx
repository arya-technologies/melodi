import RenderLocalTracks from "@/components/RenderLocalTracks";
import { useAppTheme } from "@/components/providers/Material3ThemeProvider";
import { Asset, getAssetsAsync } from "expo-media-library";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Songs() {
  const { colors } = useAppTheme();
  const { bottom } = useSafeAreaInsets();

  const [songs, setsongs] = useState<Asset[]>([]);

  useEffect(() => {
    (async function () {
      const assetsResponse = await getAssetsAsync({ mediaType: "audio" });
      setsongs(assetsResponse.assets);
    })();
  }, []);

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
