import { View, Text } from "react-native";
import React from "react";
import PlayerControls from "@/components/PlayerControls";
import SongArtwork from "@/components/SongArtwork";
import SongInfo from "@/components/SongInfo";
import SongSlider from "@/components/SongSlider";
import { Track } from "react-native-track-player";

type FullPlayerProps = {
  track: Track | undefined;
};

export default function FullPlayer({ track }: FullPlayerProps) {
  return (
    <View className="h-full p-4 flex-1 items-center justify-evenly">
      <SongArtwork track={track} />
      <View className="">
        <SongInfo track={track} />
        <SongSlider />
        <PlayerControls />
      </View>
    </View>
  );
}
