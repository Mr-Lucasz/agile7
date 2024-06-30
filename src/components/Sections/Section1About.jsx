import styles from "./Section1About.module.css";
import logovideo from "../../assets/logovideo.gif";
import { TypeAnimation } from "react-type-animation";
import { FormCTA } from "../FormCTA";
import React from "react";

export function Section1About() {
  return (
    <>
      <section id="section1" className={styles.section1}>
        <div className={styles.overlay}>
          <FormCTA />
        </div>
        <div className={styles.videoContainer}>
          <img src={logovideo} alt="Gif animado da Logotipo da Agile7 Tech" className={styles.video}/>
     
          <TypeAnimation
            className={styles.title}
            sequence={[
              'BEM-VINDO AO NOSSO SITE',
              1000,
              'DESCUBRA NOSSOS PRODUTOS',
              1000,
              'CONHEÇA A AGILE7 TECH',
              1000,
              'ENTRE EM CONTATO!',
              1000
            ]}
            speed={50}
            repeat={Infinity}
          />

          <p className={styles.glitchText}>
            TRANSFORMANDO IDEIAS
            <br /> EM INOVAÇÃO DIGITAL
          </p>
        </div>
      </section>
    </>
  );
}
