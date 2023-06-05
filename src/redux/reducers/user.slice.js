import {
  postRequest,
  getRequest,
  deleteRequest,
  updateRequest,
} from "../../api/create.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getItem, setItem } from "../../utilitaire/storage.utilitaire";

// recup les data du cote front pour l'envoyer du cote back
export const postUser = createAsyncThunk(
  "users/create",
  async (form, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const { status, data, error } = await postRequest("users/signUp", form);
    console.log(data);
    const token = data.token;
    setItem("token", token);
    return error
      ? rejectWithValue(`Cannot post User - Error Status ${status} - ${error}`)
      : fulfillWithValue(data);
  }
);
export const userSignIn = createAsyncThunk(
  "users/signin",
  async (form, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const { status, data, error } = await postRequest("users/signIn", form);
    const token = data.token;
    setItem("token", token);
    return error
      ? rejectWithValue(`Cannot post User - Error Status ${status} - ${error}`)
      : fulfillWithValue(data);
  }
);

export const getUser = createAsyncThunk(
  "users/display",
  async (_, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const token = getItem("token");
    const { status, data, error } = await getRequest("users/displayAll", token);
    return error
      ? rejectWithValue(`Cannot get User - Error Status ${status} - ${error}`)
      : fulfillWithValue(data);
  }
);

export const deleteUser = createAsyncThunk(
  "users/delete",
  async (userId, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const token = getItem("token");
    const { status, data, error } = await deleteRequest(
      `users/deleteUser/${userId}`,
      token
    );
    console.log(data);
    return error
      ? rejectWithValue(
          `Cannot delete User - Error Status ${status} - ${error}`
        )
      : fulfillWithValue(data.user);
  }
);

export const updateUser = createAsyncThunk(
  "users/update",
  async (user, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const token = getItem("token");
    const { id, password, email } = user;
    const { status, data, error } = await updateRequest(
      `users/update/${id}`,
      { password, email },
      token
    );
    console.log(data);
    return error
      ? rejectWithValue(
          `Cannot update User - Error Status ${status} - ${error}`
        )
      : fulfillWithValue(data.user);
  }
);

const body = {
  surname: "",
  name: "",
  pseudo: "",
  password: "",
  email: "",
};

export const usersSlice = createSlice({
  name: "user",
  initialState: {
    loading: false,
    users: {},
    isLogged: null,
  },
  reducers: {
    // setter
    newState: (state, action) => {
      // action contenu dans le payload
      return { ...state, [action.payload.key]: action.payload.value };
    },
    echapValues: (state, action) => {
      return { ...state, ...body };
    },
    userLogout: (state, action) => {
      return { ...state, isLogged: false };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(postUser.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          users: action.payload.response,
          isLogged: true,
        };
      })
      .addCase(postUser.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(postUser.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          users: action.error,
          isLogged: false,
        };
      })
      .addCase(userSignIn.fulfilled, (state, action) => {
        console.log(action.payload.user);
        return {
          ...state,
          loading: false,
          users: action.payload.user,
          isLogged: true,
        };
      })
      .addCase(userSignIn.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(userSignIn.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          users: action.payload.response,
          isLogged: false,
        };
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        return { ...state, loading: false };
      })
      .addCase(deleteUser.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(deleteUser.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          users: action.payload.response,
          isLogged: false,
        };
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        return { ...state, loading: false };
      })
      .addCase(updateUser.pending, (state, action) => {
        return { ...state, loading: true };
      })
      .addCase(updateUser.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          users: action.payload.response,
          isLogged: false,
        };
      });
  },
});

export const { newState, echapValues, userLogout } = usersSlice.actions;
export default usersSlice.reducer;
