import { getCustomerFailed, getCustomerStart, getCustomerSuccess } from "../redux/customerSlice";

export const getListCustomers = async (dispatch,navigate,accessToken,axiosJWT)=>{
    dispatch(getCustomerStart())
    try{
        const res = await axiosJWT.get("http://localhost:3000/api/getListCusInfo",{
            headers: {
                token: `Bearer ${accessToken}`
            }
        })
        dispatch(getCustomerSuccess(res.data))
    }
    catch(err){
        dispatch(getCustomerFailed())
    }
}