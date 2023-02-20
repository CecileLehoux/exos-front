import React, { useState } from "react";
import { Container, TextField, Button, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import "./lp.css";
import Image from "../../assets/logo-lr.png";
import Applis from "../../assets/applis.png";
import { useParams } from "react-router-dom";

const schema = yup
  .object({
    firstname: yup.string().required(),
    lastname: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required().min(5),
  })
  .required();

const LandingPage = () => {
  const queryString = window.location.search;
  const email = queryString.replace("?", "");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
    setTimeout(() => {
      window.open("https://liberty-rider.com/", "_blank");
    }, 5000);
  };

  const [isSucessful, setIsSucessfull] = useState(false);

  return (
    <>
      <div className="container">
        <Container maxWidth="sm">
          <Stack spacing={3} alignItems="center">
            <img src={Image} alt="Liberty Rider" className="logo" />
            <h2> Prépare tes trajets à l'avance</h2>

            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ width: "300px" }}
              className="content"
            >
              <Stack spacing={2}>
                <TextField
                  fullWidth
                  label="Prénom"
                  id="firstname"
                  {...register("firstname", {
                    required: "required",
                  })}
                  type="text"
                />
                {errors.firstname && (
                  <span className="alert" role="alert">
                    Ce champ est obligatoire
                  </span>
                )}

                <TextField
                  fullWidth
                  label="Nom"
                  id="lastname"
                  {...register("lastname", {
                    required: "required",
                  })}
                  type="text"
                />
                {errors.lastname && (
                  <span role="alert" className="alert">
                    {" "}
                    Ce champ est obligatoire
                  </span>
                )}

                <TextField
                  fullWidth
                  label={queryString.includes("@") ? email : "Email"}
                  id="email"
                  {...register("email", {
                    required: "required",
                    pattern: {
                      value: /\S+@\S+\.\S+/,
                      message:
                        "Les valeurs entrées ne matchent pas le format email",
                    },
                  })}
                  type="email"
                />
                {errors.email && (
                  <span className="alert" role="alert">
                    Ce champ est obligatoire
                  </span>
                )}

                <TextField
                  fullWidth
                  label="Mot de passe"
                  id="password"
                  {...register("password", {
                    required: "required",
                    minLength: {
                      value: 5,
                      message: "la taille minimal est de 5 caractères",
                    },
                  })}
                  type="password"
                />
                {errors.password && (
                  <span role="alert" className="alert">
                    La taille minimal est de 5 caractères
                  </span>
                )}

                <Button
                  variant="contained"
                  id="subscribe"
                  type="submit"
                  onClick={() => setIsSucessfull(true)}
                >
                  S'inscrire
                </Button>
                <Button
                  onClick={() =>
                    window.open("https://liberty-rider.com/", "_blank")
                  }
                  id="login"
                  variant="outlined"
                >
                  J'ai déja un compte
                </Button>
              </Stack>
            </form>
            {isSucessful && (
              <p className="success">
                Votre inscription a bien été prise en compte, vous allez être
                redirigé dans 5 secondes
              </p>
            )}
          </Stack>
        </Container>
      </div>
      <footer>
        <Stack spacing={3} alignItems="center">
          <h3 className="footer__subtitle">Disponible sur :</h3>
          <img src={Applis} alt="applis" /> ;
        </Stack>
      </footer>
    </>
  );
};

export default LandingPage;
