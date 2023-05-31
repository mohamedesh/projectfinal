import { getRequest } from "../../api/create.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getItem } from "../../utilitaire/storage.utilitaire";

export const getCategorie = createAsyncThunk(
  "categorie/displayAll",
  async (_, thunkApi) => {
    console.log(thunkApi);
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    console.log(fulfillWithValue);
    const token = getItem("token");
    const { status, data, error } = await getRequest(
      `categorie/displayAll`,
      token
    );
    console.log(data);
    return error
      ? rejectWithValue(
          `Cannot display Categorie - Error Status ${status} - ${error}`
        )
      : fulfillWithValue(data);
  }
);

export const categorieSlice = createSlice({
  name: "categories",
  initialState: {
    categoriesRessource: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategorie.fulfilled, (state, action) => {
        console.log(action.payload);
        return { ...state, categoriesRessource: [action.payload] };
      })
      .addCase(getCategorie.rejected, (state, action) => {
        return { ...state, categoriesRessource: [action.payload] };
      });
  },
});

export default categorieSlice.reducer;
