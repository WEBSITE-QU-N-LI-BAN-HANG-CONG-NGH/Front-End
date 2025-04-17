import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { register, login, getUser, logout } from "../State/Auth/Action";

export const useAuth = () => {
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    
    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt && !auth.user) {
            dispatch(getUser(jwt));
        }
    }, [dispatch, auth.user]);
    
    return {
        user: auth.user,
        loading: auth.isLoading,
        error: auth.error,
        isAuthenticated: !!auth.user,
        login: (userData) => dispatch(login(userData)),
        register: (userData) => dispatch(register(userData)),
        logout: () => dispatch(logout())
    };
};