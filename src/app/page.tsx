"use client";

import { useState } from "react";
import { Palette } from "@/components/Palette";
import { ColorPicker } from "@/components/ColorPicker";
import { HsvaColor, hsvaToHex } from "@/lib/colors";

const Home = () => {
    const [color, setColor] = useState<HsvaColor>({ h: 180, s: 70, v: 100, a: 1 });

    return (
        <div className="flex flex-col min-h-screen">
            <div className="p-6 text-center text-2xl font-medium tracking-tight shadow-lg" style={{
                backgroundColor: hsvaToHex({...color, s: 20}),
            }}>Generator palet kolorów</div>
            <div className="grid grid-cols-2 flex-1 p-4 xl:mx-auto xl:w-[1280px]">
                <ColorPicker color={color} changeColor={(color) => setColor(color)} />
                <Palette color={color} />
            </div>
            <div className="p-4 text-center">Made with ❤️ by Daniel Skowron</div>
        </div>
    );
};

export default Home;