'use client'
import React from 'react';
import { TypeAnimation } from 'react-type-animation';
const TaglineTxt = () => {
    const delay = 1000;

    return (
        <TypeAnimation
            sequence={[
                "Developer",
                delay,
                "Designer",
                delay,
                "Tinkerer",
                delay,
                "Photographer",
                delay,
                "Ordained Minister",
                delay,
                "Audiophile",
                delay,
                "Pinewood Derby State Champion (2007 - 2009)",
                delay,
                "Sudoku Enthusiast",
                delay,
            ]}
            wrapper="span"
            cursor={true}
            repeat={Infinity}
        // style={{ fontSize: '20px', color: 'green' }}
        />
    )
};

export default TaglineTxt;
