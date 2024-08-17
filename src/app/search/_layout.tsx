import { useAppTheme } from "@/components/providers/Material3ThemeProvider";
import RenderLocalTracks from "@/components/RenderLocalTracks";
import ScrollView from "@/components/ScrollView";
import { TabBar } from "@/components/TabBar";
import View from "@/components/View";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { searchSongs } from "react-native-get-music-files";
import { Song } from "react-native-get-music-files/lib/typescript/src/NativeTurboSongs";
import { Appbar, Searchbar, Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Tab = createMaterialTopTabNavigator();

export default function SettingsLayout() {
  const { colors } = useAppTheme();
  const { bottom } = useSafeAreaInsets();

  const [searchQuery, setsearchQuery] = useState<string>("");

  function Local() {
    const [songs, setsongs] = useState<Song[]>();
    const [error, seterror] = useState<string>();

    useEffect(() => {
      (async function () {
        const localResponse = await searchSongs({ searchBy: searchQuery });
        if (typeof localResponse === "string") {
          seterror(localResponse);
        } else {
          setsongs(localResponse);
        }
      })();
    }, [searchQuery]);

    if (error) {
      return (
        <View>
          <Text>{error}</Text>
        </View>
      );
    }

    return (
      <FlatList
        contentContainerStyle={{
          paddingBottom: bottom,
        }}
        style={{ backgroundColor: colors.background }}
        data={songs}
        renderItem={({ item }) => RenderLocalTracks(item)}
      />
    );
  }

  function Online() {
    return (
      <ScrollView>
        <Text>Online</Text>
      </ScrollView>
    );
  }

  return (
    <>
      <Appbar.Header mode="small" elevated>
        <Searchbar
          placeholder="Search anything"
          value={searchQuery}
          onChangeText={setsearchQuery}
          elevation={2}
        />
      </Appbar.Header>
      <Tab.Navigator tabBar={TabBar} initialRouteName="appearance">
        <Tab.Screen
          name="Online"
          component={Online}
          options={{ tabBarIcon: "color-palette" }}
        />
        <Tab.Screen
          name="Local"
          component={Local}
          options={{ tabBarIcon: "construct" }}
        />
      </Tab.Navigator>
    </>
  );
}
