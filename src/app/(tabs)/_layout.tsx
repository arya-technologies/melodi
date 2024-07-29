import { TabBar } from "@/components/TabBar";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { router } from "expo-router";
import React from "react";
import { Appbar } from "react-native-paper";
import Explore from ".";
import Albums from "./albums";
import Artists from "./artists";
import Playlists from "./playlists";
import Songs from "./songs";
import TrackPlayer, { Event, Track } from "react-native-track-player";
import { useDispatch } from "react-redux";
import { setQueue } from "react-native-track-player/lib/src/trackPlayer";
import { setActiveTrack } from "@/features/slices/queueSlice";

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
  const dispatch = useDispatch();

  TrackPlayer.addEventListener(
    Event.PlaybackProgressUpdated,
    ({ track, position }) => {
      dispatch(
        setActiveTrack({ activeTrack: track, activeTrackPosition: position }),
      );
    },
  );
  TrackPlayer.addEventListener(Event.PlaybackActiveTrackChanged, () => {
    TrackPlayer.getQueue().then((queue: any) => dispatch(setQueue(queue)));
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
