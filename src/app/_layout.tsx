import { persistor, store } from "@/app/store";
import Player from "@/components/Player";
import { Material3ThemeProvider } from "@/components/providers/Material3ThemeProvider";
import Ionicons from "@expo/vector-icons/Ionicons";
import * as NavigationBar from "expo-navigation-bar";
import { Stack } from "expo-router/stack";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ActivityIndicator } from "react-native-paper";
import TrackPlayer from "react-native-track-player";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import playbackService from "@/features/services/playbackService";
import { useEffect } from "react";

// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const router = useRouter();

  // Linking.addEventListener("url", ({ url }) => {
  //   if (url === "trackplayer://notification.click") {
  //     // router.replace("/");
  //   }
  // });

  // const insets = useSafeAreaInsets();
  // console.log(insets);

  // if (!isPlayerReady) {
  //   <View>
  //     <Text>Loading...</Text>
  //   </View>;
  // }

  useEffect(() => {
    NavigationBar.setPositionAsync("absolute");
    NavigationBar.setBackgroundColorAsync("#00000000");
  }, []);

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
                animation: "ios",
                headerShown: false,
              }}
              initialRouteName="(tabs)"
            />
            <Player />
            {/* <Queue /> */}
          </GestureHandlerRootView>
        </Material3ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

// AppRegistry.registerComponent(...);
TrackPlayer.registerPlaybackService(() => playbackService);
