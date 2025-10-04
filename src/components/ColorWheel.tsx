import React, {useState, Fragment} from 'react';
import Wheel from '@uiw/react-color-wheel';
import {hslaToHsva, HslaColor, HsvaColor, hsvaToHex} from "@/lib/colors";
import ShadeSlider from "@uiw/react-color-shade-slider";

function ColorWheel({color, changeColor}: {
    color: HslaColor,
    changeColor: (color: HslaColor) => void
}) {
    return (
        <Fragment>
            <Wheel width={384} height={384} color={{...hslaToHsva(color), v: 100}}
                   onChange={(color) => changeColor(color.hsla)}
                   pointer={({color, style}) => {
                       return (
                           <div style={style}>
                               <div
                                   style={{
                                       width: 24,
                                       height: 24,
                                       borderRadius: 100,
                                       boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.5), 0 1px 2px -1px rgb(0 0 0 / 0.5)',
                                       transform: 'translate(-5px, -5px)',
                                       mixBlendMode: 'difference',
                                       backgroundColor: color,
                                       border: '4px solid #fff',
                                   }}
                               />
                           </div>
                       );
                   }}/>
        </Fragment>
    );
}

export default ColorWheel;