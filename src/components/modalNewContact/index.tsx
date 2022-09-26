import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { DashboardContext, TCreateContact } from "../../providers/Dashboard";

const ModalNewContact = () => {
  const { RegisterContact } = useContext(DashboardContext);
  const schema = yup.object().shape({
    name: yup.string().required("Nome obrigatório!"),
    email: yup.string().required("Email obrigatório!"),
    contact: yup.string().required("Campo obrigatório!"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreateContact>({ resolver: yupResolver(schema) });

  const onSubmitFunction = (data: TCreateContact) => {
    RegisterContact(data);
  };

  return (
    <>
      <h1>MODAL NEW CONTACT</h1>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <input {...register("name")} placeholder="Nome" />
        {errors.name && errors.name.type === "required" && (
          <span>Nome obrigatório</span>
        )}
        <input {...register("email")} type="email" placeholder="E-mail" />
        {errors.email && errors.email.type === "required" && (
          <span>Email obrigatório</span>
        )}
        <input {...register("contact")} placeholder="Celular" />
        {errors.contact && errors.contact.type === "required" && (
          <span>Celular obrigatório</span>
        )}

        <input type="submit" />
      </form>
    </>
  );
};

export default ModalNewContact;
