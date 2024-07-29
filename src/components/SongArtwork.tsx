import React, { PropsWithChildren, useState } from "react";
import { Image, Pressable, View } from "react-native";
import { Text, TouchableRipple } from "react-native-paper";
import { Track } from "react-native-track-player";
import { useAppTheme } from "./providers/Material3ThemeProvider";
import Animated, {
  isSharedValue,
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type SongArtwordProps = PropsWithChildren<{
  track: Track | null | undefined;
}>;

export default function SongArtwork({ track }: SongArtwordProps) {
  const theme = useAppTheme();

  const [isInfoVisible, setisInfoVisible] = useState<boolean>(false);

  const o = useSharedValue(0);
  const animatedBgOpacity = useAnimatedStyle(() => ({
    opacity: withSpring(o.value, {
      reduceMotion: ReduceMotion.Never,
    }),
  }));

  const handleBgOpacity = () => {
    if (!isInfoVisible) {
      o.value = 1;
      setisInfoVisible(true);
    } else {
      o.value = 0;
      setisInfoVisible(false);
    }
  };

  return (
    <TouchableRipple onLongPress={handleBgOpacity}>
      <View
        className="w-[85vw] h-[85vw] overflow-hidden relative"
        style={{ borderRadius: theme.roundness }}
      >
        <Image
          source={{
            uri:
              track?.artwork ||
              "https://images.unsplash.com/photo-1532375810709-75b1da00537c?q=80&w=876&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
          }}
          className="w-full h-full"
        />
        <Animated.View
          className="absolute w-full h-full flex-1 items-center justify-center z-10"
          style={[animatedBgOpacity, { backgroundColor: "#000000CC" }]}
        >
          <View>
            <Text className="text-lg font-bold">Id: {track?.id}</Text>
          </View>
        </Animated.View>
      </View>
    </TouchableRipple>
  );
}
