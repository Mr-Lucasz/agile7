// src/pages/Home.jsx
import {Header} from "../components/Header.jsx";
import {Section1About} from "../components/Sections/Section1About.jsx";
import {Section2Service} from "../components/Sections/Section2Service.jsx";
import {Section3ForCustumers} from "../components/Sections/Section3ForCustumers.jsx";
import styles from "./Home.module.css";
import { FloatingWhatsApp } from 'react-floating-whatsapp'
import { useMediaQuery } from 'react-responsive';

export function Home() {

    const isMobile = useMediaQuery({ query: '(max-width: 767px)' });

    return (
        <div className={styles.page}>
            <Header/>
            <main className={styles.mainContent}>
                <Section1About />
                <Section2Service/>
                <Section3ForCustumers />
            </main>
            <FloatingWhatsApp
                phoneNumber="5594981183574"
                accountName="Agile7 Tech"
                avatar="https://gjiaddzqpmnyfhrdliuv.supabase.co/storage/v1/object/sign/AGILE/Agile_Solutions.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJBR0lMRS9BZ2lsZV9Tb2x1dGlvbnMucG5nIiwiaWF0IjoxNzE2NDA2NDY2LCJleHAiOjE3NDc5NDI0NjZ9.KMgbyXAnvcIzaN02Lsza5udu_HjqVRJEX9E-7ctkyqA&t=2024-05-22T19%3A34%3A26.919Z"
                chatMessage="Olá,Somos a Agile7 Tech! Nos conte como podemos te ajudar?"
                darkMode={true}
                size={30}
                backgroundColor="#25d366"
                styles={{
                    right: isMobile ? 1 : 10,
                }}

            
            />
        </div>
    )
}