import Flatlist from "@/components/Flatlist";
import SongItem from "@/components/SongItem";
import { playlistData } from "@/constants";
import React from "react";
import { Pressable } from "react-native";
import { Divider } from "react-native-paper";

export default function Songs() {
  return (
    <Flatlist
      data={playlistData}
      renderItem={({ item }) => (
        <Pressable onPress={() => console.log(item)}>
          <SongItem track={item} />
        </Pressable>
      )}
      ItemSeparatorComponent={Divider}
    />
  );
}
