import { getRequest } from "../../api/create.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getItem } from "../../utilitaire/storage.utilitaire";

export const getCategorie = createAsyncThunk(
  "categorie/displayAll",
  async (_, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const token = getItem("token");
    const { status, data, error } = await getRequest(
      `categorie/displayAll`,
      token
    );
    return error
      ? rejectWithValue(
          `Cannot display Categorie - Error Status ${status} - ${error}`
        )
      : fulfillWithValue(data);
  }
);

export const getRessourceByCategorieId = createAsyncThunk(
  "ressource/categorie",
  async (id, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const token = getItem("token");
    const { status, data, error } = await getRequest(
      `ressource/categorie/${id}`,
      token
    );
    return error
      ? rejectWithValue(
          `Cannot display Ressource By Categorie - Error Status ${status} - ${error}`
        )
      : fulfillWithValue(data);
  }
);

export const categorieSlice = createSlice({
  name: "categories",
  initialState: {
    loading: false,
    categoriesRessource: [],
    selectedCategorie: {},
    ressourcesByCategorie: [],
  },
  reducers: {
    selectCategorie: (state, action) => {
      console.log(action.payload);
      return { ...state, selectedCategorie: action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategorie.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          categoriesRessource: action.payload.categorie,
        };
      })
      .addCase(getCategorie.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(getCategorie.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          ressourcesByCategorie: [action.payload],
        };
      })
      .addCase(getRessourceByCategorieId.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          ressourcesByCategorie: action.payload.ressource,
        };
      })
      .addCase(getRessourceByCategorieId.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(getRessourceByCategorieId.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          ressourcesByCategorie: [action.payload],
        };
      });
  },
});

export const { selectCategorie } = categorieSlice.actions;
export default categorieSlice.reducer;
