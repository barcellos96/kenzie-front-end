import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { LoginContext } from "../../providers/Login";
import Dashboard from "../Dashboard";

interface FormValuesLogin {
  email: string;
  password: string;
}

const Login = () => {
  const { Login } = useContext(LoginContext);

  const schema = yup.object().shape({
    email: yup.string().required("Email obrigatório!"),
    password: yup.string().required("Senha obrigatória!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValuesLogin>({ resolver: yupResolver(schema) });

  const onSubmitFunction = (data: FormValuesLogin) => {
    Login(data);
  };

  if (localStorage.getItem("token")) {
    return <Dashboard />;
  }

  return (
    <>
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <input type="email" placeholder="E-mail" {...register("email")} />
        {errors.email && errors.email.type === "required" && (
          <span>campo obrigatório</span>
        )}
        <input type="password" placeholder="Senha" {...register("password")} />
        {errors.password && errors.password.type === "required" && (
          <span>campo obrigatório</span>
        )}

        <a href="/register">Não sou registrado</a>

        <input type="submit" />
      </form>
    </>
  );
};

export default Login;
