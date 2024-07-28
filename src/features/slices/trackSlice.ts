import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { ImageColorsResult } from "react-native-image-colors/lib/typescript/types";
import { Track } from "react-native-track-player";

export interface TrackState {
  activeTrack: Track | undefined;
  activeTrackPosition: number | undefined;
  artworkColors: ImageColorsResult | undefined;
}

const initialState: TrackState = {
  activeTrack: undefined,
  activeTrackPosition: undefined,
  artworkColors: undefined,
};

export const trackSlice = createSlice({
  name: "track",
  initialState,
  reducers: {
    setActiveTrack: (state, actions: PayloadAction<TrackState>) => {
      state.activeTrack = actions.payload.activeTrack;
      state.activeTrackPosition = actions.payload.activeTrackPosition;

      let colors = actions.payload.artworkColors;
      if (colors?.platform === "ios") {
        state.artworkColors = {
          dominant: colors.background,
          vibrant: colors.primary,
          average: colors.detail,
          darkVibrant: colors.secondary,
          lightMuted: colors.background,
        };
      } else if (colors?.platform === "android" || colors?.platform === "web") {
        state.artworkColors = colors;
      }
    },
  },
});

export const { setActiveTrack } = trackSlice.actions;

export default trackSlice.reducer;
