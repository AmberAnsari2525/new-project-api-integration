import AxiosInstance from "./AxiosInstance";
import {setToken} from "./Auth";


//Regsiteration user

export  const registerUser = async (userData) => {
    try{
    const response = await AxiosInstance.post('register', userData)
if (response.data.token){
    setToken(response.data.token);
}
    return response.data;
}
catch(error)
{
        console.error  (" Registartion Error", error);
        throw error;
}
};
//Login Api
export const Loginuser = async (userData) => {
    try{
        const response = await AxiosInstance.post ("login", userData);
        if (response.data.token){
            setToken(response.data.token);
        }
        return response.data;
    }
    catch (error){
        console.error  (" Login Error", error);
        throw error;
    }
};

export const fetchUserData = async () => {
    try {
        const response = await AxiosInstance.get("user");
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};
// user update 
export const updateUserData = async () => {
    try {
        const response = await AxiosInstance.get("user/update");
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};