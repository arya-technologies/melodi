import { TabBar } from "@/components/TabBar";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import React from "react";
import Online from "./online";
import Local from "./local";
const Tab = createMaterialTopTabNavigator();

export default function TabLayout() {
  return (
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
  );
}
