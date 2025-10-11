"use client";

import { useEffect, useState } from "react";
import { Palette } from "@/components/Palette";
import { ColorPicker } from "@/components/ColorPicker";
import { Toaster } from 'react-hot-toast';
import {
    HexColor, hslaToHsva,
    HsvaColor,
    hsvaToHex,
    hsvaToRgba, randomHslaColor,
    rgbaToHexa
} from "@/lib/colors";
import { ArrowDown, ArrowUp, Dice5, RefreshCcw } from "lucide-react";
import { LandingPageVisualization } from "@/components/LandingPageVisualization";
import {
    getAnalogous,
    getComplementary,
    getMonochromatic,
    getSplitComplementary,
    getTriad
} from "@/lib/colorSchemes";
import { BusinessCardVisualization } from "@/components/BusinessCardVisualization";
import { StickersVisualization } from "@/components/StickersVisualization";

const Home = () => {
    const [color, setColor] = useState<HsvaColor>({
        h: 343,
        s: 63,
        v: 80,
        a: 1
    });
    const [backgroundColor, setBackgroundColor] = useState<HsvaColor>({
        h: 0,
        s: 0,
        v: 100,
        a: 1
    });
    const [textColor, setTextColor] = useState<HsvaColor>({
        h: 0,
        s: 0,
        v: 0,
        a: 1
    });
    const [palette, setPalette] = useState<HexColor[]>([]);
    const [harmony, setHarmony] = useState<string>("analogous");
    const [showRefresh, setShowRefresh] = useState(false);

    useEffect(() => {
        const colorHex = hsvaToHex(color);

        setPalette(getNewPalette(colorHex, harmony) as HexColor[]);
    }, [color, harmony]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY;
            const oneVH = window.innerHeight * 0.5;
            setShowRefresh(scrollY >= oneVH);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const getNewPalette = (colorHex: string, harmony: string) => {
        let newPalette: string[];

        switch (harmony) {
            case "monochromatic":
                newPalette = getMonochromatic(colorHex);
                break;
            case "analogous":
                newPalette = getAnalogous(colorHex);
                break;
            case "complementary":
                newPalette = getComplementary(colorHex);
                break;
            case "split-complementary":
                newPalette = getSplitComplementary(colorHex);
                break;
            case "triadic":
                newPalette = getTriad(colorHex);
                break;
            default:
                newPalette = getMonochromatic(colorHex);
        }

        return [
            ...newPalette,
            hsvaToHex(backgroundColor).toUpperCase(),
            hsvaToHex(textColor).toUpperCase()
        ];
    };

    return (
        <div className="flex flex-col min-h-screen">
            <Toaster />
            <div
                className={`${
                    showRefresh
                        ? "opacity-100 pointer-events-auto"
                        : "opacity-0 pointer-events-none"
                } gap-2 flex fixed right-4 top-4 transition-all justify-center items-center z-40`}
            >
                <div
                    className="p-4 bg-white rounded-2xl shadow-lg"
                    onClick={() =>
                        setColor(hslaToHsva(
                            randomHslaColor(0, 359, 10, 90, 40, 60)
                        ))
                    }
                >
                    <Dice5
                        className="hover:-translate-y-1 transition-all active:scale-105 cursor-pointer"
                    />
                </div>
                <div
                    className="p-4 bg-white rounded-2xl shadow-lg"
                    onClick={() =>
                        setPalette(getNewPalette(hsvaToHex(color), harmony) as HexColor[])
                    }
                >
                    <RefreshCcw className="hover:rotate-120 cursor-pointer transition-all active:scale-105" />
                </div>
                <div
                    className="p-4 bg-white rounded-2xl shadow-lg"
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                    <ArrowUp className="cursor-pointer transition-all active:scale-105" />
                </div>
            </div>
            <div
                className="p-4 desktop:p-6 shadow-lg"
                style={{
                    backgroundColor: rgbaToHexa(
                        hsvaToRgba({
                            ...color,
                            v: Math.min(color.v + 10, 100),
                            a: 0.3
                        })
                    )
                }}
            >
                <div className="max-w-[1280px] mx-auto flex justify-between items-center">
                    <div className="text-xl desktop:text-2xl font-medium tracking-tighter">
                        Generator palet barw
                    </div>
                    <div className="text-lg desktop:text-xl py-2 px-3 cursor-pointer">
                        Jak to działa?
                    </div>
                </div>
            </div>
            <div
                className="grid grid-cols-1 gap-8 desktop:grid-cols-2 items-start flex-1 px-4 py-4 xl:mx-auto xl:w-[1280px]">
                <ColorPicker color={color} changeColor={setColor} />
                <Palette
                    palette={palette}
                    setHarmony={setHarmony}
                    color={color}
                    setRandomColor={() => {
                        setColor(hslaToHsva(
                            randomHslaColor(0, 359, 10, 90, 40, 60)
                        ))
                    }}
                    refreshPalette={() =>
                        setPalette(getNewPalette(hsvaToHex(color), harmony) as HexColor[])
                    }
                />
            </div>
            <div className="justify-center flex text-lg gap-4 items-center">
                <span>Przesuń niżej aby zobaczyć wizualizacje</span>
                <ArrowDown className="animate-bounce" />
            </div>
            <div className="max-w-[1280px] px-4 mx-auto w-full mb-8 mt-32 flex flex-col gap-2">
                <div className="tracking-tighter text-gray-600">
                    <span className="font-bold mr-1">#1</span>
                    Strona początkowa
                </div>
                <div className="bg-white p-4 rounded-2xl">
                    <LandingPageVisualization palette={palette} />
                </div>
            </div>
            <div className="max-w-[1280px] px-4 mx-auto w-full mb-8 mt-16 flex flex-col gap-2">
                <div className="tracking-tighter text-gray-600">
                    <span className="font-bold mr-1">#2</span> Wizytówka
                </div>
                <div className="bg-white p-4 rounded-2xl z-0 pb-68 pt-8">
                    <BusinessCardVisualization palette={palette} />
                </div>
            </div>
            <div className="max-w-[1280px] px-4 mx-auto w-full mb-8 mt-16 flex flex-col gap-2">
                <div className="tracking-tighter text-gray-600">
                    <span className="font-bold mr-1">#3</span> Naklejki
                </div>
                <div className="bg-white p-4 rounded-2xl">
                    <StickersVisualization palette={palette} />
                </div>
            </div>
            <div className="p-4 text-center">Made with ❤️ by Daniel Skowron</div>
        </div>
    );
};

export default Home;
