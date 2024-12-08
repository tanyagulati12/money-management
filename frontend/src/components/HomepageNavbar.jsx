import React from "react";
import {motion} from "framer-motion";
import {FaDollarSign} from "react-icons/fa6";
import {useState, useEffect} from "react";


const HomepageNavbar = () => {

    const [navbar_options, setNavbar] = useState([
        {name: "Dashboard", link: "/dashboard"},
        {name: "Company", link: "/company"},
        {name: "Login", link: "/register"},
    ]);
    useEffect(() => {
        if(localStorage.getItem("username") != null) {
            let tempNavbar = [...navbar_options];
            tempNavbar[2] = {name: "Log Out", link: "/logout"}
            setNavbar(tempNavbar);
        }
    }, []);
    return (
        <nav className={`fixed  w-[90%] left-1/2 -translate-x-1/2 text-white flex justify-between items-center p-8`}>
            <motion.h1
                animate={{
                    x: 0
                }}
                initial={{
                    x: -250
                }}
                transition={{
                    x: {
                        delay: 0.25,
                        duration: 0.75,
                        ease: [0.85, 0, 0.15, 1]
                    }
                }}
                className={`text-[1.25rem] flex justify-center items-center gap-1`}>
                <FaDollarSign/>
                Finance Zone
            </motion.h1>
            <ul className={`flex gap-[1rem]`}>
                {navbar_options.map((item, index) => {
                    return <motion.li
                        animate={{
                            y: 0
                        }}
                        initial={{
                            y: -100
                        }}
                        transition={{
                            y: {
                                delay: 0.1 * index,
                                ease: [0.85, 0, 0.15, 1],
                                duration: 0.75
                            }
                        }}
                        className={`hover:cursor-pointer hover:px-10 transition-all duration-300 hover:bg-white hover:text-black p-3 rounded-full`} key={index}
                        onClick={() => window.location.assign(item.link)}>{item.name}</motion.li>
                })}
            </ul>
        </nav>
    )
}


export default HomepageNavbar;