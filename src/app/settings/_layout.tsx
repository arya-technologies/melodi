import AboutAppDialog from "@/components/dialogs/AboutAppDialog";
import { router, Slot } from "expo-router";
import React, { useState } from "react";
import { Appbar } from "react-native-paper";

export default function SettingsLayout() {
  const [isAboutDialogVisible, setisAboutDialogVisible] =
    useState<boolean>(false);
  const showAboutDialog = () => setisAboutDialogVisible(true);
  const hideAboutDialog = () => setisAboutDialogVisible(false);

  return (
    <>
      <Appbar.Header mode="small" elevated>
        <Appbar.BackAction
          onPress={() => {
            router.back();
          }}
        />
        <Appbar.Content title="Settings" />
        <Appbar.Action icon="information" onPress={showAboutDialog} />
      </Appbar.Header>
      <Slot />
      <>
        <AboutAppDialog
          visible={isAboutDialogVisible}
          onDismiss={hideAboutDialog}
        />
      </>
    </>
  );
}
