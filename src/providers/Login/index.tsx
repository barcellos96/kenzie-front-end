import { createContext, ReactNode, useState } from "react";
import { api } from "../../service/api";
import { useNavigate } from "react-router-dom";

export type TLoginUser = {
  email: string;
  password: string;
};

interface ILoginData {
  userLogin: TLoginUser | null;
  Login(data: TLoginUser): Promise<object>;
}

interface IChildrenReact {
  children: ReactNode;
}

export const LoginContext = createContext<ILoginData>({} as ILoginData);

export const LoginProvider = ({ children }: IChildrenReact) => {
  const [userLogin, setUserLogin] = useState<TLoginUser | null>(null);

  const navigate = useNavigate();

  const Login = async (data: TLoginUser) => {
    const responseUser = await api
      .post("/users/login", data)
      .then((res) => {
        console.log("res", res.data.token.token);
        window.location.href = "/dashboard";
        setUserLogin(data);
        setToken(res.data.token.id, res.data.token.token);
        navigate("/dashboard");
      })
      .catch((err) => {
        return err;
      });

    return responseUser;
  };

  const setToken = (id: string, token: string) => {
    localStorage.setItem("uid", id);

    localStorage.setItem("token", token);
  };

  return (
    <LoginContext.Provider value={{ userLogin, Login }}>
      {children}
    </LoginContext.Provider>
  );
};
