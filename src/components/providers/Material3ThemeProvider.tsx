import { RootState } from "@/features/store";
import { setArtworkColors } from "@/features/slices/queueSlice";
import {
  Material3Scheme,
  Material3Theme,
  useMaterial3Theme,
} from "@pchmn/expo-material3-theme";
import { createContext, useContext, useEffect, useState } from "react";
import { Appearance, useColorScheme } from "react-native";
import ImageColors from "react-native-image-colors";
import { ImageColorsResult } from "react-native-image-colors/lib/typescript/types";
import {
  MD3DarkTheme,
  MD3LightTheme,
  MD3Theme,
  Provider as PaperProvider,
  ProviderProps,
  useTheme,
} from "react-native-paper";
import { Track, useActiveTrack } from "react-native-track-player";
import { useDispatch, useSelector } from "react-redux";

type Material3ThemeProviderProps = {
  theme: Material3Theme;
  updateTheme: (sourceColor: string) => void;
  resetTheme: () => void;
};

const Material3ThemeProviderContext =
  createContext<Material3ThemeProviderProps>({} as Material3ThemeProviderProps);

export function Material3ThemeProvider({
  children,
  ...otherProps
}: ProviderProps & { sourceColor?: string; fallbackSourceColor?: string }) {
  const colorScheme = useColorScheme();
  const dispatch = useDispatch();
  const track: Track | undefined = useActiveTrack();

  const { artworkColors } = useSelector((state: RootState) => state.queue);
  const themeMode = useSelector(
    (state: RootState) => state.settings.appearance.theme,
  );
  const [sourceColor, setsourceColor] = useState<any>("#0f0");

  const { theme, updateTheme, resetTheme } = useMaterial3Theme();

  const pureBlackThemeColors: Material3Scheme = {
    ...theme.dark,
    background: "#000",
    surface: "#000",
    elevation: {
      ...theme.dark.elevation,
      level0: "#00000000",
      level1: "#0a0a0a",
      level2: "#0f0f0f",
      level3: "#121212",
      level4: "#171717",
      level5: "#212121",
    },
    backdrop: "#000000CC",
  };

  const setColors = (colors: ImageColorsResult) => {
    if (colors.platform === "ios") {
      setsourceColor(colors.detail);
    } else {
      setsourceColor(colors.average);
    }
  };

  const getImageColor = async (track: Track | undefined) => {
    ImageColors.getColors(track?.artwork!, {
      fallback: "#ff0",
      cache: true,
      key: track?.id,
      quality: "highest",
    }).then((colors: ImageColorsResult) => {
      setColors(colors);
      dispatch(setArtworkColors(colors));
    });
  };

  useEffect(() => {
    if (artworkColors) {
      setColors(artworkColors);
    }
  }, []);

  useEffect(() => {
    getImageColor(track);
  }, [track]);

  useEffect(() => {
    console.log(themeMode);
    if (themeMode.value === "system") {
      Appearance.setColorScheme(null);
      resetTheme();
    } else if (themeMode.value === "light") {
      Appearance.setColorScheme("light");
    } else if (themeMode.value === "dark") {
      Appearance.setColorScheme("dark");
    } else if (themeMode.value === "dynamic") {
      updateTheme(sourceColor);
    } else if (themeMode.value === "pureBlack") {
      Appearance.setColorScheme("dark");
      resetTheme();
    }
  }, [themeMode, sourceColor]);

  const paperTheme =
    colorScheme === "dark"
      ? {
          ...MD3DarkTheme,
          colors:
            themeMode.value === "pureBlack" ? pureBlackThemeColors : theme.dark,
        }
      : { ...MD3LightTheme, colors: theme.light };

  return (
    <Material3ThemeProviderContext.Provider
      value={{ theme, updateTheme, resetTheme }}
    >
      <PaperProvider theme={paperTheme} {...otherProps}>
        {children}
      </PaperProvider>
    </Material3ThemeProviderContext.Provider>
  );
}

export function useMaterial3ThemeContext() {
  const ctx = useContext(Material3ThemeProviderContext);
  if (!ctx) {
    throw new Error(
      "useMaterial3ThemeContext must be used inside Material3ThemeProvider",
    );
  }
  return ctx;
}

export const useAppTheme = useTheme<MD3Theme & { colors: Material3Scheme }>;
