import { ScrollView as NativeScrollView, Text } from "react-native";
import React, { PropsWithChildren } from "react";
import { useAppTheme } from "./providers/Material3ThemeProvider";

export default function ScrollView({ children, ...props }: PropsWithChildren) {
  const { colors } = useAppTheme();
  return (
    <NativeScrollView style={{ backgroundColor: colors.background }} {...props}>
      {children}
    </NativeScrollView>
  );
}
