import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Track } from "react-native-track-player";

export type FavMusicsProps = Track[];
export type FavPlaylistsProps = object[];
export type FavArtistsProps = object[];
export type FavAlbumsProps = object[];

export interface FavouritesProps {
  musics: FavMusicsProps;
  playlists: FavPlaylistsProps;
  artists: FavArtistsProps;
  albums: FavAlbumsProps;
}

const initialState: FavouritesProps = {
  musics: [],
  playlists: [],
  artists: [],
  albums: [],
};

export const favSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addFavMusic: ({ musics }, { payload }: PayloadAction<Track>) => {
      musics = musics.concat([payload]);
    },
    removeFavMusic: ({ musics }, { payload }: PayloadAction<Track>) => {
      musics = musics.filter((item) => item.id !== payload.id);
    },
  },
});

export const { addFavMusic, removeFavMusic } = favSlice.actions;

export default favSlice.reducer;
