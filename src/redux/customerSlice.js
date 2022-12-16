import {createSlice} from "@reduxjs/toolkit"

const customerSlice = createSlice({
    name: "customer",
    initialState: {
        customers: {
            allCustomers: null,
            isFetching: false,
            error: false
        }
    },
    reducers: {
        getCustomerStart: (state) => {
            state.customers.isFetching = true;
        },
        getCustomerSuccess: (state, action) => {
            state.customers.isFetching = false;
            state.customers.allCustomers = action.payload;
        },
        getCustomerFailed: (state) => {
            state.customers.isFetching = false;
            state.customers.error = true;
        },
    }
})

export const {
    getCustomerStart,
    getCustomerSuccess,
    getCustomerFailed
} = customerSlice.actions

export default customerSlice.reducer