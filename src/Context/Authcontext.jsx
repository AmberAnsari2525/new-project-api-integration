import React, { createContext, useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';
import { getToken, setToken, removeToken } from '../Services/Auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = getToken();
        if (token) {
            try {
                const decodedToken = jwtDecode(token);
                if (decodedToken.exp * 1000 < Date.now()) {
                    console.log('Token has expired');
                    // Optionally, you can prompt the user to log in again instead of logging them out automatically
                } else {
                    setUser(decodedToken);
                }
            } catch (error) {
                console.error('Invalid token');
                // Handle invalid token but don't remove it automatically
            }
        }
    }, []);

    const signup = (token) => {
        setToken(token); // Store the token in local storage
        try {
            const decodedToken = jwtDecode(token);
            setUser(decodedToken);
            navigate('/Profile'); // Navigate to the Profile page after login
        } catch (error) {
            console.error('Error decoding token on login', error);
        }
    };
    const login = (token) => {
        setToken(token); // Store the token in local storage
        try {
            const decodedToken = jwtDecode(token);
            setUser(decodedToken);
            navigate('/Profile'); // Navigate to the Profile page after login
        } catch (error) {
            console.error('Error decoding token on login', error);
        }
    };

    const logout = () => {
        setUser(null);
        removeToken();
        navigate('/log-in');
    };

    const requireAuth = (Component) => {
        return user ? <Component /> : <Navigate to="/log-in" />;
    };

    const preventAuthAccess = (Component) => {
        return user ? <Navigate to="/Profile" /> : <Component />;
    };

    return (
        <AuthContext.Provider value={{ user, login, signup ,logout, requireAuth, preventAuthAccess }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext };
export default AuthContext;
