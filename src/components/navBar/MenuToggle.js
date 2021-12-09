// Importing react
import React from 'react';
// Importing framer motion
import { motion } from 'framer-motion';
// Importing styles
import styled from 'styled-components';

// Making the hamburger button
const Button = styled.div`
    z-index: 99;
    cursor: pointer;
`;

// Making the path of the props for animation. We set this to be a function, which has
// motion.path with specific animated path
const Path = (props) => (
    <motion.path 
        fill="transparent"
        strokeLinecap="round" // Shape at endpoints of subpath
        strokeWidth="3" // Distance between edges of a stroke
        stroke="#6A1C2B" // Defines the color (gradients and such)
        {...props} // Spread attribute, pass all prop parameters to this effect
    />
);

// Defining the transition
const transition = { duration: 0.3 };

// Making the MenuToggle function. It takes two parameters, toggle and isOpen 
export function MenuToggle({ toggle, isOpen }) {
    // Return the following
    return(
        // Button to be toggled on click
        <Button onClick={toggle}>
            {/* Making the svg and setting its parameters. The viewBox is what we see the svg through/window */}
            <svg width="23" height="23" viewBox="0 0 23 23">
                <Path
                    animate={isOpen ? "open" : "closed"}
                    initial={false}
                    variants={{
                        closed: { d: "M 2 2.5 L 20 2.5", stroke: "#6A1C2B" },
                        open: { d: "M 3 16.5 L 17 2.5", stroke: "#6A1C2B" },
                    }}
                    transition={transition}
                />
                <Path
                    d="M 2 9.423 L 20 9.423"
                    stroke="#6A1C2B"
                    animate={isOpen ? "open" : "closed"}
                    initial={false}
                    variants={{
                        closed: { opacity: 1 },
                        open: { opacity: 0 },
                    }}
                    transition={transition}
                />
                <Path
                    animate={isOpen ? "open" : "closed"}
                    initial={false}
                    variants={{
                        closed: { d: "M 2 16.346 L 20 16.346", stroke: "#6A1C2B" },
                        open: { d: "M 3 2.5 L 17 16.346", stroke: "#6A1C2B" },
                    }}
                    transition={transition}
                />
            </svg>
        </Button>
    );
}

