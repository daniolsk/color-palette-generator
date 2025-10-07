"use client";

import { useState } from "react";
import { Palette } from "@/components/Palette";
import { ColorPicker } from "@/components/ColorPicker";
import { Toaster } from 'react-hot-toast';
import { HsvaColor, hsvaToRgba, rgbaToHexa } from "@/lib/colors";
import { ArrowDown } from "lucide-react";
import { PaletteVizualizations } from "@/components/PaletteVizualizations";

const Home = () => {
    const [color, setColor] = useState<HsvaColor>({ h: 143, s: 100, v: 100, a: 1 });

    return (
        <div className="flex flex-col min-h-screen">
            <Toaster />
            <div className="p-4 desktop:p-6 text-center text-xl desktop:text-2xl font-medium tracking-tight shadow-lg" style={{
                backgroundColor: rgbaToHexa(
                    hsvaToRgba({
                        ...color,
                        v: Math.min(color.v + 10, 100),
                        a: 0.3,
                    })
                )
            }}>Generator palet barw</div>
            <div className="grid grid-cols-1 desktop:grid-cols-2 items-start flex-1 p-4 xl:mx-auto xl:w-[1280px]">
                <ColorPicker color={color} changeColor={(color) => setColor(color)} />
                <Palette color={color} />
            </div>
            <div className="justify-center flex gap-4 items-center">
                <span>Przesuń niżej aby zobaczyć wizualizacje</span>
                <ArrowDown className="animate-bounce" />
            </div>
            <PaletteVizualizations />
            <div className="p-4 text-center">Made with ❤️ by Daniel Skowron</div>
        </div>
    );
};

export default Home;