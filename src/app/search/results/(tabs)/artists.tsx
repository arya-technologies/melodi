import { RootState } from "@/features/store";
import ScrollView from "@/components/ScrollView";
import React, { useEffect, useState } from "react";
import { List } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { setothers } from "@/features/slices/settingsSlice";
import * as Linking from "expo-linking";

export default function Others() {
  const dispatch = useDispatch();
  const { others } = useSelector((state: RootState) => state.settings);

  const [isBatteryOptimizationDisabled, setisBatteryOptimizationDisabled] =
    useState<boolean>(others.battery.optimizationDisabled);

  useEffect(() => {
    dispatch(
      setothers({
        battery: {
          optimizationDisabled: isBatteryOptimizationDisabled,
        },
      }),
    );
  }, [isBatteryOptimizationDisabled]);

  return (
    <ScrollView>
      <List.Section>
        <List.Subheader>SERVICES</List.Subheader>
        <List.Item
          title="Ignore Battery Optimizations"
          description="Disable background restrictions"
          onPress={() => Linking.openSettings()}
        />
      </List.Section>
    </ScrollView>
  );
}
