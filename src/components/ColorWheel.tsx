import React, { useState, Fragment } from "react";
import Wheel from "@uiw/react-color-wheel";
import { HsvaColor } from "@/lib/colors";

function ColorWheel({ color, changeColor }: {
    color: HsvaColor, changeColor: (color: HsvaColor) => void
}) {
    return (
        <Fragment>
            <Wheel style={{cursor: "pointer"}} width={288} height={288} color={{ ...color, v: 100 }}
                   onChange={(colorResult) => {
                       changeColor({ ...colorResult.hsva, v: color.v });
                   }}
                   pointer={({ color, style }) => {
                       return (
                           <div style={style}>
                               <div
                                   style={{
                                       width: 24,
                                       height: 24,
                                       borderRadius: 100,
                                       boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.5), 0 1px 2px -1px rgb(0 0 0 / 0.5)",
                                       transform: "translate(-12px, -12px)",
                                       mixBlendMode: "difference",
                                       backgroundColor: color,
                                       border: "4px solid #fff"
                                   }}
                               />
                           </div>
                       );
                   }} />
        </Fragment>
    );
}

export default ColorWheel;