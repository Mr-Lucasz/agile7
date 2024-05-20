import {Header} from "../components/Header.jsx";
import {Section1About} from "../components/Sections/Section1About.jsx";
import {Section2Service} from "../components/Sections/Section2Service.jsx";
import {Section3ForCustumers} from "../components/Sections/Section3ForCustumers.jsx";
import styles from "./Home.module.css";


export function Home() {
    return (
        <div className={styles.page}>
            <Header/>
            <main className={styles.mainContent}>
                <Section1About />
                <Section2Service/>
                <Section3ForCustumers />

            </main>
        </div>
    )
}