import ScrollView from "@/components/ScrollView";
import React from "react";
import { Button } from "react-native-paper";
require("node-libs-react-native/globals");
// import youtubeDl from "youtube-dl-exec";

export default function Playlists() {
  const test = async () => {
    try {
      // const videos = await YouTube.search("playing with fire");
      // console.log(
      //   videos.map((m, i) => `[${++i}] ${m.title} (${m.url})`).join("\n"),
      // );
      // youtubeDl("https://www.youtube.com/watch?v=6xKWiCMKKJg", {
      //   dumpSingleJson: true,
      //   noCheckCertificates: true,
      //   noWarnings: true,
      //   preferFreeFormats: true,
      //   addHeader: ["referer:youtube.com", "user-agent:googlebot"],
      // }).then((output) => console.log(output));
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView>
      <Button mode="elevated" onPress={test}>
        Test
      </Button>
    </ScrollView>
  );
}
