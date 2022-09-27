import { createContext, ReactNode, useState } from "react";
import { api } from "../../service/api";
import { useNavigate } from "react-router-dom";

export type TCreateUser = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

export type TCreateUserUpdate = {
  name?: string;
  email?: string;
  phone?: string;
  password?: string;
};

interface IRegisterData {
  Register(data: TCreateUser): Promise<object>;
  UpdateUser(data: TCreateUserUpdate): Promise<object>;
  modalUpdateUser: boolean;
  setModalUpdateUser: Function;
}

interface IChildrenReact {
  children: ReactNode;
}

export const RegisterContext = createContext<IRegisterData>(
  {} as IRegisterData
);

export const RegisterProvider = ({ children }: IChildrenReact) => {
  const [modalUpdateUser, setModalUpdateUser] = useState<boolean>(false);

  const navigate = useNavigate();

  const Register = async (data: TCreateUser) => {
    const responseUser = await api
      .post("/users", data)
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        return err;
      });

    return responseUser;
  };

  const UpdateUser = async (data: TCreateUserUpdate) => {
    const idUser = localStorage.getItem("uid");
    const responseUpdateUser = await api
      .patch(`/users/me/${idUser}`, data, {
        headers: {
          Authorization: `Baerer ${validationToken()}`,
        },
      })
      .then((res) => {
        setModalUpdateUser(false);
        localStorage.clear();
        setTimeout(() => {
          navigate("/");
          console.log("Faça login para validar seus dados");
        }, 1000);
        return res;
      })
      .catch((err) => {
        console.log(err);
        return err;
      });

    return responseUpdateUser;
  };

  const validationToken = () => {
    return localStorage.getItem("token");
  };

  return (
    <RegisterContext.Provider
      value={{
        Register,
        UpdateUser,
        modalUpdateUser,
        setModalUpdateUser,
      }}
    >
      {children}
    </RegisterContext.Provider>
  );
};
