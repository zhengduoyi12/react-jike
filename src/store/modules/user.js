import { createSlice } from "@reduxjs/toolkit";
import { loginAPI, getProfileAPI } from "@/apis/user";
import { setToken as _setToken, getToken ,removeToken} from "@/utils";const userStore = createSlice({
    name:'user',
    initialState:{
        token: getToken()||'',
        userInfo:{}
    },
    reducers:{
        setToken(state,action){
            state.token = action.payload
            _setToken( action.payload)
        },
        setUserInfo(state,action){
            state.userInfo = action.payload
        },
        resetUserInfo(state){
            state.userInfo = {}
            state.token = ''
            removeToken()
        }
    }
})

const fetchLogin = (loginForm)=>{
    return async (dispatch)=>{
     const res = await loginAPI(loginForm)
     dispatch(setToken(res.data.token))
    
    }
}

const fetchUserInfo = ()=>{
    return async (dispatch)=>{
    const res = await getProfileAPI()
    dispatch(setUserInfo(res.data))
   
    }
}

const { setToken , setUserInfo, resetUserInfo } = userStore.actions
const userReducer = userStore.reducer

export { setToken, fetchLogin , fetchUserInfo , resetUserInfo}
export default userReducer