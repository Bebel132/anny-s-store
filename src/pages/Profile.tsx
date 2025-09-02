import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import { UseAuth } from "../hooks/UseAuth";
import { useForm } from "react-hook-form";

const Profile = () => {
  const { getUser, editUser } = UseAuth();
  const { register, handleSubmit, watch } = useForm();
  const [user, setUser] = useState<{ userName: string; email: string } | null>(null);

  const [toast, setToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error" | null>(null);

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

  useEffect(() => {
    setTimeout(() => setToast(false), 2000);
  }, [toast]);

  const onSubmit = async (data: any) => {
    try {
      await editUser(data);
      setToast(true);
      setToastMessage("Usuário atualizado com sucesso!");
      setToastType("success");
    } catch (error:any) {
      if(error.response?.data[0]?.code == 'InvalidUserName') {
        setToast(true);
        setToastMessage("Nome de usuário inválido");
        setToastType("error");
      }
      if(error.response?.data?.error == 'InvalidPassword') {
        setToast(true);
        setToastMessage("Senha inválida");
        setToastType("error");
      }
    }
  };

  return (
    <div>
      <Menu selected="profile" />
      <div className={`fixed bottom-0 m-3 w-[300px] ${toastType === "success" ? "bg-emerald" : "bg-red-500"} text-snow text-center shadow-lg p-2 font-bold ${toast ? "block" : "hidden"}`}>{toastMessage}</div>
      {user && (
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
            <input type="submit" disabled={isDisabled} className="bg-emerald-500 w-[200px] mx-auto text-white p-2 rounded cursor-pointer hover:bg-emerald-600 disabled:bg-gray-400" value="Atualizar" />
          </form>
        </div>
      )}
    </div>
  );
};

export default Profile;
