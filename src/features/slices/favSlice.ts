import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";
import { Track } from "react-native-track-player";

export type FavMusicsProps = Track[];
export type FavPlaylistsProps = object[];
export type FavArtistsProps = object[];
export type FavAlbumsProps = object[];

export interface FavouritesProps {
  musics?: FavMusicsProps;
  playlists?: FavPlaylistsProps;
  artists?: FavArtistsProps;
  albums?: FavAlbumsProps;
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
      // musics = [...musics, payload];
      musics = musics?.push(payload);
      console.log("add", musics);
    },
    removeFavMusic: ({ musics }, { payload }: PayloadAction<Track>) => {
      // const index = musics?.indexOf(payload);
      musics = musics?.filter((item) => item.id !== payload.id);
      console.log("remove", musics);
    },
  },
});

export const { addFavMusic, removeFavMusic } = favSlice.actions;

export default favSlice.reducer;
