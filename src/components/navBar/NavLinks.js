// Importing react
import React from 'react';
// Importing styling
import styled from 'styled-components';
// Importing links
import navbarLinks from './MenuItems';
// importing link from router-dom
import { Link } from 'react-router-dom';

// Styling the container for the links
const LinksContainer = styled.div`
    display: flex;
    align-items: center;
    position: relative;
    background-color: transparent;
`;

// Styling the ul components, or the menu
const LinksMenu = styled.ul`
    display: flex;
    text-transform: uppercase;
    letter-spacing: 3px;
    position: relative;
    background-color: transparent;
`;

// Styling each li
const LinksItem = styled.li`
    display: flex;
    vertical-align: top;
    align-items: center;
    justify-content: space-between;
    margin-top: 15px;
    padding: 0 1.1rem;
    position: relative;
    background-color: transparent;
`;

// Styling each link 
const MyLink = styled(Link)`
    text-decoration: none;
    color: #6A1C2B;
    font-size: 1.3rem;
    margin: 0 2rem;
    position: relative;
    background-color: transparent;
    font-family: 'Open Sans', sans-serif;

    &:hover{
        color: #A42C43;
    }

    &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: #A42C43;
        left: 0;
        bottom: -5px;
        transform: scaleX(0);
        transform-origin: left;
        transition: transform .5s ease;
    }

    &:hover::after{
        transform: scaleX(1);
    }
`;

// Creating the navigation links component
function NavLinks(props) {
    return(
        // First we do the container
        <LinksContainer>
        {/* Inside the container, we have the menu of links, then the li, and finally links */}
            <LinksMenu>
            {/* Each link Menu has a bunch of items, with each item having a link */}
                {
                    navbarLinks.map(
                        (label) => {
                            return(
                                <LinksItem><MyLink to={`${label.path}`}>{label.title}</MyLink></LinksItem>
                            )
                        }
                    )
                }
            </LinksMenu>
        </LinksContainer>
    );
}

export default NavLinks;