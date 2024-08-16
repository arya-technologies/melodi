import ScrollView from "@/components/ScrollView";
import {
  ImageCacheProps,
  SongCacheProps,
  ThemeProps,
  setappearance,
  setothers,
  setplayer,
  setstorage,
  themes,
} from "@/features/slices/settingsSlice";
import React, { useEffect, useState } from "react";
import { Button, List, Menu, Switch } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../features/store";
import * as Linking from "expo-linking";

export default function Appearance() {
  const dispatch = useDispatch();
  const { appearance, player, storage, others } = useSelector(
    (state: RootState) => state.settings,
  );

  const [theme, settheme] = useState<ThemeProps>(appearance.theme);
  const [isThemeMenuVisible, setisThemeMenuVisible] = useState(false);
  const showThemeMenu = () => setisThemeMenuVisible(true);
  const hideThemeMenu = () => setisThemeMenuVisible(false);

  useEffect(() => {
    dispatch(setappearance({ theme }));
  }, [theme]);

  const [resumePlayback, setresumePlayback] = useState<boolean>(
    player.resumePlayback,
  );
  const toggleResumePlayback = () => setresumePlayback((prev) => !prev);

  useEffect(() => {
    dispatch(
      setplayer({
        ...player,
        resumePlayback,
      }),
    );
  }, [resumePlayback]);

  const [imageCache, setimageCache] = useState<ImageCacheProps>(
    storage.imageCache.maxSize,
  );
  const [isImageCacheDialogVisible, setisImageCacheDialogVisible] =
    useState(false);
  const showImageCacheDialog = () => setisImageCacheDialogVisible(true);
  const hideImageCacheDialog = () => setisImageCacheDialogVisible(false);

  const [songCache, setsongCache] = useState<SongCacheProps>(
    storage.songCache.maxSize,
  );
  const [isSongCacheDialogVisible, setisSongCacheDialogVisible] =
    useState(false);
  const showSongCacheDialog = () => setisSongCacheDialogVisible(true);
  const hideSongCacheDialog = () => setisSongCacheDialogVisible(false);

  useEffect(() => {
    dispatch(
      setstorage({
        searchHistory: {
          isEnabled: storage.searchHistory.isEnabled,
          data: storage.searchHistory.data,
        },
        imageCache: {
          maxSize: imageCache,
        },
        songCache: {
          maxSize: songCache,
        },
      }),
    );
  }, [imageCache, songCache]);

  const [isBatteryOptimizationDisabled, setisBatteryOptimizationDisabled] =
    useState<boolean>(others.battery.optimizationDisabled);

  useEffect(() => {
    dispatch(
      setothers({
        battery: {
          optimizationDisabled: isBatteryOptimizationDisabled,
        },
      }),
    );
  }, [isBatteryOptimizationDisabled]);

  return (
    <>
      <ScrollView>
        <List.Section>
          <List.Subheader>Appearance</List.Subheader>
          <List.Item
            title="Theme"
            right={() => (
              <Menu
                visible={isThemeMenuVisible}
                onDismiss={hideThemeMenu}
                anchor={
                  <Button
                    onPress={showThemeMenu}
                    icon="chevron-expand"
                    mode="elevated"
                  >
                    {theme.label}
                  </Button>
                }
              >
                {themes.map((item, index) => (
                  <Menu.Item
                    key={index}
                    title={item.label}
                    onPress={() => {
                      settheme(item);
                      hideThemeMenu;
                    }}
                  />
                ))}
              </Menu>
            )}
          />
        </List.Section>
        <List.Section>
          <List.Subheader>Player</List.Subheader>
          <List.Item
            title="Resume Playback"
            description="When a wired or bluetooth device is connected"
            right={() => (
              <Switch value={resumePlayback} onChange={toggleResumePlayback} />
            )}
          />
          <List.Item
            title="Equalizer"
            description="Interact with the system equalizer"
            onPress={() =>
              Linking.sendIntent("android.media.audiofx.AudioEffect")
            }
          />
        </List.Section>
        <List.Section>
          <List.Subheader>Storage</List.Subheader>
          <List.Item
            title="Image Cache"
            right={() => (
              <Menu
                visible={isImageCacheDialogVisible}
                onDismiss={hideImageCacheDialog}
                anchor={
                  <Button
                    onPress={showImageCacheDialog}
                    icon="chevron-expand"
                    mode="elevated"
                  >
                    {storage.imageCache.maxSize}
                  </Button>
                }
              >
                <Menu.Item
                  title="128mb"
                  onPress={() => {
                    setimageCache("128mb");
                    hideThemeMenu;
                  }}
                />
                <Menu.Item
                  title="256mb"
                  onPress={() => {
                    setimageCache("256mb");
                    hideThemeMenu;
                  }}
                />
              </Menu>
            )}
          />
          <List.Item
            title="Song Cache"
            right={() => (
              <Menu
                visible={isSongCacheDialogVisible}
                onDismiss={hideSongCacheDialog}
                anchor={
                  <Button
                    onPress={showSongCacheDialog}
                    icon="chevron-expand"
                    mode="elevated"
                  >
                    {storage.songCache.maxSize}
                  </Button>
                }
              >
                <Menu.Item
                  title="512mb"
                  onPress={() => {
                    setsongCache("512mb");
                    hideThemeMenu;
                  }}
                />
                <Menu.Item
                  title="1gb"
                  onPress={() => {
                    setsongCache("1gb");
                    hideThemeMenu;
                  }}
                />
              </Menu>
            )}
          />
          <List.Item
            title="Backup"
            description="Export the data to external storage"
          />
          <List.Item
            title="Restore"
            description="Backup the database from external storage"
          />
          <List.Item title="Reset all" description="Delete all app data" />
        </List.Section>
        <List.Section>
          <List.Subheader>SYSTEM</List.Subheader>
          <List.Item
            title="Ignore Battery Optimizations"
            description="Disable background restrictions"
            onPress={() => Linking.openSettings()}
          />
        </List.Section>
      </ScrollView>
    </>
  );
}
