/// Section2.jsx

import Lottie from "react-lottie";
import animationData from "../../assets/section2.json"; // Caminho para o seu arquivo JSON
import Carousel from "./Carousel";
import foto1 from "../../assets/1.png";
import foto2 from "../../assets/2.png";
import foto3 from "../../assets/3.png";
import foto4 from "../../assets/4.png";
import foto5 from "../../assets/5.png";
import foto6 from "../../assets/6.png";
import { TypeAnimation } from "react-type-animation";


const images = [
  foto1,
  foto2,
  foto3,
  foto4,
  foto5,
  foto6,
];

import styles from "./Section2Service.module.css";
export function Section2Service() {
  const defaultOptions = {
    loop: true,
    autoplay: true, // Desligue o autoplay para controlar a animação com hover
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
    },
  };

  return (
    <section id="section2" className={styles.section2}>


        <div className={styles.overlay1}>
        <TypeAnimation
            className={styles.title}
            sequence={[
              'Não fique para trás.',
              1000,
              'Seus concorrentes já estão na pista',
              1000,
              'Aproveite cada oportunidade.',
              1000,
              'ENTRE EM CONTATO!',
              1000
            ]}
            speed={50}
            repeat={Infinity}
          />

      <Carousel images={images} />
      <p className={styles.legend}>
      Um site é essencial para desvendar o potencial do seu negócio.<br/> Com a <b>AGILE7 TECH</b>, você está equipado para vencer.
      </p>
        </div>
        <div className={styles.overlay2}>
      <Lottie
        options={defaultOptions}
        style={{ width: "80%", height: "auto"}}
      />
        </div>
    </section>
  );
}
