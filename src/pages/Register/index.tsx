import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { RegisterContext, TCreateUser } from "../../providers/Register";

const Register = () => {
  const { Register } = useContext(RegisterContext);

  const schema = yup.object().shape({
    name: yup.string().required("Nome obrigatório!"),
    email: yup.string().required("Email obrigatório!"),
    phone: yup.string().required("Campo obrigatório!"),
    password: yup.string().required("Senha obrigatória!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateUser>({ resolver: yupResolver(schema) });

  const onSubmitFunction = (data: TCreateUser) => {
    Register(data);
  };

  //   if (localStorage.getItem("token")) {
  //     return <DashboardPage />;
  //   }

  return (
    <>
      <h1>REGISTER</h1>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <input {...register("name")} placeholder="Nome" />
        {errors.name && errors.name.type === "required" && (
          <span>campo obrigatório</span>
        )}
        <input {...register("email")} type="email" placeholder="E-mail" />
        {errors.email && errors.email.type === "required" && (
          <span>campo obrigatório</span>
        )}
        <input {...register("phone")} placeholder="Celular" />
        {errors.phone && errors.phone.type === "required" && (
          <span>campo obrigatório</span>
        )}
        <input {...register("password")} type="password" placeholder="Senha" />
        {errors.password && errors.password.type === "required" && (
          <span>campo obrigatório</span>
        )}

        <input type="submit" />
        <a href="/">Faça Login! Clique aqui.</a>
      </form>
    </>
  );
};

export default Register;
