import  { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import styles from "./CardProcess.module.css"; 
import { buildSeamlessLoop, scrubTo } from "./utils";

gsap.registerPlugin(ScrollTrigger);

export function CardProcess() {
 // Using refs to store DOM nodes for manipulation
 const galleryRef = useRef(null);
 const cardsRef = useRef(null);
 const prevButtonRef = useRef(null);
 const nextButtonRef = useRef(null);

 useEffect(() => {
   const spacing = 0.1;
   const snap = gsap.utils.snap(spacing);
   const cards = gsap.utils.toArray('.cards li', cardsRef.current);
   const seamlessLoop = buildSeamlessLoop(cards, spacing);
   let iteration = 0;

   const scrub = gsap.to(seamlessLoop, {
     totalTime: 0,
     duration: 0.5,
     ease: "power3",
     paused: true
   });

   const trigger = ScrollTrigger.create({
     start: 0,
     onUpdate(self) {
        
     },
     end: "+=3000",
     pin: galleryRef.current
   });

   // Event listeners for buttons
   prevButtonRef.current.addEventListener("click", () => scrubTo(scrub.vars.totalTime - spacing));
   nextButtonRef.current.addEventListener("click", () => scrubTo(scrub.vars.totalTime + spacing));

   // Cleanup function
   return () => {
     trigger.kill();
     scrub.kill();
     seamlessLoop.kill();
     // Remove event listeners if they were added
     if (prevButtonRef.current) {
       prevButtonRef.current.removeEventListener("click", () => scrubTo(scrub.vars.totalTime - spacing));
     }
     if (nextButtonRef.current) {
       nextButtonRef.current.removeEventListener("click", () => scrubTo(scrub.vars.totalTime + spacing));
     }
   };
 }, []);

  return (
    <div className={styles.gallery}>
      <ul className={styles.cards}>
        <li>0</li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>4</li>
        <li>5</li>
      </ul>
      <div className={styles.actions}>
        <button className={styles.prev}>Prev</button>
        <button className={styles.next}>Next</button>
      </div>
    </div>
  );
}
