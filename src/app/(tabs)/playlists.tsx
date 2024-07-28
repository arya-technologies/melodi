import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import * as Linking from "expo-linking";

export default function Playlists() {
  const openEqualizer = async () => {
    const url =
      "intent:#Intent;action=android.media.action.DISPLAY_AUDIO_EFFECT_CONTROL_PANEL;end";
    try {
      await Linking.openURL(url);
    } catch (err) {
      console.error("An error occurred", err);
    }
  };

  return (
    <View>
      <Button mode="elevated" onPress={openEqualizer}>
        Test
      </Button>
      <View>{}</View>
    </View>
  );
}
