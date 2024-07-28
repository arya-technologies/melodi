import { RootState } from "@/app/store";
import ScrollView from "@/components/ScrollView";
import React, { useEffect, useState } from "react";
import { Button, Dialog, List, Portal, RadioButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import {
  setstorage,
  ImageCacheProps,
  SongCacheProps,
} from "@/features/slices/settingsSlice";

export default function Storage() {
  const dispatch = useDispatch();
  const { storage } = useSelector((state: RootState) => state.settings);

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

  return (
    <ScrollView>
      <List.Section>
        <List.Subheader>IMAGE CACHE</List.Subheader>
        <List.Item title="Max Size" onPress={showImageCacheDialog} />
        <Portal>
          <Dialog
            visible={isImageCacheDialogVisible}
            onDismiss={hideImageCacheDialog}
          >
            <Dialog.Title>Max Cache</Dialog.Title>
            <Dialog.Content>
              <RadioButton.Item
                label="128MB"
                value="128mb"
                status={imageCache === "128mb" ? "checked" : "unchecked"}
                onPress={() => setimageCache("128mb")}
              />
              <RadioButton.Item
                label="256MB"
                value="256mb"
                status={imageCache === "256mb" ? "checked" : "unchecked"}
                onPress={() => setimageCache("256mb")}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideImageCacheDialog}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </List.Section>

      <List.Section>
        <List.Subheader>SONG CACHE</List.Subheader>
        <List.Item title="Max Size" onPress={showSongCacheDialog} />
        <Portal>
          <Dialog
            visible={isSongCacheDialogVisible}
            onDismiss={hideSongCacheDialog}
          >
            <Dialog.Title>Max Cache</Dialog.Title>
            <Dialog.Content>
              <RadioButton.Item
                label="512MB"
                value="512mb"
                status={songCache === "512mb" ? "checked" : "unchecked"}
                onPress={() => setsongCache("512mb")}
              />
              <RadioButton.Item
                label="1GB"
                value="1gb"
                status={songCache === "1gb" ? "checked" : "unchecked"}
                onPress={() => setsongCache("1gb")}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideSongCacheDialog}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </List.Section>

      <List.Section>
        <List.Subheader>BACKUP</List.Subheader>
        <List.Item
          title="Backup"
          description="Export the data to external storage"
        />
      </List.Section>

      <List.Section>
        <List.Subheader>RESTORE</List.Subheader>
        <List.Item
          title="Restore"
          description="Backup the database from external storage"
        />
      </List.Section>

      <List.Section>
        <List.Subheader>RESET</List.Subheader>
        <List.Item title="Reset all" description="Delete all app data" />
      </List.Section>
    </ScrollView>
  );
}
