import { View, Text, FlatList, TouchableOpacity } from "react-native";
import React, { PropsWithChildren } from "react";
import { useAppTheme } from "./providers/Material3ThemeProvider";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, usePathname } from "expo-router";
import { Appbar } from "react-native-paper";

export interface SideNavProps {
  data: {
    icon: string;
    label: string;
    href: string;
  }[];
  props?: any;
  ListHeaderComponent?: any;
}

export default function SideNav({
  data,
  ListHeaderComponent,
  ...props
}: SideNavProps) {
  const { colors } = useAppTheme();
  const pathname = usePathname();
  return (
    <View className="w-16 pb-20">
      <FlatList
        data={data}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            className="h-24 flex items-center justify-center -rotate-90"
            onPress={() => router.navigate(item.href)}
          >
            <View className="w-6 h-6">
              {pathname === item.href && (
                <Ionicons name={item.icon} size={24} color={colors.secondary} />
              )}
            </View>
            <Text
              className="font-bold tracking-wide"
              style={{
                color:
                  pathname === item.href ? colors.secondary : colors.outline,
              }}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        )}
        {...props}
      />
    </View>
  );
}
// <Ionicons name={item.icon} size={24} color={theme.colors.primary} />
