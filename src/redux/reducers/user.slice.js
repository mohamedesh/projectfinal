import {postRequest,getRequest,deleteRequest,updateRequest} from "../../api/create.api";
import {createAsyncThunk,createSlice} from "@reduxjs/toolkit";
import {getItem, setItem} from "../../utilitaire/storage.utilitaire";

// recup les data du cote front pour l'envoyer du cote back
export const postUser = createAsyncThunk("users/create" , async(form,thunkApi)=>{
    const {fulfillWithValue,rejectWithValue} = thunkApi;
    const {status,data,error} = await postRequest("users/signUp",form);
    const token = data.token
    setItem("token",token)
    return error
        ? rejectWithValue(`Cannot post User - Error Status ${status} - ${error}`)
        : fulfillWithValue(data)
})
export const userSignIn = createAsyncThunk("users/signin" , async(form,thunkApi)=>{
    const {fulfillWithValue,rejectWithValue} = thunkApi;
    const {status,data,error} = await postRequest("users/signIn",form);
    const token = data.token
    setItem("token",token)
    return error
        ? rejectWithValue(`Cannot post User - Error Status ${status} - ${error}`)
        : fulfillWithValue(data)
})

export const getUser = createAsyncThunk("users/display", async(_,thunkApi)=>{
    const {fulfillWithValue,rejectWithValue} = thunkApi;
    const token =  getItem("token")
    const {status,data,error} = await getRequest("users/displayAll",token);
    console.log(data.user)
    return error
        ? rejectWithValue(`Cannot get User - Error Status ${status} - ${error}`)
        : fulfillWithValue(data)
})
export const getUserOne = createAsyncThunk("users/display", async(_,thunkApi)=>{
    const {fulfillWithValue,rejectWithValue} = thunkApi;
    const token =  getItem("token")
    const {status,data,error} = await getRequest(`users/displayOne`,token);
    console.log({Ressources:data.user.Ressources,Notes:data.user.Notes})

    return error
        ? rejectWithValue(`Cannot get User - Error Status ${status} - ${error}`)
        : fulfillWithValue(data.user)
})



export const deleteUser = createAsyncThunk("users/delete", async (userId,thunkApi)=>{
    const {fulfillWithValue,rejectWithValue} = thunkApi;
    const token = getItem("token")
    const {status,data,error} = await deleteRequest(`users/deleteUser/${userId}`,token)
    console.log(data)
    return error
        ? rejectWithValue(`Cannot delete User - Error Status ${status} - ${error}`)
        : fulfillWithValue(data.user)

})

export const updateUser = createAsyncThunk("users/update", async(user,thunkApi)=>{
    const {fulfillWithValue,rejectWithValue} = thunkApi;
    const token = getItem("token")
    const {id,password,email} = user
    const {status,data,error} = await updateRequest(`users/update/${id}`,{password,email},token )
    console.log(data)
    return error
        ? rejectWithValue(`Cannot update User - Error Status ${status} - ${error}`)
        : fulfillWithValue(data.user)
})

const body = {
    surname: "",
    name: "",
    pseudo: "",
    password: "",
    email: "",
}

export const usersSlice = createSlice({
    name:"user",
    initialState:{
        surname: "",
        name: "",
        pseudo: "",
        password: "",
        email: "",
        loading: false,
        userGet:[],
        userGetOne:[],
        userOne:""
    },
    reducers:{
        // setter
        newState:(state, action)=>{
            // action contenu dans le payload
            return {...state, [action.payload.key]: action.payload.value}
        }

    },

    extraReducers:(builder)=>{
        builder
            .addCase(postUser.fulfilled, (state, action)=>{
            return {...state, loading: false, ...body}
        })
            .addCase(userSignIn.fulfilled, (state, action)=>{
                // 3 eme parametre permet de
            return {...state, loading: false, email:"" , password:""}
        })
            // .addCase(getUser.fulfilled,(state,action)=>{
            //     console.log(action.payload)
            //     return {...state, loading:false, userGet: [...action.payload]}
            // })
            .addCase(deleteUser.fulfilled, (state,action)=>{
                return {...state, loading:false, userGet: [action.payload]}
            })
            .addCase(updateUser.fulfilled, (state,action)=>{
                return {...state, loading:false, email:"",password:""}
            })
            .addCase(getUserOne.fulfilled, (state,action)=>{
                console.log(action.payload)
                return {...state,loading:false,userGetOne:[action.payload]}
            })

    }
})

export const {newState,test} = usersSlice.actions;
export default usersSlice.reducer;