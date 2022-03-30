import { action, Action, createStore, createTypedHooks } from "easy-peasy";

interface Artist {
  name: string;
  id: number;
}
export interface Song {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  name: string;
  artistId: string;
  duration: string;
  url: string;
  artist: Artist;
  playlists?: string;
}

interface StoreModel {
  activeSong: Song | null;
  activeSongs: Song[];
  changeActiveSongs: Action<StoreModel, Song[]>;
  changeActiveSong: Action<StoreModel, Song | null>;
}
export const store = createStore<StoreModel>({
  activeSongs: [],
  activeSong: null,
  changeActiveSongs: action((state: StoreModel, payload: Song[]) => {
    state.activeSongs = payload;
  }),
  changeActiveSong: action((state: StoreModel, payload: Song | null) => {
    state.activeSong = payload;
  }),
});

const typedHooks = createTypedHooks<StoreModel>();
export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;
