import {
  postRequest,
  getRequest,
  deleteRequest,
  updateRequest,
} from "../../api/create.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getItem } from "../../utilitaire/storage.utilitaire";
import { SortArrayById } from "../../utilitaire/sort.utilitaire";

export const postNote = createAsyncThunk(
  "note/create",
  async (form, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const token = getItem("token");
    const { status, data, error } = await postRequest(
      `note/createNote`,
      form,
      token
    );
    console.log(data);
    return error
      ? rejectWithValue(`Cannot post Note - Error Status ${status} - ${error}`)
      : fulfillWithValue(data);
  }
);

export const getNotes = createAsyncThunk(
  "note/displayNotes",
  async (userId, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const token = getItem("token");
    const { status, data, error } = await getRequest(
      `note/displayNotes/${userId}`,
      token
    );
    console.log(data.note);
    return error
      ? rejectWithValue(
          `Cannot display Note - Error Status ${status} - ${error}`
        )
      : fulfillWithValue(data.note);
  }
);

export const deleteNote = createAsyncThunk(
  "note/delete",
  async (noteId, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const token = getItem("token");
    const { status, data, error } = await deleteRequest(
      `note/deleteNote/${noteId}`,
      token
    );
    console.log(data.note);
    return error
      ? rejectWithValue(
          `Cannot delete note - Error Status ${status} - ${error}`
        )
      : fulfillWithValue(data.note);
  }
);

export const updateNote = createAsyncThunk(
  "note/update",
  async (note, thunkApi) => {
    const { fulfillWithValue, rejectWithValue } = thunkApi;
    const { title, description, contain, id } = note;
    const token = getItem("token");
    const { status, data, error } = await updateRequest(
      `note/updateNote/${id}`,
      { title, description, contain },
      token
    );
    console.log(data);
    return error
      ? rejectWithValue(
          `Cannot update Note - Error Status ${status} - ${error}`
        )
      : fulfillWithValue(data.note);
  }
);

const bodyNote = {
  title: "",
  description: "",
  contain: "",
};

export const noteSlice = createSlice({
  name: "note",
  initialState: {
    title: "",
    description: "",
    contain: "",
    loading: false,
    notes: [],
  },
  reducers: {
    newState: (state, action) => {
      return { ...state, [action.payload.key]: action.payload.value };
    },
    addNote: (state, action) => {
      //setter qui permet d'avoir une copie du tableau
      return { ...state, notes: [...action.payload] };
    },
  },
  extraReducers: (builder) => {
    builder
      // fulfilled = data rep du serveur
      .addCase(postNote.fulfilled, (state, action) => {
        // action = propriété de fulfillWithValue
        console.log(action.payload);
        //
        return {
          ...state,
          loading: false,
          notes: [...state.notes, action.payload.note],
        };
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        return { ...state, loading: false, notes: [...action.payload] };
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          ...state,
          notes: SortArrayById([
            ...state.notes.filter(
              (elt) => elt.id !== parseInt(action.payload.id)
            ),
          ]),
        };
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        console.log(action.payload);
        return {
          ...state,
          notes: SortArrayById([
            action.payload,
            ...state.notes.filter(
              (elt) => elt.id !== parseInt(action.payload.id)
            ),
          ]),
        };
      });
  },
});

export const { newState } = noteSlice.actions;
export default noteSlice.reducer;
