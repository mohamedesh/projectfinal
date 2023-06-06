import {
  postRequest,
  getRequest,
  deleteRequest,
  updateRequest,
} from "../../api/create.api";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getItem } from "../../utilitaire/storage.utilitaire";
import { sortArrayById } from "../../utilitaire/sort.utilitaire";

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
    return error
      ? rejectWithValue(
          `Cannot update Note - Error Status ${status} - ${error}`
        )
      : fulfillWithValue(data.note);
  }
);

export const noteSlice = createSlice({
  name: "note",
  initialState: {
    title: "",
    description: "",
    contain: "",
    loading: false,
    notes: [],
    rejectedNote: "",
  },
  reducers: {
    newState: (state, action) => {
      return { ...state, [action.payload.key]: action.payload.value };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postNote.fulfilled, (state, action) => {
        // action = propriété de fulfillWithValue
        return {
          ...state,
          loading: false,
          notes: [...state.notes, action.payload.note],
          title: "",
          description: "",
          contain: "",
        };
      })
      .addCase(postNote.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(postNote.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
        };
      })
      .addCase(getNotes.fulfilled, (state, action) => {
        return { ...state, loading: false, notes: [...action.payload] };
      })
      .addCase(getNotes.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(getNotes.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
          rejectedNote: action.payload,
        };
      })
      .addCase(deleteNote.fulfilled, (state, action) => {
        return {
          ...state,
          loading: false,
          ...state,
          notes: sortArrayById([
            ...state.notes.filter(
              (elt) => elt.id !== parseInt(action.payload.id)
            ),
          ]),
        };
      })
      .addCase(deleteNote.pending, (state, action) => {
        return {
          ...state,
          loading: true,
        };
      })
      .addCase(deleteNote.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
        };
      })
      .addCase(updateNote.fulfilled, (state, action) => {
        return {
          ...state,
          notes: sortArrayById([
            action.payload,
            ...state.notes.filter(
              (elt) => elt.id !== parseInt(action.payload.id)
            ),
          ]),
        };
      })
      .addCase(updateNote.pending, (state, action) => {
        return {
          ...state,
          loading: false,
        };
      })
      .addCase(updateNote.rejected, (state, action) => {
        return {
          ...state,
          loading: false,
        };
      });
  },
});

export const { newState } = noteSlice.actions;
export default noteSlice.reducer;
