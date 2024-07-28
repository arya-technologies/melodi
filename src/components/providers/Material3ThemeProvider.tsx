import { RootState } from "@/app/store";
import {
  Material3Scheme,
  Material3Theme,
  useMaterial3Theme,
} from "@pchmn/expo-material3-theme";
import { createContext, useContext, useEffect } from "react";
import { useColorScheme } from "react-native";
import ImageColors from "react-native-image-colors";
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
  // sourceColor,
  // fallbackSourceColor,
  ...otherProps
}: ProviderProps & { sourceColor?: string; fallbackSourceColor?: string }) {
  const colorScheme = useColorScheme();

  const { artworkColors } = useSelector((state: RootState) => state.track);
  const { appearance } = useSelector((state: RootState) => state.settings);

  const { theme, updateTheme, resetTheme } = useMaterial3Theme(
    appearance.colors.theme === "dynamic" && artworkColors
      ? {
          sourceColor: artworkColors.average,
          fallbackSourceColor: artworkColors.vibrant,
        }
      : appearance.colors.theme === "pureBlack"
        ? {
            sourceColor: "#000000",
          }
        : {},
  );

  const track: Track | undefined = useActiveTrack();
  const getImageColor = async () => {
    track?.artwork &&
      ImageColors.getColors(track?.artwork, {
        fallback: "#ff0000",
        cache: true,
        key: track?.artwork,
        quality: "highest",
      }).then((res) => {
        updateTheme(res.average);
      });
  };
  useEffect(() => {
    getImageColor();
  }, [track]);

  const paperTheme =
    colorScheme === "dark"
      ? { ...MD3DarkTheme, colors: theme.dark }
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
