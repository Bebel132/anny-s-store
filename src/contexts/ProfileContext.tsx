import { createContext, type PropsWithChildren } from "react";
import { profileService } from "../services/profile";

export const ProfileContext = createContext({} as any);

export const ProfileProvider = ({ children } : PropsWithChildren) => {

    const getProfilePic = async () => {
        return await profileService.ProfilePictureRaw();
    }

    const changeProfilePic = async (payload: any) => {
        return await profileService.ChangeProfilePic(payload);
    }

    const getUser = async () => {
        const res = await profileService.UserProfile();
        return res;
    }
    
    const editUser = async (payload: any) => {
        await profileService.EditUser(payload);
        getUser();
    }

    return (
        <ProfileContext.Provider value={{ getProfilePic, changeProfilePic, editUser, getUser }}>
            {children}
        </ProfileContext.Provider>
    );
};