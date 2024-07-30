import { TabBar } from "@/components/TabBar";
import { setActiveTrack, setQueue } from "@/features/slices/queueSlice";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { router } from "expo-router";
import React from "react";
import { Appbar, FAB, Text } from "react-native-paper";
import TrackPlayer, {
  Event,
  Track,
  useActiveTrack,
  useTrackPlayerEvents,
} from "react-native-track-player";
import { useDispatch, useSelector } from "react-redux";
import Explore from ".";
import Albums from "./albums";
import Artists from "./artists";
import Playlists from "./playlists";
import Songs from "./songs";
import { setcontrols } from "@/features/slices/settingsSlice";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { RootState } from "../store";

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
  const dispatch = useDispatch();
  const { bottom } = useSafeAreaInsets();
  const track: Track | undefined = useActiveTrack();
  const { floatingPlayerHeight } = useSelector(
    (state: RootState) => state.settings.appearance,
  );

  const state = useSelector((state: RootState) => state);
  console.log("Queue", state.queue);
  console.log("Settings", state.settings);
  console.log("Favourites", state.favourites);

  useTrackPlayerEvents(
    [Event.PlaybackProgressUpdated],
    ({ track, position }) => {
      dispatch(
        setActiveTrack({ activeTrack: track, activeTrackPosition: position }),
      );
    },
  );
  useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], () => {
    TrackPlayer.getQueue().then((queue: any) => dispatch(setQueue(queue)));
    TrackPlayer.getRepeatMode().then((mode) =>
      dispatch(setcontrols({ player: { repeatMode: mode } })),
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
      <FAB
        icon="search"
        style={{
          position: "absolute",
          margin: 16,
          right: 0,
          bottom: track! ? floatingPlayerHeight! : 0,
        }}
        onPress={() => router.push("search")}
      />
    </>
  );
}
