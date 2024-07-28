import { RootState } from "@/app/store";
import ScrollView from "@/components/ScrollView";
import React, { useEffect, useState } from "react";
import { List, Switch } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setcontrols } from "@/features/slices/settingsSlice";
import * as Linking from "expo-linking";

export default function Controls() {
  const dispatch = useDispatch();
  const { controls } = useSelector((state: RootState) => state.settings);

  const [resumePlayback, setresumePlayback] = useState<boolean>(
    controls.player.resumePlayback,
  );
  const toggleResumePlayback = () => setresumePlayback((prev) => !prev);

  useEffect(() => {
    dispatch(
      setcontrols({
        player: {
          resumePlayback,
        },
      }),
    );
  }, [resumePlayback]);

  return (
    <ScrollView>
      <List.Section>
        <List.Subheader>PLAYER</List.Subheader>
        <List.Item
          title="Resume Playback"
          description="When a wired or bluetooth device is connected"
          right={() => (
            <Switch value={resumePlayback} onChange={toggleResumePlayback} />
          )}
        />
      </List.Section>
      <List.Section>
        <List.Subheader>AUDIO</List.Subheader>
        <List.Item
          title="Equalizer"
          description="Interact with the system equalizer"
          onPress={() => Linking.openSettings()}
        />
      </List.Section>
    </ScrollView>
  );
}
