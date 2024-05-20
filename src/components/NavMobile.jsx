import { useClickAway } from "react-use";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Squash as Hamburger } from "hamburger-react";
import { BiHomeAlt2 } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { PiChatCircleBold } from "react-icons/pi";
import styles from './NavMobile.module.css'; 

const routes = [
  {
    path: "#section1",
    name: "Sobre Nós",
    Icon: BiHomeAlt2,
  },
  {
    path: "#section2",
    name: "Serviços",
    Icon: FiSearch,
  },
  {
    path: "#section3",
    name: "Para Clientes",
    Icon: PiChatCircleBold,
  },
];

export const NavMobile = () => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef(null);

  useClickAway(ref, () => setOpen(false));




  
  return (
    <div ref={ref} className={styles.hidden}>
      <Hamburger toggled={isOpen} size={35} toggle={setOpen} color="#fff" />
        <AnimatePresence>
            {isOpen && (
            <motion.nav
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.2 }}
                className={styles.navMobile}
            >
                <ul>
                {routes.map(({ path, name, Icon }, idx) => (
                    <motion.li key={name} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 + idx / 10 }} className="nav-mobile-li">
                    <a href={path} onClick={() => setOpen((prev) => !prev)} className="nav-mobile-a">
                        <span className="nav-mobile-span">{name}</span>
                        <Icon className="nav-mobile-icon" />
                    </a>
                    </motion.li>
                ))}
                </ul>
            </motion.nav>
            )}
        </AnimatePresence>
    </div>
);
};