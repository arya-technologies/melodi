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
    setQueue: ({ queue }, { payload }: PayloadAction<QueueState>) => {
      queue = payload;
    },
    setActiveTrack: (
      { activeTrack },
      { payload }: PayloadAction<ActiveTrackState>,
    ) => {
      activeTrack = payload;
    },
    setArtworkColors: (
      { artworkColors },
      { payload }: PayloadAction<ImageColorsResult>,
    ) => {
      artworkColors = payload;
    },
  },
});

export const { setQueue, setActiveTrack, setArtworkColors } =
  queueSlice.actions;

export default queueSlice.reducer;
