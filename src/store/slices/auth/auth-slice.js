import { createSlice } from "@reduxjs/toolkit";
import { services } from "../../../services";

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLoggedIn: false,
        user: {}
    },
    reducers: {
        loginSuccess: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        loginFailure: (state) => {
            state.isLoggedIn = false;
            state.user = {};
            services.encryptedLocalStorage.removeItem("pickanddrivetoken");
        },
        logout: (state) => {
            state.isLoggedIn = false;
            state.user = {};
            services.encryptedLocalStorage.removeItem("pickanddrivetoken");
        }
    }
});

export const { loginSuccess, loginFailure, logout } = authSlice.actions;
export default authSlice.reducer;