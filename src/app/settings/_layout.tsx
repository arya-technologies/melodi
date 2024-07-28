import { router, Slot } from "expo-router";
import React from "react";
import { Appbar } from "react-native-paper";

export default function SettingsLayout() {
  return (
    <>
      <Appbar.Header mode="small">
        <Appbar.Action
          onPress={() => {
            router.back();
          }}
          icon="arrow-back"
        />
        <Appbar.Content title="Settings" />
      </Appbar.Header>
      <Slot />
    </>
  );
}
