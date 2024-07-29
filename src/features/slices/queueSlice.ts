import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ImageColorsResult } from "react-native-image-colors/lib/typescript/types";
import { Track } from "react-native-track-player";

export interface QueueState {
  queue: Track[];
  activeTrack: Track | undefined;
  activeTrackPosition: number | undefined;
  artworkColors: ImageColorsResult | undefined;
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
    setQueue: (
      { queue, activeTrack, activeTrackPosition, artworkColors },
      { payload }: PayloadAction<QueueState>,
    ) => {
      queue = payload.queue;
      activeTrack = payload.activeTrack;
      activeTrackPosition = payload.activeTrackPosition;

      let colors = payload.artworkColors;
      if (colors?.platform === "ios") {
        artworkColors = {
          dominant: colors.background,
          vibrant: colors.primary,
          average: colors.detail,
          darkVibrant: colors.secondary,
          lightMuted: colors.background,
        };
      } else if (colors?.platform === "android" || colors?.platform === "web") {
        artworkColors = colors;
      }
    },
  },
});

export const { setQueue } = queueSlice.actions;

export default queueSlice.reducer;
