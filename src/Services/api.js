import  axiosinstance from "./AxiosInstance";
import {setToken} from "./Auth";


//Regsiteration user

export  const registerUser = async (userData) => {
    try{
    const response = await  axiosinstance.post('register', userData)
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
        const response = await  axiosinstance.post ("login", userData);
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
        const response = await axiosinstance.get("user");
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};
//update
export const updateUserData = async (data) => {
    try {
        const response = await  axiosinstance.post("user/update",data);
        return response.data;
    } catch (error) {
        console.error("Error fetching user data:", error);
        throw error;
    }
};
export const getProduct = async (data) =>{
    try{
        const response = await axiosinstance.get ('products' ,data)
        return response.data
    }
    catch (error){
        console.error("product lit error" , error)
        throw error;
    }

}

//getting product
export const getSingleProduct = async (id) => {
    try {
        const response = await axiosinstance.get("products/" + id);
        return response.data;
    } catch (error) {
        console.error("Product list error", error);
        throw error;
    }
};

//addOrderList

export const addProductList = async (orderData) => {
    try {
        const response = await axiosinstance.post('orders', orderData);
        console.log('API call successful:', response); // Additional log
        return response;
    } catch (error) {
        console.error('Error fetching orders list:', error);
        throw error;
    }
};


//getingProductlist

export const getingProductList = async () => {
    try{
        const response = await axiosinstance.get ('orders');
        return response.data;
    }
    catch (error){
        console.error("Error fetching orders list:", error);
        throw error;
    }
}

// order detail API
export const getOrderDetail = async (id) => {
    try {
        const response = await axiosinstance.get(`orders/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching order detail:", error);
        throw error;
    }
};
