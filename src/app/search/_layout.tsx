import { router, Slot } from "expo-router";
import React, { useState } from "react";
import { Appbar, Searchbar } from "react-native-paper";

export default function SettingsLayout() {
  const [searchQuery, setsearchQuery] = useState<string>("");

  return (
    <>
      <Appbar.Header mode="small" elevated>
        <Appbar.Action
          onPress={() => {
            router.back();
          }}
          icon="arrow-back"
        />
        <Searchbar
          placeholder="Search anything"
          value={searchQuery}
          onChangeText={setsearchQuery}
          className="w-48 m-0"
        />
        <Appbar.Action
          onPress={() => {
            router.back();
          }}
          icon="arrow-back"
        />
      </Appbar.Header>
      <Slot />
    </>
  );
}
