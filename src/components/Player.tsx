import { RootState } from "@/features/store";
import FloatingPlayer from "@/components/FloatingPlayer";
import FullPlayer from "@/components/FullPlayer";
import { setupPlayer } from "@/features/services/playbackService";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Dimensions, Linking, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { FAB, TouchableRipple } from "react-native-paper";
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
import Queue from "./Queue";
import { useAppTheme } from "./providers/Material3ThemeProvider";

type localStateProps = "minimized" | "maximized" | "closed";

export default function Player() {
  const router = useRouter();

  Linking.addEventListener("url", ({ url }) => {
    if (url === "trackplayer://notification.click") {
      router.canDismiss();
      setlocalState("maximized");
    }
  });

  const floatingPlayerHeight = 80;
  const { height } = Dimensions.get("screen");
  const { bottom } = useSafeAreaInsets();
  const { colors } = useAppTheme();
  const track: Track | undefined = useActiveTrack();

  const { queue, activeTrack } = useSelector((state: RootState) => state.queue);

  const [localState, setlocalState] = useState<localStateProps>(
    track ? "minimized" : "closed",
  );

  async function setup() {
    let isSetup = await setupPlayer();
    if (isSetup && queue) {
      const queueRes = await TrackPlayer.setQueue(queue);
      if (activeTrack) {
        await TrackPlayer.skip(activeTrack.index, activeTrack.position);
      }
    } else {
      console.log("no queue in redux");
    }
  }

  useEffect(() => {
    setup();
  }, []);

  useTrackPlayerEvents([Event.PlaybackState], ({ state }) => {
    if (state === "playing" && localState === "closed") {
      setlocalState("minimized");
    } else if (state === "stopped") {
      setlocalState("closed");
    }
  });

  const y = useSharedValue(height);

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
      y.value = height;
      o.value = 1;
      fo.value = 0;
    } else if (localState === "maximized") {
      y.value = floatingPlayerHeight;
      o.value = 0;
      fo.value = 1;
    } else if (localState === "closed") {
      TrackPlayer.reset();
      y.value = height + floatingPlayerHeight;
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
        if (e.absoluteY > height - floatingPlayerHeight!) {
        }
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
      if (
        (localState === "minimized" && e.velocityY > 1000) ||
        (localState === "minimized" &&
          e.absoluteY > height - floatingPlayerHeight! / 2)
      ) {
        setlocalState("closed");
      } else if (e.velocityY < -1000) {
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

  return (
    <>
      <Animated.View
        style={[animatedPlayerStyle]}
        className="h-full w-full absolute bottom-0 left-0"
      >
        <GestureDetector gesture={maximiseHandler}>
          <Animated.View
            className="w-full h-full -top-20 relative"
            style={{ backgroundColor: colors.elevation.level1 }}
          >
            <FAB
              icon="search"
              style={{
                position: "absolute",
                right: 16,
                top: -(bottom + 56),
              }}
              onPress={() => router.push("search")}
            />
            <TouchableRipple borderless onPress={handleTap} className="z-10">
              <Animated.View
                className="h-20"
                style={[floatingOpacity, { paddingBottom: bottom }]}
              >
                <FloatingPlayer track={track} />
              </Animated.View>
            </TouchableRipple>
            <Animated.View
              className="h-full flex-1 items-center justify-center absolute"
              style={[fullOpacity, { paddingBottom: bottom }]}
            >
              <FullPlayer track={track} />
            </Animated.View>
            <Queue />
          </Animated.View>
        </GestureDetector>
      </Animated.View>
    </>
  );
}
