"use client";

import { useState } from "react";
import { Palette } from "@/components/Palette";
import { ColorPicker } from "@/components/ColorPicker";
import { HsvaColor } from "@/lib/colors";

const Home = () => {
    const [color, setColor] = useState<HsvaColor>({ h: 13.04, s: 100, v: 59.41, a: 1 });

    return (
        <div className="grid grid-cols-2 min-h-screen">
            <ColorPicker color={color} changeColor={(color) => setColor(color)} />
            <Palette />
        </div>
    );
};

export default Home;