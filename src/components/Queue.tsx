import { RootState } from "@/app/store";
import FloatingPlayer from "@/components/FloatingPlayer";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Linking, Pressable, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TrackPlayer, {
  Event,
  Track,
  useActiveTrack,
  useTrackPlayerEvents,
} from "react-native-track-player";
import { useDispatch, useSelector } from "react-redux";
import { addTrack, setupPlayer } from "rntp-service";
import { useAppTheme } from "./providers/Material3ThemeProvider";
import { QueryParams } from "expo-linking";
import { Divider, Text } from "react-native-paper";
import SongItem from "./SongItem";

type localStateProps = "minimized" | "maximized";

export default function Queue() {
  const { height } = Dimensions.get("screen");
  const { bottom } = useSafeAreaInsets();
  const dispatch = useDispatch();
  const { colors } = useAppTheme();
  const track: Track | undefined = useActiveTrack();

  const { activeTrack } = useSelector((state: RootState) => state.track);
  const { floatingPlayerHeight } = useSelector(
    (state: RootState) => state.settings.appearance,
  );

  const [localState, setlocalState] = useState<localStateProps>("minimized");
  const [queue, setqueue] = useState<Track[]>();

  TrackPlayer.getQueue().then((res) => setqueue(res));
  useEffect(() => {}, []);

  const y = useSharedValue(height + floatingPlayerHeight! + bottom);

  const o = useSharedValue(1);
  const floatingOpacity = useAnimatedStyle(() => ({
    opacity: withSpring(o.value, {
      reduceMotion: ReduceMotion.Never,
    }),
  }));

  const fo = useSharedValue(1);
  const fullOpacity = useAnimatedStyle(() => ({
    opacity: withSpring(fo.value, {
      reduceMotion: ReduceMotion.Never,
    }),
  }));

  const animatedPlayerStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateY: withSpring(y.value, {
          damping: 20,
          reduceMotion: ReduceMotion.Never,
        }),
      },
    ],
  }));

  const handleTap = () => {
    if (localState === "minimized") {
      setlocalState("maximized");
    }
  };

  const resetY = () => {
    if (localState === "minimized") {
      y.value = height - bottom;
      o.value = 1;
      fo.value = 0;
    } else if (localState === "maximized") {
      y.value = floatingPlayerHeight!;
      o.value = 0;
      fo.value = 1;
    } else if (localState === "closed") {
      TrackPlayer.reset();
      y.value = height + floatingPlayerHeight! + bottom;
      o.value = 0;
      fo.value = 0;
    }
  };
  useEffect(() => {
    resetY();
  }, [localState]);

  const maximiseHandler = Gesture.Pan()
    .onUpdate((e) => {
      if (localState === "minimized") {
        y.value = e.absoluteY + floatingPlayerHeight!;
        (o.value = 0), (fo.value = 1);
      } else if (localState === "maximized" && e.translationY > 0) {
        y.value = e.translationY + floatingPlayerHeight!;
        if (e.translationY > height / 2) {
          (o.value = 1), (fo.value = 0.5);
        } else {
          (o.value = 0), (fo.value = 1);
        }
      }
    })
    .onEnd((e) => {
      if (e.velocityY < -1000) {
        setlocalState("maximized");
      } else if (e.velocityY > 1000) {
        setlocalState("minimized");
      } else if (localState === "minimized") {
        if (-e.translationY > height / 2) {
          setlocalState("maximized");
        } else {
          resetY();
        }
      } else if (localState === "maximized") {
        if (e.translationY > height / 2) {
          setlocalState("minimized");
        } else {
          resetY();
        }
      }
    })
    .runOnJS(true);

  const [activestate, setactivestate] = useState<number>();
  useTrackPlayerEvents(
    [Event.MetadataCommonReceived, Event.PlaybackActiveTrackChanged],
    async () => {
      const res = await TrackPlayer.getActiveTrackIndex();
      setactivestate(res);
    },
  );
  const handlePlay = async (track: Track) => {
    await TrackPlayer.add(track, activestate);
    await TrackPlayer.skipToPrevious();
    await TrackPlayer.play();
  };

  return (
    <Animated.View
      style={[animatedPlayerStyle]}
      className="h-full w-full absolute bottom-0 left-0"
    >
      <GestureDetector gesture={maximiseHandler}>
        <Animated.View
          className="w-full h-full -top-20 relative"
          style={{ backgroundColor: colors.background }}
        >
          <Pressable onPress={handleTap} className="z-10">
            <Animated.View className="h-20" style={[floatingOpacity]}>
              <FloatingPlayer track={track} />
            </Animated.View>
          </Pressable>
          <Animated.View
            className="h-full w-full flex-1 items-center justify-center absolute"
            style={[fullOpacity]}
          >
            <FlatList
              contentContainerStyle={{ paddingBottom: 80 }}
              style={{ backgroundColor: colors.background }}
              className="flex-1 h-full w-full"
              data={queue}
              renderItem={({ item }) => (
                <Pressable onPress={() => handlePlay(item)}>
                  <SongItem track={item} />
                </Pressable>
              )}
              keyExtractor={(item) => item.id}
              ItemSeparatorComponent={Divider}
            />
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}
