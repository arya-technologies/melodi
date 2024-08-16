import { TabBar } from "@/components/TabBar";
import View from "@/components/View";
import { setActiveTrack, setQueue } from "@/features/slices/queueSlice";
import { setplayer } from "@/features/slices/settingsSlice";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import * as Linking from "expo-linking";
import { usePermissions } from "expo-media-library";
import { router } from "expo-router";
import React from "react";
import { Appbar, Text } from "react-native-paper";
import TrackPlayer, {
  Event,
  Track,
  useActiveTrack,
  useTrackPlayerEvents,
} from "react-native-track-player";
import { useDispatch, useSelector } from "react-redux";
import Explore from ".";
import { RootState } from "../../features/store";
import Albums from "./albums";
import Artists from "./artists";
import Playlists from "./playlists";
import Songs from "./songs";

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
  const dispatch = useDispatch();
  const [mediaPermission, requestMediaPermission] = usePermissions();

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

  if (!mediaPermission) {
    return (
      <View>
        <Text variant="titleMedium">Not Supported</Text>
      </View>
    );
  }

  if (!mediaPermission.granted) {
    const handleMmediaPermission = async () => {
      if (!mediaPermission.granted && mediaPermission.canAskAgain) {
        await requestMediaPermission();
      } else {
        Linking.openSettings();
      }
    };

    return (
      <View>
        <Text variant="displayLarge">Melodi</Text>
        <Text variant="titleMedium">
          Melodi needs access to your Local Songs.
          <Text
            variant="titleMedium"
            onPress={handleMmediaPermission}
            className="text-blue-500 mx-4"
          >
            Continue
          </Text>
        </Text>
      </View>
    );
  }

  return (
    <>
      <Appbar.Header mode="small" elevated>
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
