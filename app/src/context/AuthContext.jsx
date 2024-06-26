import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import * as SecureStore from 'expo-secure-store';


const TOKEN_KEY = 'my-jwt';
export const API_URL = 'https://nutrition-app-server.vercel.app';
// const AuthContext = createContext<AuthProps>({});

const AuthContext = createContext({});

export const useAuth = () => {
    return useContext(AuthContext);
}

export const AuthProvider = ({children})  => {
    const [authState, setAuthState] = useState({
        token: null,
        authenticated: null
    });

    useEffect(() => {
        const loadToken = async () => {
            const token = await SecureStore.getItemAsync(TOKEN_KEY);
            console.log("stored: ", token)

            if (token) {
                axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

                setAuthState({
                    token: token,
                    authenticated: true,
                });
            }
        };
        loadToken();
    }, []);

    const login = async (email,password) => {
        try {
            return await axios.post(`${API_URL}/auth`, {email, password});
        } catch (error) {
            return console.log('Error: ' + error);
        }
    };

    const register = async (email,password) => {
        try {
            const result = await axios.post(`${API_URL}/users`, {email, password});

            console.log("Resultado do login: " + result)

            setAuthState({
                token: result.data.token,
                authenticated: true
            });

            // Mantem o usuário logado
            axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.token}`;

            await SecureStore.setItemAsync(TOKEN_KEY, result.data.token)

            return result;

        } catch (error) {
            return console.log('Error: ' + error);
        }
    };

    const logout = async (email,password) => {
        // Deleta token do armazenamento
        await SecureStore.setItemAsync(TOKEN_KEY)
        
        // Atualiza HTTP Headers
        axios.defaults.headers.common['Authorization'] = '';
        
        // Reseta o estado de autenticação
        setAuthState({
            token: null,
            authenticated: false
        });
    };

    const value = {
        onRegister: register,
        onLogin: login, 
        onLogout: logout,
        authState
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>

}