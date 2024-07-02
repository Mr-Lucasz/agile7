import styles from "./Header.module.css";
import Agile_Solutions from "../assets/Agile_Solutions.svg";
import Whatsapp from "../assets/Whatsapp.svg";
import { NavMobile } from "./NavMobile";
import React from "react";

export function Header() {
  const whatsappNumber = "5594981183574";
  const whatsappMessage = "Olá, Agile7! Tenho um ideia para um projeto. Podemos conversar?";

  function openWhatsapp() {
    window.open(`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`, "_blank");
    console.log("Whatsapp opened");
  }

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <img src={Agile_Solutions} alt="Agile Solutions" />
      </div>
      <nav className={styles.navbar}>
        <ul>
          <li>
            <a href="#section1">Sobre Nós</a>
          </li>
          <li>
            <a href="#section2">Nossos Serviços</a>
          </li>
          <li>
            <a href="#section3">Para Clientes</a>
          </li>
        </ul>
      </nav>

      <button id="btn-contato" className={styles.button} onClick={openWhatsapp}>
        CONTATO
        <img src={Whatsapp} alt="Whatsapp" />
      </button>
        <NavMobile />
    </header>
  );
}
