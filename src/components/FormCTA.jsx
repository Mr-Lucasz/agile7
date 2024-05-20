import { LottieButton } from "./LottieButton";
import styles from "./FormCTA.module.css";
import TextField from "@mui/material/TextField";
import { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";

export function FormCTA() {
  const [modalIsOpen, setIsOpen] = useState(false);

  function clickOpenModalSendForm() {
    setIsOpen(true);
    console.log("Modal de envio de formulário aberto");
  }

  function clickCloseModalSendForm() {
    setIsOpen(false);
    console.log("Modal de envio de formulário fechado");
  }
  

  const modalBody = (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
      }}
    >
      <h2>Modal Title</h2>
      <p>Modal Content</p>
      <button onClick={clickCloseModalSendForm}>Close</button>
    </Box>
  );

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

        <LottieButton />
      </form>
      <Modal
        open={modalIsOpen}
        onClose={clickCloseModalSendForm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        {modalBody}
      </Modal>
    </>
  );
}
