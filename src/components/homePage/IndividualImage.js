// importing react
import React from 'react';
// importing motion
import { motion } from 'framer-motion';

function IndividualImage(props) {
    return (
        <div className={props.className}>

                <motion.img src={props.imageSource}
                    style={props.style}
                    alt={props.className}
                    variants={props.imageVariant} />

        </div>
    );
}

export default IndividualImage;