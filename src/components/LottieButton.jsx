import { useState } from 'react';
import Lottie from 'react-lottie';
import animationData from '../assets/Button.json'; // Caminho para o seu arquivo JSON

export function LottieButton() {
  const [isHovered, setIsHovered] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: false, // Desligue o autoplay para controlar a animação com hover
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid meet',
    }
  };

  // Funções para lidar com eventos de mouse
  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{ width: '80%', height: 'auto', cursor: 'pointer'}}
    >
      <Lottie
        options={defaultOptions}
        isStopped={!isHovered} // A animação é interrompida se não estiver em hover
        isPaused={!isHovered} // A animação é pausada se não estiver em hover
      />
    </div>
  );
}