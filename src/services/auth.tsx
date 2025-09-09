import api from "./api"

export const authService = {
    LogIn: (payload: any) => 
        api.post("/api/User/Login?useCookies=true", payload).then(res => res.data),
    SignOut: () =>
        api.post("/api/User/Logout").then(res => res.data),
    SignIn: (payload: any) =>
        api.post("/api/User/Signin", payload).then(res => res.data),
    MeInfo: () => 
        api.get("/manage/info").then(res => res.data),
    UserId: () =>
        api.get("/me").then(res => res.data),
}