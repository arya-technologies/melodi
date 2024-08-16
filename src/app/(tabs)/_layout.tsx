import { TabBar } from "@/components/TabBar";
import { setActiveTrack, setQueue } from "@/features/slices/queueSlice";
import { setplayer } from "@/features/slices/settingsSlice";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { router } from "expo-router";
import React from "react";
import { Appbar } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TrackPlayer, {
  Event,
  Track,
  useActiveTrack,
  useTrackPlayerEvents,
} from "react-native-track-player";
import { useDispatch, useSelector } from "react-redux";
import Explore from ".";
import { RootState } from "../store";
import Albums from "./albums";
import Artists from "./artists";
import Playlists from "./playlists";
import Songs from "./songs";

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
  const dispatch = useDispatch();
  const { bottom } = useSafeAreaInsets();
  const track: Track | undefined = useActiveTrack();

  const { queue, activeTrack } = useSelector((state: RootState) => state.queue);
  const { player } = useSelector((state: RootState) => state.settings);

  useTrackPlayerEvents(
    [Event.PlaybackProgressUpdated],
    ({ track, position }) => {
      dispatch(setActiveTrack({ index: track, position: position }));
    },
  );
  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], () => {
    TrackPlayer.getQueue().then((queue: Track[]) => dispatch(setQueue(queue)));
    TrackPlayer.getRepeatMode().then((mode) =>
      dispatch(setplayer({ ...player, repeatMode: mode })),
    );
  });

  return (
    <>
      <Appbar.Header mode="small">
        <Appbar.Content title="Melodi" />
        <Appbar.Action
          onPress={() => {
            router.navigate("/settings");
          }}
          icon="settings"
        />
      </Appbar.Header>
      <Tab.Navigator tabBar={TabBar}>
        <Tab.Screen
          name="Explore"
          component={Explore}
          options={{ tabBarIcon: "home" }}
        />
        <Tab.Screen
          name="Songs"
          component={Songs}
          options={{ tabBarIcon: "musical-notes" }}
        />
        <Tab.Screen
          name="Playlists"
          component={Playlists}
          options={{ tabBarIcon: "library" }}
        />
        <Tab.Screen
          name="Artists"
          component={Artists}
          options={{ tabBarIcon: "person" }}
        />
        <Tab.Screen
          name="Albums"
          component={Albums}
          options={{ tabBarIcon: "albums" }}
        />
      </Tab.Navigator>
    </>
  );
}
