import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

interface FormValues {
  name: string;
  email: string;
  password: string;
  phone: string;
}

const ModalNewContact = () => {
  const navigate = useNavigate();

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
  } = useForm<FormValues>({ resolver: yupResolver(schema) });

  const onSubmitFunction = (data: FormValues) => {
    console.log(data);
    window.location.reload();
  };

  //   if (localStorage.getItem("token")) {
  //     return <DashboardPage />;
  //   }

  return (
    <>
      <h1>MODAL NEW CONTACT</h1>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <input placeholder="Nome" {...register("name")} />
        {errors.name && errors.name.type === "required" && (
          <span>campo obrigatório</span>
        )}
        <input type="email" placeholder="E-mail" {...register("email")} />
        {errors.email && errors.email.type === "required" && (
          <span>campo obrigatório</span>
        )}
        <input placeholder="Celular" {...register("phone")} />
        {errors.phone && errors.phone.type === "required" && (
          <span>campo obrigatório</span>
        )}
        <input type="password" placeholder="Senha" {...register("password")} />
        {errors.password && errors.password.type === "required" && (
          <span>campo obrigatório</span>
        )}

        <input type="submit" />
      </form>
    </>
  );
};

export default ModalNewContact;
