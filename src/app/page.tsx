"use client";

import { useEffect, useState } from "react";
import { Palette } from "@/components/Palette";
import { ColorPicker } from "@/components/ColorPicker";
import { Toaster } from 'react-hot-toast';
import { HexColor, HsvaColor, hsvaToHex, hsvaToRgba, rgbaToHexa } from "@/lib/colors";
import { ArrowDown } from "lucide-react";
import { LandingPageVisualization } from "@/components/LandingPageVisualization";
import {
    getAnalogous,
    getComplementary,
    getMonochromatic,
    getSplitComplementary,
    getTetradic,
    getTriad
} from "@/lib/colorSchemes";

const Home = () => {
    const [color, setColor] = useState<HsvaColor>({ h: 143, s: 100, v: 100, a: 1 });
    const [palette, setPalette] = useState<HexColor[]>([]);
    const [harmony, setHarmony] = useState<string>("analogous");

    useEffect(() => {
        console.log(color, harmony)
        const colorHex = hsvaToHex(color);
        let newPalette: string[];

        switch (harmony) {
            case "monochromatic":
                newPalette = getMonochromatic(colorHex, 5);
                break;
            case "analogous":
                newPalette = getAnalogous(colorHex, 5);
                break;
            case "complementary":
                newPalette = getComplementary(colorHex, 5);
                break;
            case "split-complementary":
                newPalette = getSplitComplementary(colorHex, 5);
                break;
            case "triadic":
                newPalette = getTriad(colorHex, 5);
                break;
            case "tetradic":
                newPalette = getTetradic(colorHex, 5);
                break;
            default:
                newPalette = getMonochromatic(colorHex, 5);
        }

        setPalette(newPalette as HexColor[]);
    }, [color, harmony]);

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
            <div className="grid grid-cols-1 gap-16 desktop:grid-cols-2 items-start flex-1 px-4 py-4 xl:mx-auto xl:w-[1280px]">
                <ColorPicker color={color} changeColor={setColor} />
                <Palette palette={palette} setHarmony={setHarmony} color={color} />
            </div>
            <div className="justify-center flex gap-4 items-center">
                <span>Przesuń niżej aby zobaczyć wizualizacje</span>
                <ArrowDown className="animate-bounce" />
            </div>
            <div className="max-w-[1280px] mx-auto w-full mb-8 mt-32 flex flex-col gap-2">
                <div className="tracking-tighter text-gray-600"><span className="font-bold">#1</span> Przykładowa strona początkowa</div>
                <div className="bg-white p-4 rounded-2xl">
                    <LandingPageVisualization palette={palette} />
                </div>
            </div>
            <div className="max-w-[1280px] mx-auto w-full mb-8 mt-16 flex flex-col gap-2">
                <div className="tracking-tighter text-gray-600"><span className="font-bold">#2</span> Przykładowe grafiki</div>
                <div className="bg-white p-4 rounded-2xl">
                    <LandingPageVisualization palette={palette} />
                </div>
            </div>
            <div className="p-4 text-center">Made with ❤️ by Daniel Skowron</div>
        </div>
    );
};

export default Home;