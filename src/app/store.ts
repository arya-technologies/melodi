import settingsSlice from "@/features/slices/settingsSlice";
import queueSlice from "@/features/slices/queueSlice";
import favSlice from "@/features/slices/favSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import hardSet from "redux-persist/es/stateReconciler/hardSet";

const settingsConfig = {
  key: "settings",
  storage: AsyncStorage,
  // stateReconciler: hardSet,
};

const queueConfig = {
  key: "queue",
  storage: AsyncStorage,
  // stateReconciler: hardSet,
};

const favConfig = {
  key: "favourites",
  storage: AsyncStorage,
  // stateReconciler: hardSet,
};

const rootReducer = combineReducers({
  settings: persistReducer(settingsConfig, settingsSlice),
  queue: persistReducer(queueConfig, queueSlice),
  favourites: persistReducer(favConfig, favSlice),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
