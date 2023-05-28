import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  isButtonVisible: false,
};

const buttonSlice = createSlice({
  name: "button",
  initialState,
  reducers: {
    showButton: (state) => {
      state.isButtonVisible = true;
    },
    hideButton: (state) => {
      state.isButtonVisible = false;
    },
  },
});

export const { showButton, hideButton } = buttonSlice.actions;
export default buttonSlice.reducer;
