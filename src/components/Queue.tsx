import { RootState } from "@/app/store";
import React, { useEffect, useState } from "react";
import { Dimensions, FlatList, Pressable, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { Button, Icon, IconButton, TouchableRipple } from "react-native-paper";
import Animated, {
  ReduceMotion,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import TrackPlayer, {
  Event,
  RepeatMode,
  Track,
  useActiveTrack,
  useTrackPlayerEvents,
} from "react-native-track-player";
import { useSelector } from "react-redux";
import SongItem from "./SongItem";
import { useAppTheme } from "./providers/Material3ThemeProvider";

type localStateProps = "minimized" | "maximized";

export default function Queue() {
  const { height } = Dimensions.get("screen");
  const { bottom, top } = useSafeAreaInsets();
  const { colors } = useAppTheme();
  const track: Track | undefined = useActiveTrack();

  const { floatingPlayerHeight } = useSelector(
    (state: RootState) => state.settings.appearance,
  );
  const { repeatMode } = useSelector(
    (state: RootState) => state.settings.controls.player,
  );
  const { queue } = useSelector((state: RootState) => state.queue);

  const [localState, setlocalState] = useState<localStateProps>("minimized");
  // const [queue, setqueue] = useState<Track[]>();
  const [isQueueOn, setisQueueOn] = useState<boolean>(
    repeatMode === RepeatMode.Queue ? true : false,
  );

  // useTrackPlayerEvents([Event.PlaybackActiveTrackChanged], () => {
  // TrackPlayer.getQueue().then((res) => setqueue(res));
  // TrackPlayer.getRepeatMode().then((mode) =>
  //   setisQueueOn(mode === RepeatMode.Queue ? true : false),
  // );
  // });

  // const y = useSharedValue(height + floatingPlayerHeight! + bottom);
  const y = useSharedValue(height + floatingPlayerHeight!);

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

  const handleTapClose = () => {
    if (localState === "maximized") {
      setlocalState("minimized");
    }
  };

  const resetY = () => {
    if (localState === "minimized") {
      y.value = height;
      o.value = 1;
      fo.value = 0;
    } else if (localState === "maximized") {
      y.value = floatingPlayerHeight!;
      o.value = 0;
      fo.value = 1;
    }
  };
  useEffect(() => {
    resetY();
  }, [localState]);

  const maximiseHandler = Gesture.Pan()
    .onUpdate((e) => {
      if (localState === "minimized" && e.translationY < -0) {
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

  const handlePlay = (track: Track) => {
    console.log(queue);
    const alreadyInQueue = queue?.find((item) => item.id === track.id);
    if (!alreadyInQueue) {
      TrackPlayer.add(track).then((index: any) =>
        TrackPlayer.skip(index).then(() => TrackPlayer.play()),
      );
    }
  };

  const toggleRepeatMode = () => {
    setisQueueOn((prev) => !prev);
    // TrackPlayer.setRepeatMode(isQueueOn ? RepeatMode.Queue : RepeatMode.Off);
    TrackPlayer.setRepeatMode(isQueueOn ? RepeatMode.Queue : RepeatMode.Off);
  };

  return (
    <Animated.View
      style={[animatedPlayerStyle]}
      className="h-full w-full absolute bottom-0 left-0"
    >
      <GestureDetector gesture={maximiseHandler}>
        <Animated.View
          className="w-full h-full -top-20 relative"
          style={{ backgroundColor: colors.elevation.level3 }}
        >
          <TouchableRipple onPress={handleTap} className="z-10">
            <Animated.View
              style={[
                floatingOpacity,
                { height: floatingPlayerHeight, paddingBottom: bottom },
              ]}
              className="relative flex-row items-center justify-center"
            >
              <Icon source="layers" size={24} />
              <View className="absolute flex-row w-full h-full items-center justify-end">
                <IconButton icon="ellipsis-vertical" size={24} />
              </View>
            </Animated.View>
          </TouchableRipple>
          <Animated.View
            className="h-full w-full flex-1 items-center justify-center absolute"
            style={[fullOpacity, { backgroundColor: colors.background }]}
          >
            <FlatList
              contentContainerStyle={{
                paddingTop: top,
                paddingBottom: track ? floatingPlayerHeight! : bottom,
              }}
              className="flex-1 h-full w-full"
              data={queue}
              renderItem={({ item }) => (
                <TouchableRipple onPress={() => handlePlay(item)}>
                  <SongItem track={item} />
                </TouchableRipple>
              )}
              keyExtractor={(item) => item.id}
            />
            <TouchableRipple
              onPress={handleTapClose}
              className="absolute w-full bottom-0"
              style={{
                height: floatingPlayerHeight,
                paddingBottom: bottom,
                backgroundColor: colors.elevation.level3,
              }}
            >
              <View className="relative flex-row items-center justify-center z-10 h-full">
                <Icon source="arrow-down" size={24} />
                <View className="absolute flex-row w-full h-full items-center justify-between px-4">
                  <Button mode="text">{queue?.length} Songs</Button>
                  <Button mode="elevated" onPress={toggleRepeatMode}>
                    Queue Loop {isQueueOn ? "On" : "Off"}
                  </Button>
                </View>
              </View>
            </TouchableRipple>
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}
