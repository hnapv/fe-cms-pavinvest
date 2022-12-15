import axios from "axios"
import { loginFailed, loginStart, loginSuccess, registerFailed, registerStart, registerSuccess,logoutStart,logoutSuccess,logoutFailed } from "./authSlice"
import { deleteUserFailed, deleteUserStart, deleteUserSuccess, getUsersFailed, getUsersStart, getUsersSuccess } from "./userSlice";

export const loginUser = async(user,dispatch,navigate)=>{
    dispatch(loginStart());
    try{
        const res = await axios.post("http://localhost:3000/api/user/loginUser",user,{
            withCredentials: true
          })

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
        await axios.post("http://localhost:3000/api/user/createUser",user) 
        dispatch(registerSuccess())
        navigate("/login")
    }
    catch(err){
        dispatch(registerFailed())
    }
}

export const getListUsers = async(accessToken, dispatch,axiosJWT)=>{
    dispatch(getUsersStart());
    try{
        const res = await axiosJWT.get("http://localhost:3000/api/user/getListUser",{
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

export const deleteUser =async(accessToken, dispatch,id,axiosJWT)=>{
    dispatch(deleteUserStart())
    try{
        const res = await axiosJWT.delete(`http://localhost:3000/api/user/deleteUser/${id}`,{
            headers:{
                token: `Bearer ${accessToken}`
            }
        })
        const cookie = document.cookie
        console.log('the',cookie)
        dispatch(deleteUserSuccess(res.data))
    }
    catch(err){
        dispatch(deleteUserFailed(err.response.data))
    }
}

export const logoutUser = async(id,dispatch,navigate,accessToken,axiosJWT)=>{
    dispatch(logoutStart());
    try{
        const res = await axiosJWT.post("http://localhost:3000/api/user/logoutUser",id,{
            headers: { token: `Bearer ${accessToken}` },
            withCredentials: true
          })
        dispatch(logoutSuccess(res.data))
        navigate("/login");
    }
    catch(err){
        dispatch(logoutFailed())
    }
}