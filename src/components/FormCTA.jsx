import { LottieButton } from "./LottieButton";
import styles from "./FormCTA.module.css";
import TextField from "@mui/material/TextField";
import { useState } from "react";
// checkbox mui material
import Checkbox from "@mui/material/Checkbox";
// snackbar mui material
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { submitForm } from '../server/Service';
import { useForm } from "react-hook-form";

export function FormCTA() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [open, setOpen] = useState(false);

  const onSubmit = async (data) => {
    await submitForm(data);
    setOpen(true);
    reset();
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
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
      //   letra digitada no input tem que ficar white tbm
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
                {...register("name", { required: true })}
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
            <Checkbox
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

          <LottieButton/>
          <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="success">
              Form submitted successfully!
            </Alert>
          </Snackbar>
        </form>
      </>
  );
}
