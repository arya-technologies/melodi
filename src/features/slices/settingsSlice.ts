import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

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
};
export type ControlsProps = {
  player: {
    resumePlayback: boolean;
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
  },
  controls: {
    player: {
      resumePlayback: false,
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
    setappearance: (state, { payload }: PayloadAction<AppearanceProps>) => {
      state.appearance = {
        colors: {
          theme: payload.colors.theme,
        },
        typography: {
          useSystemFont: payload.typography.useSystemFont,
        },
      };
    },
    setPlayerHeight: (state, { payload }) => {
      state.appearance.playerHeight = payload;
    },
    setcontrols: (state, { payload }: PayloadAction<ControlsProps>) => {
      state.controls = {
        player: {
          resumePlayback: payload.player.resumePlayback,
        },
      };
    },
    setstorage: (state, { payload }: PayloadAction<StorageProps>) => {
      state.storage = {
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
    setothers: (state, { payload }: PayloadAction<OthersProps>) => {
      state.others = {
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
} = settingsSlice.actions;

export default settingsSlice.reducer;
