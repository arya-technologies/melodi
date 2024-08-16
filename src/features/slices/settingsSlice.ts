import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { appendBaseUrl } from "expo-router/build/fork/getPathFromState";
import { RepeatMode } from "react-native-track-player";

export type ThemeProps = "system" | "dynamic" | "pureBlack";
export type ImageCacheProps = "128mb" | "256mb";
export type SongCacheProps = "512mb" | "1gb";

export type AppearanceProps = {
  colors: {
    theme: ThemeProps;
  };
  typography: {
    useSystemFont: boolean;
  };
  playerHeight?: number;
  floatingPlayerHeight?: number;
  floatingPlayerPosition?: number;
};
export type ControlsProps = {
  player: {
    resumePlayback?: boolean;
    repeatMode?: RepeatMode;
  };
};
export type StorageProps = {
  searchHistory: {
    isEnabled: boolean;
    data: string[];
  };
  imageCache: {
    maxSize: ImageCacheProps;
  };
  songCache: {
    maxSize: SongCacheProps;
  };
};
export type OthersProps = {
  battery: {
    optimizationDisabled: boolean;
  };
};

export interface SettingsProps {
  appearance: AppearanceProps;
  controls: ControlsProps;
  storage: StorageProps;
  others: OthersProps;
  info: {};
}

const initialState: SettingsProps = {
  appearance: {
    colors: {
      theme: "dynamic",
    },
    typography: {
      useSystemFont: false,
    },
    playerHeight: 0,
    floatingPlayerHeight: 80,
    floatingPlayerPosition: 0,
  },
  controls: {
    player: {
      resumePlayback: false,
      repeatMode: RepeatMode.Queue,
    },
  },
  storage: {
    searchHistory: {
      isEnabled: true,
      data: [],
    },
    imageCache: {
      maxSize: "128mb",
    },
    songCache: {
      maxSize: "512mb",
    },
  },
  others: {
    battery: {
      optimizationDisabled: false,
    },
  },
  info: {},
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setappearance: (
      { appearance },
      { payload }: PayloadAction<AppearanceProps>,
    ) => {
      appearance = payload;
    },
    setPlayerHeight: ({ appearance }, { payload }) => {
      appearance.playerHeight = payload;
    },
    setFloatingPlayerPosition: ({ appearance }, { payload }) => {
      appearance.floatingPlayerPosition = payload;
    },
    setcontrols: ({ controls }, { payload }: PayloadAction<ControlsProps>) => {
      controls = payload;
    },
    setstorage: ({ storage }, { payload }: PayloadAction<StorageProps>) => {
      storage = payload;
    },
    setothers: ({ others }, { payload }: PayloadAction<OthersProps>) => {
      others = payload;
    },
  },
});

export const {
  setappearance,
  setcontrols,
  setstorage,
  setothers,
  setPlayerHeight,
  setFloatingPlayerPosition,
} = settingsSlice.actions;

export default settingsSlice.reducer;
