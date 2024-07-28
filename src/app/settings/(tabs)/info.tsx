import ScrollView from "@/components/ScrollView";
import React from "react";
import { List } from "react-native-paper";
import * as Linking from "expo-linking";

export default function Info() {
  const handleSource = () => {
    Linking.openURL("https://github.com/not-scripter/melodi");
  };
  const handleIssue = () => {
    Linking.openURL("https://github.com/not-scripter/melodi/issues");
  };

  return (
    <ScrollView>
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
    </ScrollView>
  );
}
