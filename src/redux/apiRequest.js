import axios from "axios"
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess } from "./authSlice"
import { getUsersFailed, getUsersStart, getUsersSuccess } from "./userSlice";

export const loginUser = async(user,dispatch,navigate)=>{
    dispatch(loginStart());
    try{
        const res = await axios.post("http://localhost:4000/api/user/loginUser",user)
        console.log(res)
        dispatch(loginSuccess(res.data))
        navigate("/");
    }
    catch(err){
        dispatch(loginFailed())
    }
}

export const registerUser = async(user,dispatch,navigate)=>{
    dispatch(registerStart())
    try{
        await axios.post("http://localhost:4000/api/user/createUser",user) 
        dispatch(registerSuccess())
        navigate("/login")
    }
    catch(err){
        dispatch(registerFailed())
    }
}

export const getListUsers = async(accessToken, dispatch)=>{
    dispatch(getUsersStart());
    try{
        const res = await axios.get("http://localhost:4000/api/user/getListUser",{
            headers: {
                token: `Bearer ${accessToken}`
            }
        });
        dispatch(getUsersSuccess(res.data))
    }
    catch(err){
        dispatch(getUsersFailed())

    }
}