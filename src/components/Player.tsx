import { RootState } from "@/app/store";
import FloatingPlayer from "@/components/FloatingPlayer";
import FullPlayer from "@/components/FullPlayer";
import { setActiveTrack } from "@/features/slices/trackSlice";
import React, { useEffect, useState } from "react";
import { Dimensions, Linking, Pressable, View } from "react-native";
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
} from "react-native-track-player";
import { useDispatch, useSelector } from "react-redux";
import { addTrack, setupPlayer } from "rntp-service";
import { useAppTheme } from "./providers/Material3ThemeProvider";
import { useRouter } from "expo-router";

type localStateProps = "minimized" | "maximized" | "closed";

export default function Player() {
  const router = useRouter();

  Linking.addEventListener("url", ({ url }) => {
    if (url === "trackplayer://notification.click") {
      router.canDismiss();
      setlocalState("maximized");
    }
  });

  const { height } = Dimensions.get("screen");
  const { bottom } = useSafeAreaInsets();
  const dispatch = useDispatch();
  const { colors } = useAppTheme();
  const track: Track | undefined = useActiveTrack();

  const { activeTrack } = useSelector((state: RootState) => state.track);
  const { floatingPlayerHeight } = useSelector(
    (state: RootState) => state.settings.appearance,
  );

  const [localState, setlocalState] = useState<localStateProps>(
    track ? "minimized" : "closed",
  );

  // TrackPlayer.addEventListener(
  //   Event.PlaybackProgressUpdated,
  //   ({ track, position }) => {
  //     console.log(track, position);
  //     // dispatch(
  //     //   setActiveTrack({ activeTrack: track, activeTrackPosition: position }),
  //     // );
  //   },
  // );

  TrackPlayer.addEventListener(Event.PlaybackState, ({ state }) => {
    if (state === "playing" && localState === "closed") {
      y.value = height - bottom;
      o.value = 1;
      setlocalState("minimized");
    } else if (state === "stopped") {
      y.value = height + floatingPlayerHeight! + bottom;
      o.value = 0;
    }
  });

  TrackPlayer.addEventListener(
    Event.PlaybackActiveTrackChanged,
    ({ track }) => {
      dispatch(setActiveTrack({ activeTrack: track }));
    },
  );

  async function setup() {
    let isSetup = await setupPlayer();
    if (isSetup && activeTrack) {
      await TrackPlayer.add(activeTrack);
    } else {
      await addTrack();
    }
  }

  useEffect(() => {
    setup();
  }, []);

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

  // const handleTap = () => {
  //   if (localState === "minimized") {
  //     setlocalState("maximized");
  //   }
  // };

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

  const handleTap = Gesture.Tap()
    .onEnd(() => {
      if (localState === "minimized") {
        setlocalState("maximized");
      }
    })
    .runOnJS(true);

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
          <GestureDetector gesture={handleTap}>
            <Animated.View className="h-20" style={[floatingOpacity]}>
              <FloatingPlayer track={track} />
            </Animated.View>
          </GestureDetector>
          <Animated.View
            style={[fullOpacity]}
            className="h-full flex-1 items-center justify-center absolute"
          >
            <FullPlayer track={track} />
          </Animated.View>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}
