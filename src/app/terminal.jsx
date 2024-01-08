'use client'
import React from 'react';
import { TypeAnimation } from 'react-type-animation';
const TerminalText = () => {
    return (
        <TypeAnimation
            sequence={[
                'Welcome to Jack Davey\'s Website',
                1000, // Pause for 1000 ms
                'Section 1: About Me',
                // ... Add more text or sections as needed
            ]}
            wrapper="span"
            cursor={true}
        // repeat={Infinity}
        // style={{ fontSize: '20px', color: 'green' }}
        />
    )
};

export default TerminalText;


// Demo
{/* <TypeAnimation
    sequence={[
        // Same substring at the start will only be typed out once, initially
        'We produce food for Mice',
        1000, // wait 1s before replacing "Mice" with "Hamsters"
        'We produce food for Hamsters',
        1000,
        'We produce food for Guinea Pigs',
        1000,
        'We produce food for Chinchillas',
        1000,
    ]}
    wrapper="span"
    speed={50}
    style={{ fontSize: '2em', display: 'inline-block' }}
    repeat={Infinity}
/> */}