import React from "react";
import { Track } from "react-native-track-player";
import { Asset, getAssetsAsync } from "expo-media-library";
import SongItem from "@/components/SongItem";
import { handlePlay } from "@/features/services/playbackService";
import { FlatList, Pressable } from "react-native";

export default function RenderLocalTracks(asset: Asset) {
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
}
