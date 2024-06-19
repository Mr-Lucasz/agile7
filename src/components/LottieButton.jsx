import React, { useState } from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/Button.json';
import PropTypes from 'prop-types';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

export function LottieButton({ onSubmit, formState }) {
  const [isHovered, setIsHovered] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  const [open, setOpen] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: false,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid meet',
    },
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const handleClick = async () => {
    const emptyFields = Object.entries(formState)
      .filter(([key, val]) => val === '' || val === null || val === undefined)
      .map(([key]) => key);

    if (emptyFields.length > 0) {
      setMissingFields(emptyFields);
      setOpen(true);
      return;
    }

    await onSubmit();
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ width: '80%', height: 'auto', cursor: 'pointer' }}
    >
      <Lottie
        options={defaultOptions}
        isStopped={!isHovered}
        isPaused={!isHovered}
      />
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert severity="warning">
          Por favor, preencha os seguintes campos: {missingFields.join(', ')}
        </Alert>
      </Snackbar>
    </div>
  );
}

LottieButton.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  formState: PropTypes.object.isRequired,
};