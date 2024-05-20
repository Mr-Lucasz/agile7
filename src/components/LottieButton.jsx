import { useState } from "react";
import Lottie from "react-lottie";
import animationData from "../assets/Button.json"; // Caminho para o seu arquivo JSON
import PropTypes from "prop-types";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export function LottieButton({ onSubmit, formState }) {
  const [isHovered, setIsHovered] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  const [open, setOpen] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: false, // Desligue o autoplay para controlar a animação com hover
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
    },
  };

  // Funções para lidar com eventos de mouse
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };
  const handleClick = async () => {
    // Separate checkbox from other fields
    const { checkbox, ...otherFields } = formState;

    // Check if all fields are filled
    const emptyFields = Object.entries(otherFields)
      .filter(([key, val]) => val === "")
      .map(([key]) => key);

    // Check if checkbox is checked
    if (!checkbox) {
      emptyFields.push("checkbox");
    }

    console.log("Empty fields:", emptyFields); // Print out the empty fields

    if (emptyFields.length > 0) {
      setMissingFields(emptyFields);
      setOpen(true);
      return;
    }

    console.log("submit");
    console.log("Form data:", formState); // Print out the form data

    await onSubmit(formState); // Pass formState as argument to onSubmit
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ width: "80%", height: "auto", cursor: "pointer" }}
    >
      <Lottie
        options={defaultOptions}
        isStopped={!isHovered} // A animação é interrompida se não estiver em hover
        isPaused={!isHovered} // A animação é pausada se não estiver em hover
      />
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="warning">
          Por favor, preencha os seguintes campos: {missingFields.join(", ")}
        </Alert>
      </Snackbar>
    </div>
  );
}

LottieButton.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
};
