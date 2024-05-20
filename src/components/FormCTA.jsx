
import { LottieButton} from "./LottieButton";
import styles from "./FormCTA.module.css";
import TextField from "@mui/material/TextField";

export function FormCTA() {
  const textFieldStyles = {
    "& label.Mui-focused": {
      color: "white", // Cor do label quando está focado
    },
    "& .MuiInputLabel-root": {
      // Cor do label em seu estado padrão
      color: "white",
    },
    "& .MuiInputLabel-shrink": {
      // Cor do label quando está flutuando (shrink)
      color: "white",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white", // Cor da borda padrão
      },
      "&:hover fieldset": {
        borderColor: "white", // Cor da borda ao passar o mouse
      },
      "&.Mui-focused fieldset": {
        borderColor: "white", // Cor da borda quando está focado
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
      <h2>Entre em contato com a AGILE SOLUTION7.</h2>
      <p>Deixe suas informações e retornaremos o mais breve possível.</p>

      <div className={styles.container1}>
        <TextField
          sx={textFieldStyles}
          id="outlined-basic"
          label="Nome Completo"
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
      <LottieButton />

    </form>


    </>
  );
}
