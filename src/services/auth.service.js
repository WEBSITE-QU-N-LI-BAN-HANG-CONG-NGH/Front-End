import axios from "axios";
import { API_BASE_URL } from "./api";
import { api } from "./api";

export const authService = {
    register: (userData) => 
        axios.post(`${API_BASE_URL}/auth/register`, userData),
    
    login: (userData) => 
        axios.post(`${API_BASE_URL}/auth/login`, userData),
    
    getUserProfile: (jwt) => 
        api.get(`/api/user/profile`),
        
    logout: () => {
        localStorage.removeItem("jwt");
        return Promise.resolve();
    }
};