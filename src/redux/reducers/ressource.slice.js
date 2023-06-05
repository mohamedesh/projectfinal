import {
  postRequest,
  getRequest,
  deleteRequest,
  updateRequest,
} from "../../api/create.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getItem } from "../../utilitaire/storage.utilitaire";
import { sortArrayById } from "../../utilitaire/sort.utilitaire";

export const postRessource = createAsyncThunk(
  "ressource/create",
  async (form, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const token = getItem("token");
    const { status, data, error } = await postRequest(
      "ressource/create",
      form,
      token
    );

    return error
      ? rejectWithValue(
          `Cannot post Ressource - Error Status ${status} - ${error}`
        )
      : fulfillWithValue(data);
  }
);

export const getRessourceByUserId = createAsyncThunk(
  "ressource/displayAll",
  async (userId, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const token = getItem("token");
    const { status, data, error } = await getRequest(
      `ressource/displayAll/${userId}`,
      token
    );
    return error
      ? rejectWithValue(
          `Cannot display Ressource - Error Status ${status} - ${error}`
        )
      : fulfillWithValue(data.ressource);
  }
);

export const getDiscoveryRessources = createAsyncThunk(
  "ressource/displayDiscovery",
  async (shareRessource, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const token = getItem("token");
    const { status, data, error } = await getRequest(
      `ressource/displayDiscovery`,
      token
    );
    return error
      ? rejectWithValue(
          `Cannot display Ressource in discovery - Error Status ${status} - ${error}`
        )
      : fulfillWithValue(data);
  }
);

export const deleteRessource = createAsyncThunk(
  "ressource/delete",
  async (RessourceId, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const token = getItem("token");
    const { status, data, error } = await deleteRequest(
      `ressource/delete/${RessourceId}`,
      token
    );
    return error
      ? rejectWithValue(
          `Cannot delete Ressource - Error Status ${status} - ${error}`
        )
      : fulfillWithValue(data.ressource);
  }
);

export const updateRessource = createAsyncThunk(
  "ressource/update",
  async (ressource, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const { title, url, description, id, shareRessource, categorieId } =
      ressource;
    const token = getItem("token");
    const { status, data, error } = await updateRequest(
      `ressource/update/${id}`,
      { title, url, description, shareRessource, categorieId },
      token
    );
    return error
      ? rejectWithValue(
          `Cannot update Ressource - Error Status ${status} - ${error}`
        )
      : fulfillWithValue(data.ressource);
  }
);

export const ressourceSlice = createSlice({
  name: "ressources",
  initialState: {
    title: "",
    url: "",
    description: "",
    rejectedRessource: "",
    loading: false,
    ressources: [],
    ressourcesByUserId: [],
    shareRessources: [],
  },
  reducers: {
    categoryChange: (state, action) => {
      return {
        ...state,
        ressources: [{ ...state.ressources, categoryId: action.payload }],
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postRessource.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          ressourcesByUserId: [
            ...state.ressourcesByUserId,
            action.payload.ressource,
          ],
        };
      })
      .addCase(postRessource.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(postRessource.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
        };
      })
      .addCase(getRessourceByUserId.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          ressourcesByUserId: action.payload,
        };
      })
      .addCase(getRessourceByUserId.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getRessourceByUserId.rejected, (state, action) => {
        console.log(action.payload);
        return {
          ...state,
          loading: false,
          rejectedRessource: action.payload,
        };
      })
      .addCase(deleteRessource.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          ressourcesByUserId: [
            ...state.ressourcesByUserId.filter(
              (elt) => elt.id !== parseInt(action.payload.id)
            ),
          ],
        };
      })
      .addCase(deleteRessource.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(deleteRessource.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
        };
      })
      .addCase(updateRessource.fulfilled, (state, action) => {
        console.log(action.payload);
        return {
          ...state,
          loading: false,
          ressourcesByUserId: sortArrayById([
            ...state.ressourcesByUserId.filter(
              (elt) => elt.id !== parseInt(action.payload.id)
            ),
            action.payload,
          ]),
        };
      })
      .addCase(updateRessource.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(updateRessource.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
        };
      })

      .addCase(getDiscoveryRessources.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          shareRessources: action.payload.ressource,
        };
      })
      .addCase(getDiscoveryRessources.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getDiscoveryRessources.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
        };
      });
  },
});

export const { categoryChange } = ressourceSlice.actions;
export default ressourceSlice.reducer;
