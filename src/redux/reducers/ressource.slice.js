import {postRequest,getRequest,deleteRequest,updateRequest} from "../../api/create.api";
import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import {getItem} from "../../utilitaire/storage.utilitaire";


export const postRessource = createAsyncThunk("ressource/create", async(formR,thunkApi)=>{
    const {fulfillWithValue,rejectWithValue} = thunkApi;
    const token = getItem("token")
    const {status,data,error} =  await postRequest("ressource/create",formR,token)
    console.log(data)

    return error
        ? rejectWithValue(`Cannot post Ressource - Error Status ${status} - ${error}`)
        : fulfillWithValue(data)
})

export const getRessource = createAsyncThunk("ressource/display", async(_,thunkApi)=>{
    const {fulfillWithValue,rejectWithValue} = thunkApi;
    const token = getItem("token");
    const {status,data,error} = await getRequest(`ressource/display`,token)
    console.log(data);
    return error
        ? rejectWithValue(`Cannot display Ressource - Error Status ${status} - ${error}`)
        : fulfillWithValue(data.ressource)

})

export const deleteRessource = createAsyncThunk("ressource/delete",async(RessourceId,thunkApi)=>{
    const {fulfillWithValue,rejectWithValue} = thunkApi
    const token = getItem("token");
    const {status,data,error} = await deleteRequest(`ressource/delete/${RessourceId}`,token)
    console.log(data)
    return error
        ? rejectWithValue(`Cannot delete Ressource - Error Status ${status} - ${error}`)
        : fulfillWithValue(data.ressource)
})

export const updateRessource = createAsyncThunk("ressource/update", async(ressource,thunkApi)=>{
    const {fulfillWithValue,rejectWithValue} = thunkApi
    const {title,url,description,id} = ressource
    const token = getItem("token")
    const {status,data,error} = await updateRequest(`ressource/update/${id}`,{title,url,description},token)
    console.log(data)
    return error
        ? rejectWithValue(`Cannot update Ressource - Error Status ${status} - ${error}`)
        : fulfillWithValue(data.ressource)
})

const bodyRessource = {
            title:"",
            url:"",
            description:""
        }
export const ressourceSlice = createSlice({
    name:"ressources",
    initialState: {
        // les states
        title:"",
        url:"",
        description:"",
        loading:false,
        ressources:[]
    },
    // ici c'est les actions,ce qui va etre le setter du state
    reducers:{
        newState:(state,action)=>{
            return {...state,[action.payload.key]: action.payload.value}
        },
        addRessource:(state,action)=>{
            console.log(action)
            return {...state, ressources: [...action.payload]}
        }

    },
    extraReducers:(builder)=>{
        builder
            .addCase(postRessource.fulfilled, (state,action)=>{
                // contient mon nouveau post
                console.log(action.payload)
                // recup les anciennes données et rajoute les nouvelles
                return {...state,loading:false,ressources:[...state.ressources,action.payload.ressource]}
            })
            .addCase(getRessource.fulfilled,(state,action)=>{
                return {...state,loading: false, ressources: [...action.payload]}
            })
            .addCase(deleteRessource.fulfilled, (state,action)=>{
                return {...state,loading:false, ressources: [action.payload]}
            })
            .addCase(updateRessource.fulfilled,(state,action)=>{
                return {...state,loading:false,...bodyRessource}
            })
    }
    })

export const {newState,addRessource} = ressourceSlice.actions;
export default ressourceSlice.reducer;