import { createContext, useState, type PropsWithChildren } from "react";
import { authService } from "../services/auth";

export const AuthContext = createContext({} as any);

export const AuthProvider = ({ children } : PropsWithChildren) => {
    const [ready, setIsReady] = useState(false);
    const [userId, setUserId] = useState("");

    const getUserId = async () => {
        const res = await authService.UserId();
        setUserId(res.userID);
    }

    const getUser = async () => {
        const res = await authService.UserProfile();
        return res;
    }

    const editUser = async (payload: any) => {
        await authService.EditUser(payload);
        getUser();
    }

    const login = async (payload: any) => {
        await authService.LogIn(payload);
        setIsReady(true);
    }

    const logout = async () => {
        await authService.SignOut();
        setIsReady(false);
    }

    const signin = async (payload: any) => {
        payload.Username = payload.email;
        await authService.SignIn(payload);
        await login(payload)
    }

    const checkAuth = async () => {
        try {
            await authService.MeInfo();
            setIsReady(true)
        } catch {
            setIsReady(false);
        }
    }

    return (
        <AuthContext.Provider value={{ userId, getUserId, getUser, editUser, login, logout, signin, ready, setIsReady, checkAuth}}>
            {children}
        </AuthContext.Provider>
    );
};