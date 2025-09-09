import api from "./api"

export const profileService = {
    ProfilePictureRaw: () =>
        api.get("api/User/ProfilePictureRaw", { responseType: "blob" })
            .then(res => URL.createObjectURL(res.data)),
    ChangeProfilePic: (payload: any) =>
        api.post("api/User/UploadProfilePicture", payload, { headers: { "Content-Type": "multipart/form-data" }}),
    UserProfile: () =>
        api.get("/api/User").then(res => res.data),
    EditUser: (payload: any) =>
        api.put("/api/User", payload).then(res => res.data)
}