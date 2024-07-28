import { useAppTheme } from "@/components/providers/Material3ThemeProvider";
import ScrollView from "@/components/ScrollView";
import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  List,
  Portal,
  RadioButton,
  Switch,
} from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { setappearance, ThemeProps } from "@/features/slices/settingsSlice";
import { useMaterial3Theme } from "@pchmn/expo-material3-theme";

export default function Appearance() {
  const dispatch = useDispatch();
  const { appearance } = useSelector((state: RootState) => state.settings);
  const { artworkColors } = useSelector((state: RootState) => state.track);

  const [theme, settheme] = useState<ThemeProps>(appearance.colors.theme);
  const [isThemeDialogVisible, setisThemeDialogVisible] = useState(false);
  const showThemeDialog = () => setisThemeDialogVisible(true);
  const hideThemeDialog = () => setisThemeDialogVisible(false);

  const [isUsingSystemFont, setisUsingSystemFont] = useState<boolean>(
    appearance.typography.useSystemFont,
  );
  const toggleIsSystemFontEnabled = () => setisUsingSystemFont((prev) => !prev);

  const { updateTheme } = useMaterial3Theme();

  useEffect(() => {
    dispatch(
      setappearance({
        colors: {
          theme,
        },
        typography: {
          useSystemFont: isUsingSystemFont,
        },
      }),
    );
  }, [theme, isUsingSystemFont]);

  return (
    <ScrollView>
      <List.Section>
        <List.Subheader>COLORS</List.Subheader>
        <List.Item
          title="Theme"
          description={theme.slice(0, 1).toUpperCase() + theme.slice(1)}
          onPress={showThemeDialog}
        />

        <Portal>
          <Dialog visible={isThemeDialogVisible} onDismiss={hideThemeDialog}>
            <Dialog.Title>Theme</Dialog.Title>
            <Dialog.Content>
              <RadioButton.Item
                label="System"
                value="system"
                status={theme === "system" ? "checked" : "unchecked"}
                onPress={() => settheme("system")}
              />
              <RadioButton.Item
                label="Dynamic"
                value="dynamic"
                status={theme === "dynamic" ? "checked" : "unchecked"}
                onPress={() => settheme("dynamic")}
              />
              <RadioButton.Item
                label="Pure Black"
                value="pureBlack"
                status={theme === "pureBlack" ? "checked" : "unchecked"}
                onPress={() => settheme("pureBlack")}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideThemeDialog}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </List.Section>

      <List.Section>
        <List.Subheader>TYPOGRAPHY</List.Subheader>
        <List.Item
          title="Use System Font"
          right={() => (
            <Switch
              value={isUsingSystemFont}
              onChange={toggleIsSystemFontEnabled}
            />
          )}
        />
      </List.Section>
    </ScrollView>
  );
}
