import SongItem from "@/components/SongItem";
import { handlePlay } from "@/features/services/playbackService";
import { Asset, getAssetsAsync } from "expo-media-library";
import React, { useEffect, useState } from "react";
import { FlatList, Pressable } from "react-native";
import { Track } from "react-native-track-player";

export default function Songs() {
  const [songs, setsongs] = useState<Asset[]>([]);

  useEffect(() => {
    (async function () {
      const assetsResponse = await getAssetsAsync({ mediaType: "audio" });
      setsongs(assetsResponse.assets);
    })();
  }, []);

  return (
    <FlatList data={songs} renderItem={({ item }) => renderLocalTracks(item)} />
  );
}

const renderLocalTracks = (asset: Asset) => {
  const track: Track = {
    url: asset.uri,
    title: asset.filename.split(".").shift(),
    duration: asset.duration,
    contentType: asset.mediaType,
  };
  return (
    <Pressable onPress={() => handlePlay(track)}>
      <SongItem track={track} />
    </Pressable>
  );
};
