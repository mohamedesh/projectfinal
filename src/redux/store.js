import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./reducers/user.slice";
import ressourceSlice from "./reducers/ressource.slice";
import noteSlice from "./reducers/note.slice";
import buttonSlice from "./reducers/button.slice";
import categorieSlice from "./reducers/categorie.slice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

export const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, usersSlice);
export const store = configureStore({
  reducer: {
    persistedReducer,
    ressource: ressourceSlice,
    note: noteSlice,
    button: buttonSlice,
    categories: categorieSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
export const persistor = persistStore(store);
