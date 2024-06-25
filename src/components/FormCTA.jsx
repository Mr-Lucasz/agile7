import { LottieButton } from "./LottieButton";
import styles from "./FormCTA.module.css";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import Checkbox from "@mui/material/Checkbox";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import axios from "axios";
import { useForm } from "react-hook-form";
import { URL_BACKEND } from "../config";

export function FormCTA() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();

  const [open, setOpen] = useState(false);
  const formValues = watch();
  const [checked, setChecked] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const onSubmit = async (data) => {
    if (!data.nome) {
      setErrorMessage("O campo Nome é obrigatório.");
      return;
    }

    if (!data.email) {
      setErrorMessage("O campo Email é obrigatório.");
      return;
    }
    // Add a simple regex check for email format validation
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(data.email)) {
      setErrorMessage("Formato de email inválido.");
      return;
    }

    if (!data || typeof data !== "object") {
      return;
    }

    if (Object.values(data).includes("") || !checked) {
      setOpen(true);
      console.log("Please fill all fields and check the checkbox");
      return;
    }

    for (let key in data) {
      if (data[key] === "") {
        console.log(`The field ${key} is empty. Please fill all fields.`);
        return;
      }
    }

    try {
      console.log(URL_BACKEND);
      const response = await axios.post(URL_BACKEND, data);
      console.log(response.data);
      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error(`Error: ${error}`);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const textFieldStyles = {
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInputLabel-root": {
      color: "white",
    },
    "& .MuiInputLabel-shrink": {
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
      "& input": {
        color: "white",
      },
    },
  };

  return (
    <>
      <form className={styles.formCta} onSubmit={handleSubmit(onSubmit)}>
        <h2>Entre em contato com a AGILE7 TECH.</h2>
        <p>Deixe suas informações e retornaremos o mais breve possível.</p>

        <div className={styles.container1}>
          <TextField
            {...register("nome", { required: true })}
            sx={textFieldStyles}
            id="nome"
            label="Nome"
            variant="outlined"
            required={true}
            fullWidth
          />
          <TextField
            {...register("email", { required: true })}
            sx={textFieldStyles}
            id="email"
            label="Email"
            variant="outlined"
            required={true}
            fullWidth
          />
        </div>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
        <div className={styles.container2}>
          <TextField
            {...register("telefone", { required: true })}
            sx={textFieldStyles}
            id="telefone"
            label="Telefone"
            variant="outlined"
            required={true}
            fullWidth
          />
          <TextField
            {...register("empresa", { required: true })}
            sx={textFieldStyles}
            id="empresa"
            label="Empresa"
            variant="outlined"
            required={true}
            fullWidth
          />
        </div>
        <div className={styles.container3}>
          <TextField
            {...register("mensagem", { required: true })}
            sx={{
              ...textFieldStyles,
              "& .MuiInputBase-input": {
                color: "white",
              },
            }}
            id="mensagem"
            label="Nos fale mais sobre o seu negócio."
            multiline
            rows={4}
            variant="outlined"
            fullWidth
          />
        </div>
        <div className={styles.container4}>
          <Checkbox
            {...register("checkbox", { required: true })}
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            sx={{
              color: "white",
              "&.Mui-checked": {
                color: "white",
              },
            }}
          />
          <p>
            Eu concordo compartilhar esses dados para contato com a AGILE7 TECH.
          </p>
        </div>

        <LottieButton
          onSubmit={onSubmit}
          formState={{ ...formValues, checkbox: checked, ...errors }}
        />
        {isSuccess && (
          <Snackbar
            open={isSuccess}
            autoHideDuration={6000}
            onClose={() => setIsSuccess(false)}
          >
            <Alert onClose={() => setIsSuccess(false)} severity="success">
              Formulário enviado com sucesso!
            </Alert>
          </Snackbar>
        )}
      </form>
    </>
  );
}