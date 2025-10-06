"use client";

import { useState } from "react";
import { Palette } from "@/components/Palette";
import { ColorPicker } from "@/components/ColorPicker";
import { HsvaColor } from "@/lib/colors";

const Home = () => {
    const [color, setColor] = useState<HsvaColor>({ h: 0, s: 70, v: 100, a: 1 });

    return (
        <div className="grid grid-cols-2 min-h-screen xl:mx-auto xl:max-w-[1280px] p-4">
            <ColorPicker color={color} changeColor={(color) => setColor(color)} />
            <Palette color={color} />
        </div>
    );
};

export default Home;