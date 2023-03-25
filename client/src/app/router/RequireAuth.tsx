import React from 'react';
import {useAppSelector} from "../store/configureStore";
import {Navigate, Outlet, useLocation} from "react-router-dom";

function RequireAuth() {
    const {user} = useAppSelector(state => state.account);
    const location = useLocation();

    if (!user) {
        return <Navigate to={'/login'} state={{from: location}}/>
    }

    return <Outlet/>
}

export default RequireAuth;