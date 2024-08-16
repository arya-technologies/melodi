import SongItem from "@/components/SongItem";
import { handlePlay } from "@/features/services/playbackService";
import { Asset } from "expo-media-library";
import React from "react";
import { Pressable } from "react-native";
import { Track } from "react-native-track-player";

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
