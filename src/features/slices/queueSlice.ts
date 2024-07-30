import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ImageColorsResult } from "react-native-image-colors/lib/typescript/types";
import { Track } from "react-native-track-player";

export interface QueueState {
  queue?: Track[];
  activeTrack?: number;
  activeTrackPosition?: number;
  artworkColors?: ImageColorsResult | undefined;
}

const initialState: QueueState = {
  queue: [],
  activeTrack: undefined,
  activeTrackPosition: undefined,
  artworkColors: undefined,
};

export const queueSlice = createSlice({
  name: "queue",
  initialState,
  reducers: {
    setQueue: ({ queue }, { payload }: PayloadAction<QueueState>) => {
      queue = payload.queue;
      console.log(payload);
    },
    setActiveTrack: (
      { activeTrack, activeTrackPosition },
      { payload }: PayloadAction<QueueState>,
    ) => {
      activeTrack = payload.activeTrack;
      activeTrackPosition = payload.activeTrackPosition;
      console.log(activeTrack, activeTrackPosition);

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
