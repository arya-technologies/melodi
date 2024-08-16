import React, { PropsWithChildren } from "react";
import { View as NativeView } from "react-native";
import { useAppTheme } from "./providers/Material3ThemeProvider";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function View({ children, ...props }: PropsWithChildren) {
  const { colors } = useAppTheme();
  const { bottom, top } = useSafeAreaInsets();

  return (
    <NativeView
      style={{
        backgroundColor: colors.background,
        paddingTop: top,
        paddingBottom: bottom,
      }}
      className="w-full h-full px-4"
      {...props}
    >
      {children}
    </NativeView>
  );
}
