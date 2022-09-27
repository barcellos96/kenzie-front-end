import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { LoginContext } from "../../providers/Login";
import Dashboard from "../Dashboard";
import { Box, Typography, TextField, Button } from "@mui/material";

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
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        bgcolor: "#FFF",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "Center",
          width: "400px",
          bgcolor: "#e3f2fd",
          borderRadius: "1ch",
          height: "70vh",
          minHeight: "550px",
          maxHeight: "650px",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            fontWeight: "bold",
            marginTop: "40px",
            color: "#369293",
          }}
        >
          Olá, Seja bem-vindo! <p>Faça seu Login</p>
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{
            fontSize: "14px",
            fontWeight: "regular",
            marginTop: "10px",
            marginBottom: "60px",
            color: "#a6a6a6",
          }}
        >
          Coloque suas credenciais
        </Typography>
        <form>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              width: "40ch",
            }}
          >
            <TextField
              id="account-id"
              label="Conta"
              variant="standard"
              sx={{
                m: 1,
                width: "100%",
                marginBottom: "20px",
              }}
              {...register("email")}
            />
            {errors.email && errors.email.type === "required" && (
              <Box
                component="p"
                role="alert"
                sx={{
                  display: "flex",
                  color: "red",
                  width: "100%",
                  marginTop: "-12px",
                  paddingBottom: 2,
                }}
              >
                Campo obrigatório
              </Box>
            )}
            <TextField
              id="senha-id"
              label="Senha"
              variant="standard"
              type="password"
              sx={{
                width: "100%",
                marginBottom: "80px",
              }}
              {...register("password")}
            />
            {errors.password && errors.password.type === "required" && (
              <Box
                component="p"
                role="alert"
                sx={{
                  display: "flex",
                  color: "red",
                  width: "100%",
                  marginTop: "-12px",
                  paddingBottom: 2,
                }}
              >
                Campo obrigatório
              </Box>
            )}

            <Button
              variant="contained"
              sx={{
                bgcolor: "#369293",
                marginBottom: "20px",
                "&:hover": {
                  bgcolor: "#369293",
                  opacity: 0.9,
                },
              }}
              type="submit"
              onClick={handleSubmit(onSubmitFunction)}
            >
              Fazer Login
            </Button>
            <a href="/register">Registre-se! Clique aqui.</a>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
