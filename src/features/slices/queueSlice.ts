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
  activeQueue?: {
    queue?: Track[];
  };
  activeTrack?: ActiveTrackState;
  artworkColors?: ArtworkColorsState;
}

const initialState: QueueSliceState = {
  activeQueue: undefined,
  activeTrack: undefined,
  artworkColors: undefined,
};

export const queueSlice = createSlice({
  name: "queue",
  initialState,
  reducers: {
    setQueue: ({ activeQueue }, { payload }: PayloadAction<QueueState>) => {
      activeQueue = {
        queue: payload,
      };
    },
    setActiveTrack: (
      { activeTrack },
      { payload }: PayloadAction<ActiveTrackState>,
    ) => {
      activeTrack = {
        index: payload.index,
        position: payload.position,
      };
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
