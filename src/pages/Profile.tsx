import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import { UseAuth } from "../hooks/UseAuth";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import pagesMap from "../routes/pagesMap";
import { useToast } from "../hooks/useToast";

const Profile = () => {
  const { getUser, editUser, logout } = UseAuth();
  const { register, handleSubmit, watch } = useForm();
  const [user, setUser] = useState<{ userName: string; email: string } | null>(null);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const userName = watch("userName");
  const email = watch("email");
  const password = watch("password");

  const isDisabled = !userName?.trim() || !email?.trim() || !password?.trim();

  const fetchUser = async () => {
    const userData = await getUser();
    setUser(userData);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const onSubmit = async (data: any) => {
    try {
      await editUser(data);
        showToast("Alterações feitas!", "success");
    } catch (error:any) {
      if(error.response?.data[0]?.code == 'InvalidUserName') {
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

  return (
    <div>
      <Menu selected="profile" />
      {user && (
        <>
        <div className="flex flex-col items-center mt-10">
          <form action="" className="p-4 w-[400px] flex flex-col gap-4" onSubmit={handleSubmit((data: any) => onSubmit(data))}>
            <input type="image" src="" alt="" />
            <div className="flex items-center w-full justify-between">
              <label htmlFor="username">Nome:</label>
              <input type="text" {...register("userName")} id="username" className="border border-gray-400 px-2 py-1 rounded-md" defaultValue={user.userName} />
            </div>
            <div className="flex items-center w-full justify-between">
              <label htmlFor="email">Email:</label>
              <input type="email" {...register("email")} id="email" className="border border-gray-400 px-2 py-1 rounded-md" defaultValue={user.email} />
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
