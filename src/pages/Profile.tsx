import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import { UseAuth } from "../hooks/UseAuth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import pagesMap from "../routes/pagesMap";
import { useToast } from "../hooks/UseToast";
import { useProfile } from "../hooks/UseProfile";

const Profile = () => {
  const [loading, setLoading] = useState(true);
  const { logout } = UseAuth();
  const { getUser, getProfilePic, changeProfilePic, editUser } = useProfile();
  const { register, handleSubmit, watch, setValue } = useForm();
  const [user, setUser] = useState<{ nickName: string; email: string } | null>(null);
  const [profilePic, setProfilePic] = useState<any>(null);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const nickName = watch("nickName");
  const email = watch("email");
  const password = watch("password");

  const isDisabled = !nickName?.trim() || !email?.trim() || !password?.trim();

  const fetchUser = async () => {
    setLoading(true)

    const userData = await getUser();
    
    try {
      setProfilePic(await getProfilePic())
    } catch {
      setProfilePic("")
    }
    

    setUser(userData);
    setLoading(false)
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      await editUser(data);
      showToast("Alterações feitas!", "success");
      setValue("password", "");
    } catch (error:any) {
      if(error.response?.data[0]?.code == 'InvalidnickName') {
        showToast("Nome de usuário inválido", "error");
      }
      if(error.response?.data?.error == 'InvalidPassword') {
        showToast("Senha incorreta", "error");
      }
    }
  };

  const handleLogout = () => {
    logout();
    navigate(pagesMap.login);
  }

  const handleChangeProfilePic = (e:any) => {
    const image = e.target.files[0];
    setProfilePic(URL.createObjectURL(image));

    const formData = new FormData();
    formData.append("file", image);
    
    setLoading(true);
    changeProfilePic(formData);
    setLoading(false);

    showToast("Imagem atualizada!", "success");
  }

  return (
    <div>
      <Menu selected="profile" />
      {loading ? <p className="text-center pt-50">carregando...</p> : (
        <>
        <div className="flex flex-col items-center mt-10">
          <form action="" className="p-4 w-[400px] flex flex-col gap-4" onSubmit={handleSubmit((data: any) => onSubmit(data))}>
            <img src={profilePic} alt="foto de perfil" className="w-100 h-90 rounded-full object-cover"/>
            <label htmlFor="upload" className="text-center hover:underline cursor-pointer p-2">mudar foto</label>
            <input type="file" accept="image/*" onChange={handleChangeProfilePic} name="upload" id="upload" className="hidden" />
            <div className="flex items-center w-full justify-between">
              <label htmlFor="nickName">Nome:</label>
              <input type="text" {...register("nickName")} id="nickName" className="border border-gray-400 px-2 py-1 rounded-md" defaultValue={user!.nickName} />
            </div>
            <div className="flex items-center w-full justify-between">
              <label htmlFor="email">Email:</label>
              <input type="email" {...register("email")} id="email" className="border border-gray-400 px-2 py-1 rounded-md" defaultValue={user!.email} />
            </div>
            <div className="flex items-center w-full justify-between">
              <label htmlFor="password">Senha:</label>
              <input type="password" {...register("password")} id="password" className="border border-gray-400 px-2 py-1 rounded-md" />
            </div>
            <div className="flex gap-2">
              <input type="submit" disabled={isDisabled} className="bg-coral w-[150%] mx-auto text-white p-2 rounded cursor-pointer border-1 border-coral duration-150 hover:bg-snow hover:text-coral disabled:bg-gray-400 disabled:hover:text-snow disabled:border-gray-400" value="Atualizar" />
              <button onClick={() => handleLogout()} className="bg-green w-full mx-auto text-white p-2 rounded cursor-pointer border-1 border-green duration-150 hover:bg-snow hover:text-green disabled:bg-gray-400">Sair</button>
            </div>
          </form>
        </div>
        </>
      )}
    </div>
  );
};

export default Profile;
