import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ImageColorsResult } from "react-native-image-colors/lib/typescript/types";
import { Track } from "react-native-track-player";

type QueueState = Track[];
type ActiveTrackState = {
  index: number;
  position: number;
};
type ArtworkColorsState = ImageColorsResult;

export interface QueueSliceState {
  queue?: Track[];
  activeTrack?: ActiveTrackState;
  artworkColors?: ArtworkColorsState;
}

const initialState: QueueSliceState = {
  queue: undefined,
  activeTrack: undefined,
  artworkColors: undefined,
};

export const queueSlice = createSlice({
  name: "queue",
  initialState,
  reducers: {
    setQueue: (
      { queue, activeTrack },
      { payload }: PayloadAction<QueueState>,
    ) => {
      queue = payload;
      console.log("setQueue", queue, activeTrack);
    },
    setActiveTrack: (
      { activeTrack, queue },
      { payload }: PayloadAction<ActiveTrackState>,
    ) => {
      activeTrack = {
        index: payload.index,
        position: payload.position,
      };
      console.log("setActiveTrack", queue, activeTrack);

      //   let colors = payload.artworkColors;
      //   if (colors?.platform === "ios") {
      //     artworkColors = {
      //       dominant: colors.background,
      //       vibrant: colors.primary,
      //       average: colors.detail,
      //       darkVibrant: colors.secondary,
      //       lightMuted: colors.background,
      //     };
      //   } else if (colors?.platform === "android" || colors?.platform === "web") {
      //     artworkColors = colors;
      //   }
    },
    setArtworkColors: (
      { artworkColors },
      { payload }: PayloadAction<ImageColorsResult>,
    ) => {
      if (payload?.platform === "ios") {
        artworkColors = {
          dominant: payload.background,
          vibrant: payload.primary,
          average: payload.detail,
          darkVibrant: payload.secondary,
          lightMuted: payload.background,
        };
      } else if (
        payload?.platform === "android" ||
        payload?.platform === "web"
      ) {
        artworkColors = payload;
      }
    },
  },
});

export const { setQueue, setActiveTrack, setArtworkColors } =
  queueSlice.actions;

export default queueSlice.reducer;
