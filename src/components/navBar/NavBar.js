// Importing react
import React, { useState, useEffect } from "react";
// Importing MediaQuery
import { useMediaQuery } from "react-responsive";
// Importing styled to be able to style the page
import styled from "styled-components";
// Importing the logo
import MonkeLogo from "../../components/logo/Logo";
// Importing the links
import NavLinks from "./NavLinks.js";
// Importing the sizes
import { DeviceSize } from '../responsive/DeviceSize';
// Importing the smaller navigation links
import HamNavLinks from "./HamNavLinks";
// Importing the login
import RightSideNavbar from './RightSideNavbar';
// Importing css
import './NavBar.css'

// Main Wrapper for Navbar
const Wrapper = styled.div`
    display: flex;
    width: 100%;
    max-width: 1920px;
    height: 6rem;
    align-items: center;
    padding: 0 1.5 rem;
    z-index: 9999;
    border-bottom: 2px solid rgba(255,255,255,.05);
    margin-left: 50px;
    margin-right: 50px;
    position: relative;
    background-color: transparent;
`;

// Left side of Navbar
const LeftSide = styled.div`
    display: flex;
    position: relative;
    background-color: transparent;
`;

// Center of Navbar
// Flex is a way to define how much each portion is gonna take of the size given to it
const Center = styled.div`
    display: flex;
    flex: 2;
    height: 100%;
    justify-content: center;
    align-items: center;
    position: relative;
    background-color: transparent;
`;

// Right side of Navbar
const RightSide = styled.div`
    display: flex;
    position: relative;
    background-color: transparent;
`;


function NavBar(props) {
    // Change to hamburger when smaller than specific size
    const isSmaller = useMediaQuery({ maxWidth: DeviceSize.smaller });

    // Setting state of whether or not scrolling
    const [scrolled, setScrolled] = useState(false);

    // Function to handle Scrolling event
    const handleScroll = () => {
        const offset = window.scrollY;
        return offset > 0
        ? setScrolled(true)
        : setScrolled(false);
    };
    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
    });

    // Define navbar classes - to change state based on scroll
    let navbarClasses = ['navbar navbar-expand-lg']
    if (scrolled)
        navbarClasses.push('scrolled');

    return(
        <nav className={navbarClasses.join(" ")} style={{ "zIndex": "9999" }}>
            <div className="container-fluid">
                <Wrapper>
                    {/* For the left side, we want to import the MonkeLogo component */}
                    <LeftSide>
                        <MonkeLogo />
                    </LeftSide>

                    <Center>
                        {/* For the middle, we want to add the different links */}
                        {/* If smaller, hide search bar */}
                        {!isSmaller && <NavLinks />}
                    </Center>

                    <RightSide>
                        {/* If bigger, show search bar */}
                        {!isSmaller && <RightSideNavbar />}
                        {/* If smaller, render smaller navbar */}
                        {isSmaller && <HamNavLinks />}
                    </RightSide>

                </Wrapper>
            </div>
        </nav>
    )

};

export default NavBar;