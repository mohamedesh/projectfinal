import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./reducers/user.slice";
import ressourceSlice from "./reducers/ressource.slice";
import noteSlice from "./reducers/note.slice";
import buttonSlice from "./reducers/button.slice";

export const store = configureStore({
  reducer: {
    user: usersSlice,
    ressource: ressourceSlice,
    note: noteSlice,
    button: buttonSlice,
  },
});
