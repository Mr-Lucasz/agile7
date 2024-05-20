import styles from "./Section3ForCustumers.module.css";
import { Viewer, CameraFlyTo } from "resium";
import { Cartesian3 } from "cesium";
import Agile_Solutions from "../../assets/Agile_Solutions.svg";

export function Section3ForCustumers() {
  // Latitude: 27°03'2
  // Longitude: 49°31'0
  const ibiramaPosition = Cartesian3.fromDegrees(-49.6435,  -27.2145, 5000); // Longitude, Latitude, Altitude

  return (
    <section id="section3" className={styles.section3}>
      <div className={styles.overlayMain}>
        <div className={styles.overlay1}>
        <h1 className={styles.title}>Estamos localizados aqui&#128205;Alto Vale do Itajaí - SC
</h1>
          <Viewer
            style={{ width: "90%", height: "100%" }}
            timeline={false}
            animation={false}
            homeButton={false}
            fullscreenButton={false}
            vrButton={false}
            geocoder={false}
            sceneModePicker={false}
            navigationHelpButton={false}
          >
            <CameraFlyTo destination={ibiramaPosition} duration={2} />
          </Viewer>
        </div>
        <div className={styles.overlay2}>
          <h1 className={styles.title}>🚀 Agile7 Tech</h1>
          <p className={styles.content}>
            <span className={styles.bold}>Seja bem-vindo à Agile7 Tech,</span> a
            sua parceira em soluções de software inovadoras e de alta qualidade.
            Apesar de termos menos de 3 meses de mercado, já nos destacamos no
            segmento de desenvolvimento de software, graças ao nosso
            diferencial: um foco inabalável em Qualidade, Engenharia de Software
            e Inovação. 🎯
            <br />
            <br />
            Baseados em Santa Catarina, Brasil, mas com um alcance global,
            estamos prontos para atender às necessidades de empresas de todos os
            tamanhos, segmentos e localizações. 🌎 Na Agile7 Tech, acreditamos
            firmemente que a tecnologia é a chave para o sucesso de qualquer
            empresa. Por isso, estamos sempre em busca das últimas tecnologias,
            metodologias e práticas de mercado para oferecer o melhor aos nossos
            clientes. 💡
            <br />
            <br />
            <span className={styles.bold}>
              Entre em contato conosco e descubra como a Agile7 Tech pode
              impulsionar o crescimento da sua empresa e ajudá-la a se destacar
              no mercado. 🚀
            </span>
          </p>
        </div>
      </div>

      <footer className={styles.footer}>
        <p className={styles.glitchText}>Agile7 Tech</p>
        <img className={styles.logo} src={Agile_Solutions} alt="Agile7 Tech" />
      </footer>
    </section>
  );
}
