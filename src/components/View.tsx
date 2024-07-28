import { View as NativeView, Text } from "react-native";
import React, { PropsWithChildren } from "react";
import { useAppTheme } from "./providers/Material3ThemeProvider";

export default function View({ children, ...props }: PropsWithChildren) {
  const { colors } = useAppTheme();
  return (
    <NativeView style={{ backgroundColor: colors.background }} {...props}>
      {children}
    </NativeView>
  );
}
