import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { RepeatMode } from "react-native-track-player";

export type ThemesProps = "system" | "light" | "dark" | "dynamic" | "pureBlack";
export type ThemeProps = {
  label: string;
  value: string;
  icon: string;
};

export const themes: ThemeProps[] = [
  {
    label: "System",
    value: "system",
    icon: "color-wand",
  },
  {
    label: "Light",
    value: "light",
    icon: "sunny",
  },
  {
    label: "Dark",
    value: "dark",
    icon: "cloudy-night",
  },
  {
    label: "Dynamic",
    value: "dynamic",
    icon: "color-wand",
  },
  {
    label: "Pure Black",
    value: "pureBlack",
    icon: "moon",
  },
];

export type ImageCacheProps = "128mb" | "256mb";
export type SongCacheProps = "512mb" | "1gb";

export type AppearanceProps = {
  theme: ThemeProps;
};
export type PlayerProps = {
  resumePlayback: boolean;
  repeatMode: RepeatMode;
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
  player: PlayerProps;
  storage: StorageProps;
  others: OthersProps;
}

const initialState: SettingsProps = {
  appearance: {
    theme: themes[0],
  },
  player: {
    resumePlayback: false,
    repeatMode: RepeatMode.Queue,
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
};

export const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setappearance: (
      { appearance },
      { payload }: PayloadAction<AppearanceProps>,
    ) => {
      appearance.theme = payload.theme;
    },
    setplayer: ({ player }, { payload }: PayloadAction<PlayerProps>) => {
      player.repeatMode = payload.repeatMode;
      player.resumePlayback = payload.resumePlayback;
    },
    setstorage: ({ storage }, { payload }: PayloadAction<StorageProps>) => {
      storage.searchHistory = payload.searchHistory;
      storage.imageCache = payload.imageCache;
      storage.songCache = payload.songCache;
    },
    setothers: ({ others }, { payload }: PayloadAction<OthersProps>) => {
      others.battery = payload.battery;
    },
  },
});

export const { setappearance, setplayer, setstorage, setothers } =
  settingsSlice.actions;

export default settingsSlice.reducer;
