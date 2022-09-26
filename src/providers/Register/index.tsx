import { createContext, ReactNode, useState } from "react";
import { api } from "../../service/api";
import { useNavigate } from "react-router-dom";

export type TCreateUser = {
  name: string;
  email: string;
  phone: string;
  password: string;
};

interface IRegisterData {
  user: TCreateUser | null;
  Register(data: TCreateUser): Promise<object>;
}

interface IChildrenReact {
  children: ReactNode;
}

export const RegisterContext = createContext<IRegisterData>(
  {} as IRegisterData
);

export const RegisterProvider = ({ children }: IChildrenReact) => {
  const [user, setUser] = useState<TCreateUser | null>(null);

  const navigate = useNavigate();

  const Register = async (data: TCreateUser) => {
    const responseUser = await api
      .post("/users", data)
      .then((res) => {
        setUser(data);
        navigate("/");
      })
      .catch((err) => {
        console.log(err.response.data.message);
        return err;
      });

    return responseUser;
  };

  return (
    <RegisterContext.Provider value={{ user, Register }}>
      {children}
    </RegisterContext.Provider>
  );
};
