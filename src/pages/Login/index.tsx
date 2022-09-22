import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface FormValuesLogin {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();

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
    console.log(data);
    navigate("/dashboard");
  };

  // if (localStorage.getItem("token")) {
  //   return <DashboardPage />;
  // }

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
