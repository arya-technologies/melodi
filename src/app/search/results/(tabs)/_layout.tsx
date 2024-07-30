import { TabBar } from "@/components/TabBar";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import Songs from "./songs";
import Playlists from "./playlist";
import Albums from "./albums";
import Artists from "./artists";

const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
  return (
    <Tab.Navigator tabBar={TabBar} initialRouteName="appearance">
      <Tab.Screen
        name="Songs"
        component={Songs}
        options={{ tabBarIcon: "color-palette" }}
      />
      <Tab.Screen
        name="Playlists"
        component={Playlists}
        options={{ tabBarIcon: "construct" }}
      />
      <Tab.Screen
        name="Albums"
        component={Albums}
        options={{ tabBarIcon: "server" }}
      />
      <Tab.Screen
        name="Artists"
        component={Artists}
        options={{ tabBarIcon: "shapes" }}
      />
    </Tab.Navigator>
  );
}
