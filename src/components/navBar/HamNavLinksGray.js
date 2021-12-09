// Importing react and useState
import React, { useState } from 'react';
// Importing style
import styled from 'styled-components';
// Importing the toggle motion path and attributes
import { MenuToggle } from './MenuToggle';
// Importing links
import navbarLinks from './MenuItems';
// Importing motion
import { motion } from 'framer-motion';
// import Link from react-router-fom
import { Link } from 'react-router-dom';

// Styling the container
const LinksContainerSmall = styled.div`
    height: 100%;
    display: flex;
    align-items: center;
    background-color: #F9F9FB;
`;

// Styling the ul components
const LinksMenuSmall = styled.ul`
    display: flex;
    flex-direction: column;
    position: fixed;
    height: 100%;
    width: 50%;
    text-transform: uppercase;
    letter-spacing: 3px;
    list-style: none;
    text-align: left;
    top: 5rem;
    background-color: #F9F9FB;
    left: 0;
`;

// Making the actual function of the smaller nav
function HamNavLinksGray(props) {
    // Setting the states
    const [isOpen, setOpen] = useState(false);

    return(
        <LinksContainerSmall>
            <MenuToggle isOpen={isOpen} toggle={() => setOpen(!isOpen)} />
            {/* This is essentially a format to ensure the 2nd (between ()) only happens if the first
                is true, so if it's open */}
            {isOpen && (
                    <LinksMenuSmall>
                        {/* Each link Menu has a bunch of items, with each item having a link */}
                        {
                            navbarLinks.map(
                                (label) => {
                                    return (
                                        <motion.li className="hamListGray"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 1 }}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        >
                                            <Link to={label.path} className="hamTextGray">{label.title}</Link>
                                        </motion.li>
                                    )
                                }
                            )
                        }
                    </LinksMenuSmall>
            )}
    </LinksContainerSmall>
    );
}

export default HamNavLinksGray;