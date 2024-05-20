import styles from "./Section3ForCustumers.module.css";
import { Viewer, CameraFlyTo } from "resium";
import { Cartesian3 } from "cesium";

export function Section3ForCustumers() {
  // Latitude: 27°03'2
  // Longitude: 49°31'0
  const ibiramaPosition = Cartesian3.fromDegrees(-49.5193, -27.0542, 1200); // Longitude, Latitude, Altitude

  return (
    <section id="section3" className={styles.section3}>
      <div className={styles.overlayMain}>
        <div className={styles.overlay1}>
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
          <h1>Agile7Tech</h1>
          <p>
            Bem vindo a Agile7 Tech, sua parceira de soluções de software
            inovadores e de muita qualidade. Com menos de 3 meses no mercado,
            nossa empresa já se destaca no segmento de desenvolvimento de
            software, oferencendo um difencial único: o Foco total em Qualidade,
            Engenharia de Software e inovação. Localizada em Santa Catarina -
            Brasil, mas com alcance global, estamos prontos para atender ás
            necessidade de empresas de todos os tamanhos, segmentos e
            localizações. Na Agile7 Tech, acreditamos que a tecnologia é a chave
            para o sucesso de qualquer empresa, e por isso, estamos sempre em
            busca de novas tecnologias, metodologias e práticas de mercado para
            oferecer o melhor para nossos clientes.
            <br />
            <b>
              Entre em contato conosco e descubra como a Agile7 Tech pode ajudar
              a sua empresa a crescer e se destacar no mercado.
            </b>
          </p>
        </div>
      </div>

      <footer className={styles.footer}>
        <p className={styles.glitchText}>Agile Pioneers7</p>
      </footer>
    </section>
  );
}
