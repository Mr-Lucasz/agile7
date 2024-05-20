import { LottieButton } from "./LottieButton";
import styles from "./FormCTA.module.css";
import TextField from "@mui/material/TextField";
import { useState } from "react";
// checkbox mui material
import Checkbox from "@mui/material/Checkbox";

export function FormCTA() {



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
      //   letra digitada no input tem que ficar white tbm
      "& input": {
        color: "white",
      },
    },
  };

  return (
    <>
      <form className={styles.formCta}>
        <h2>Entre em contato com a AGILE7 TECH.</h2>
        <p>Deixe suas informações e retornaremos o mais breve possível.</p>

        <div className={styles.container1}>
          <TextField
            sx={textFieldStyles}
            id="outlined-basic"
            label="Nome"
            variant="outlined"
            required={true}
            fullWidth
          />
          <TextField
            sx={textFieldStyles}
            id="outlined-basic"
            label="Email"
            variant="outlined"
            required={true}
            fullWidth
          />
        </div>
        <div className={styles.container2}>
          <TextField
            sx={textFieldStyles}
            id="outlined-basic"
            label="Telefone"
            variant="outlined"
            required={true}
            fullWidth
          />
          <TextField
            sx={textFieldStyles}
            id="outlined-basic"
            label="Empresa"
            variant="outlined"
            required={true}
            fullWidth
          />
        </div>
        <div className={styles.container3}>
          <TextField
            sx={textFieldStyles}
            id="outlined-multiline-static"
            label="Nos fale mais sobre o seu negócio."
            multiline
            rows={4}
            variant="outlined"
            fullWidth
          />
        </div>
        <div className={styles.container4}>
          <Checkbox color="primary"/>
          <p>
            Li e concordo com a{" "}
            <a href="#" className={styles.link}>
              Política de Privacidade
            </a>{" "}
            da AGILE7 TECH.
          </p>
        </div>

        <LottieButton />
      </form>
    </>
  );
}
