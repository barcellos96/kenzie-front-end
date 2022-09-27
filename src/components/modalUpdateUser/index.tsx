import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { RegisterContext, TCreateUserUpdate } from "../../providers/Register";

const ModalUpdateUser = () => {
  const { UpdateUser } = useContext(RegisterContext);
  const schema = yup.object().shape({
    name: yup.string(),
    email: yup.string(),
    password: yup.string(),

    phone: yup.string(),
  });

  const { register, handleSubmit } = useForm<TCreateUserUpdate>({
    resolver: yupResolver(schema),
  });

  const onSubmitFunction = (data: TCreateUserUpdate) => {
    console.log(data);
    UpdateUser(data);
  };

  return (
    <>
      <h1>MODAL UPDATE USER</h1>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <input {...register("name")} placeholder="Nome" />
        <input {...register("email")} type="email" placeholder="E-mail" />
        <input {...register("password")} placeholder="paswword" />
        <input {...register("phone")} placeholder="phone" />

        <input type="submit" />
      </form>
    </>
  );
};

export default ModalUpdateUser;
