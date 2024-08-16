import { persistor, store } from "@/app/store";
import Player from "@/components/Player";
import View from "@/components/View";
import { Material3ThemeProvider } from "@/components/providers/Material3ThemeProvider";
import playbackService from "@/features/services/playbackService";
import Ionicons from "@expo/vector-icons/Ionicons";
import { usePermissions } from "expo-media-library";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router/stack";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ActivityIndicator, Text } from "react-native-paper";
import TrackPlayer from "react-native-track-player";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

NavigationBar.setPositionAsync("absolute");
NavigationBar.setBackgroundColorAsync("#00000000");
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [mediaPermission, requestMediaPermission] = usePermissions();

  if (!mediaPermission) {
    return (
      <View>
        <Text>Dont Have Permissions</Text>
      </View>
    );
  }

  if (!mediaPermission.granted) {
    (async function () {
      await requestMediaPermission();
    })();
  }

  return (
    <Provider store={store}>
      <PersistGate loading={<ActivityIndicator />} persistor={persistor}>
        <Material3ThemeProvider
          settings={{
            icon: (props: any) => <Ionicons {...props} />,
          }}
        >
          <GestureHandlerRootView>
            <Stack
              screenOptions={{
                gestureEnabled: true,
                animation: "default",
                headerShown: false,
              }}
              initialRouteName="(tabs)"
            />
            <Player />
          </GestureHandlerRootView>
        </Material3ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

// AppRegistry.registerComponent(...);
TrackPlayer.registerPlaybackService(() => playbackService);
