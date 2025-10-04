"use client";

import {useState} from "react";
import {Palette} from '@/components/Palette';
import {ColorPicker} from '@/components/ColorPicker'
import {HslaColor} from "@/lib/colors";

const Home = () => {
    const [color, setColor] = useState<HslaColor>({h: 13.04, s: 100, l: 59.41, a: 1})

    return (
        <div className="grid grid-cols-2 min-h-screen">
            <ColorPicker color={color} changeColor={(color) => setColor(color)}/>
            <Palette/>
        </div>
    );
}

export default Home;