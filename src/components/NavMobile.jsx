
import { useState } from "react";
import useRef from "react";
import {Squash as Hamburger} from 'hamburger-react'
import { AnimatePresence,motion } from "framer-motion";
import { BiHomeAlt2 } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";
import { PiChatCircleBold } from "react-icons/pi";


export const NavMobile = () => {

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
    
    const [open, setOpen] = useState(false);

    return (
        
    <div className="hidden">
        <Hamburger toggled={open} toggle={setOpen}  
        color="#fff"
        />
        <AnimatePresence>
            {open && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="nav-mobile"
                >
                    <ul>
                        {routes.map((route, index) => (
                            <li key={index}>
                                <a href={route.path}>{route.name}</a>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            )}
        </AnimatePresence>
        
    </div>

    );

}