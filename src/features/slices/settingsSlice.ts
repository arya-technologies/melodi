import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
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
      appearance.colors.theme = payload.colors.theme;
      appearance.typography.useSystemFont = payload.typography.useSystemFont;
    },
    setPlayerHeight: ({ appearance }, { payload }) => {
      appearance.playerHeight = payload;
    },
    setFloatingPlayerPosition: ({ appearance }, { payload }) => {
      appearance.floatingPlayerPosition = payload;
    },
    setcontrols: ({ controls }, { payload }: PayloadAction<ControlsProps>) => {
      controls.player.resumePlayback = payload.player.resumePlayback;
      controls.player.repeatMode = payload.player.repeatMode;
    },
    setstorage: ({ storage }, { payload }: PayloadAction<StorageProps>) => {
      storage = {
        searchHistory: {
          isEnabled: payload.searchHistory.isEnabled,
          data: payload.searchHistory.data,
        },
        imageCache: {
          maxSize: payload.imageCache.maxSize,
        },
        songCache: {
          maxSize: payload.songCache.maxSize,
        },
      };
    },
    setothers: ({ others }, { payload }: PayloadAction<OthersProps>) => {
      others = {
        battery: {
          optimizationDisabled: payload.battery.optimizationDisabled,
        },
      };
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
