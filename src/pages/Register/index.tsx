import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { RegisterContext, TCreateUser } from "../../providers/Register";
import Dashboard from "../Dashboard";
import { Box, Typography, TextField, Button } from "@mui/material";

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

  if (localStorage.getItem("token")) {
    return <Dashboard />;
  }

  const formStyle = {
    margin: "30px 0",
    padding: "15px",
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        margin: "0 auto",
        marginTop: "2%",
        alignItems: "Center",
        minHeight: "620px",
        height: "70%",
        width: "400px",
        bgcolor: "#e3f2fd",
        borderRadius: "4px",
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
        Olá, Seja bem-vindo! <p>Faça seu Registro</p>
      </Typography>
      <Typography
        variant="subtitle1"
        sx={{
          fontSize: "14px",
          fontWeight: "regular",
          marginTop: "10px",
          color: "#a6a6a6",
        }}
      >
        Coloque os dados para registrar
      </Typography>
      <form style={formStyle}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            width: "40ch",
          }}
        >
          <TextField
            id="name-id"
            label="Nome"
            variant="standard"
            sx={{
              m: 1,
              width: "100%",
              marginBottom: "20px",
            }}
            {...register("name")}
          />
          {errors.name && errors.name.type === "required" && (
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
            id="email-id"
            label="Email"
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
            id="password-id"
            label="Senha"
            variant="standard"
            type="password"
            sx={{
              width: "100%",
              marginBottom: "20px",
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

          <TextField
            id="senha-id"
            label="Celular"
            variant="standard"
            sx={{
              width: "100%",
              marginBottom: "20px",
            }}
            {...register("phone")}
          />
          {errors.phone && errors.phone.type === "required" && (
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
              marginTop: "60px",
              marginBottom: "20px",
              "&:hover": {
                bgcolor: "#369293",
                opacity: 0.9,
              },
            }}
            type="submit"
            onClick={handleSubmit(onSubmitFunction)}
          >
            Fazer Registro
          </Button>

          <Box
            component="a"
            role="alert"
            href="/"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#a6a6a6",
              width: "100%",
              paddingBottom: 2,
            }}
          >
            Ja sou registrado! Clique aqui.
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default Register;
