import React from "react";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { List } from "react-native-paper";
import * as Linking from "expo-linking";
import Constants from "expo-constants";

interface AboutAppDialogProos {
  visible: boolean;
  onDismiss: () => void;
}

export default function AboutAppDialog({
  visible,
  onDismiss,
}: AboutAppDialogProos) {
  const handleSource = () => {
    Linking.openURL("https://github.com/not-scripter/expo-template");
  };
  const handleIssue = () => {
    Linking.openURL("https://github.com/not-scripter/expo-template/issues");
  };

  return (
    <Portal>
      <Dialog visible={visible} onDismiss={onDismiss}>
        <Dialog.Title>About</Dialog.Title>
        <Dialog.Content>
          <List.Section>
            <List.Subheader>SOCIALS</List.Subheader>
            <List.Item
              title="Github"
              description="View the source code"
              onPress={handleSource}
            />
          </List.Section>
          <List.Section>
            <List.Subheader>TROUBLESOOTING</List.Subheader>
            <List.Item
              title="Report an issue"
              description="You will be redirected to github"
              onPress={handleIssue}
            />
          </List.Section>
          <List.Section>
            <List.Subheader>TROUBLESOOTING</List.Subheader>
            <List.Item
              title="Version"
              right={() => <Text>{Constants.expoConfig?.version}</Text>}
            />
          </List.Section>
        </Dialog.Content>
        <Dialog.Actions>
          <Button onPress={onDismiss}>Cancel</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
}
