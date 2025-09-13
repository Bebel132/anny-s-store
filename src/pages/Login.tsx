import { useForm } from "react-hook-form";
import novelo from "../assets/knitting_9164722.png";
import { UseAuth } from "../hooks/UseAuth";
import { useNavigate } from "react-router";
import pagesMap from "../routes/pagesMap";
import { useEffect, useState } from "react";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit } = useForm();
  const { login, checkAuth, ready } = UseAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    checkAuth();
    if (ready) {
      navigate(pagesMap.home);
    }
    setLoading(false);
  });

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      await login(data);
    } catch (error) {
      alert("Usuário ou senha inválidos");
    }
    setLoading(false);
  };

  return (
    <div className="h-screen flex items-center justify-center text-center bg-green">
      {loading ? (
        <p className="text-snow">carregando...</p>
      ) : (
        <div className="max-w-70 w-full flex flex-col gap-12 relative">
          <img
            src={novelo}
            alt="Novelo de lã"
            className="absolute -top-8 -right-4 w-25 rotate-18"
          />
          <h1 className="text-4xl font-bold text-snow">Entrar</h1>
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
            <span
              className="text-snow font-bold cursor-pointer hover:underline"
              onClick={() => navigate(pagesMap.signin)}
            >
              não tenho conta
            </span>
            <input
              className="bg-snow p-2 rounded w-[25%] mx-auto cursor-pointer hover:text-greeny"
              type="submit"
              value="Entrar"
            />
          </form>
        </div>
      )}
    </div>
  );
};

export default Login;
