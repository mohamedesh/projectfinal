import {
  postRequest,
  getRequest,
  deleteRequest,
  updateRequest,
} from "../../api/create.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getItem } from "../../utilitaire/storage.utilitaire";
import {
  sortArrayById,
  sortArrayByCategorieId,
} from "../../utilitaire/sort.utilitaire";
import categorie from "../../components/Categorie/Categorie";

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
    console.log(data);

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
    console.log(data);
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
    console.log(data);
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
    console.log(data);
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
    const { title, url, description, id, share } = ressource;
    console.log(id);
    const token = getItem("token");
    const { status, data, error } = await updateRequest(
      `ressource/update/${id}`,
      { title, url, description, share },
      token
    );
    console.log(data);
    return error
      ? rejectWithValue(
          `Cannot update Ressource - Error Status ${status} - ${error}`
        )
      : fulfillWithValue(data.ressource);
  }
);

// export const getCategorieWithRessource = createAsyncThunk(
//   "categorie/displayWithRessource",
//   async (userId, thunkApi) => {
//     const{ fulfillWithValue, rejectWithValue } = thunkApi;
//     const token = getItem("token");
//     const{ status, data, error } = await getRequest(
//       `categorie/displayWithRessource/${userId}`,
//       token
//     );
//     return error
//       ? rejectWithValue(
//           `Cannot display Categorie - Error Status ${status} - ${error}`
//         )
//       : fulfillWithValue(data);
//   }
// );

const bodyRessource = {
  title: "",
  url: "",
  description: "",
};
export const ressourceSlice = createSlice({
  name: "ressources",
  initialState: {
    // les states
    title: "",
    url: "",
    description: "",
    loading: false,
    ressources: [],
    ressourcesByUserId: [],
    shareRessources: [],
  },
  // ici c'est les actions,ce qui va etre le setter du state
  reducers: {
    newState: (state, action) => {
      return { ...state, [action.payload.key]: action.payload.value };
    },
    addRessource: (state, action) => {
      console.log(action);
      return { ...state, ressources: [...action.payload] };
    },
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
        // contient mon nouveau post
        console.log(action.payload);
        // recup les anciennes données et rajoute les nouvelles
        return {
          ...state,
          loading: false,
          ressourcesByUserId: [
            ...state.ressourcesByUserId,
            action.payload.ressource,
          ],
        };
      })
      .addCase(getRessourceByUserId.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          ressourcesByUserId: action.payload,
        };
      })
      .addCase(deleteRessource.fulfilled, (state, action) => {
        console.log(action.payload);
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
      .addCase(getDiscoveryRessources.fulfilled, (state, action) => {
        console.log(action.payload);
        return {
          ...state,
          loading: false,
          shareRessources: action.payload.ressource,
        };
      });
    // .addCase(getCategorieWithRessource.fulfilled, (state, action) => {
    //   console.log(action.payload);
    //   return {
    //     ...state,
    //     categoriesRessourcesByUser: action.payload.categorie,
    //   };
    // });
  },
});

export const { newState, addRessource, categoryChange } =
  ressourceSlice.actions;
export default ressourceSlice.reducer;
