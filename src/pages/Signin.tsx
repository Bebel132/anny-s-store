import { useForm } from "react-hook-form";
import novelo from "../assets/knitting_9164722.png";
import { UseAuth } from "../hooks/UseAuth";
import { useNavigate } from "react-router";
import pagesMap from "../routes/pagesMap";
import { useState } from "react";

const Signin = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const { signin } = UseAuth();
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      setLoading(true);
      await signin(data);
      setLoading(false);
      navigate(pagesMap.home);
    } catch (error: any) {
      if (Object.keys(error.response.data.errors)[0] === "DuplicateUserName")
        alert("Usuário já cadastrado");
      setLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center text-center bg-green">
      {loading ? (
        <p>carregando...</p>
      ) : (
        <div className="max-w-70 w-full flex flex-col gap-12 relative">
          <img
            src={novelo}
            alt="Novelo de lã"
            className="absolute -top-8 -right-10 w-25 rotate-18"
          />
          <h1 className="text-4xl font-bold text-snow">Cadastrar</h1>
          <form
            onSubmit={handleSubmit((data: any) => onSubmit(data))}
            className="flex flex-col gap-4"
          >
            <input
              {...register("email")}
              className="bg-snow p-2 rounded"
              type="email"
              placeholder="E-mail"
            />
            <input
              {...register("password")}
              className="bg-snow p-2 rounded"
              type="password"
              placeholder="Senha"
            />
            <input
              className="bg-snow p-2 rounded w-[25%] mx-auto cursor-pointer hover:text-green"
              type="submit"
              value="Entrar"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default Signin;
