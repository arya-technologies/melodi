import SongItem from "@/components/SongItem";
import { handlePlay } from "@/features/services/playbackService";
import React from "react";
import { Pressable } from "react-native";
import { Song } from "react-native-get-music-files/lib/typescript/src/NativeTurboSongs";
import { Track } from "react-native-track-player";

export default function RenderLocalTracks(song: Song) {
  const track: Track = {
    url: song.url,
    title: song.title,
    duration: song.duration,
    artist: song.artist,
    album: song.album,
    artwork: song.cover,
  };

  return (
    <Pressable onPress={() => handlePlay(track)}>
      <SongItem track={track} />
    </Pressable>
  );
}
