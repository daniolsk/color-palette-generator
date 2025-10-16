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
import { Tooltip } from "react-tooltip";
import Color from "color";

const Home = () => {
    const [color, setColor] = useState<HsvaColor>({
        h: 313,
        s: 73,
        v: 61,
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
            <Tooltip
                id="cmyk-tooltip"
                place="bottom"
                style={{
                    borderRadius: "16px",
                    zIndex: "999999",
                    maxWidth: "320px"
                }}
                opacity={1}
            >
                Kolory w przestrzeni barw CMYK mogą odbiegać od ich odpowiedników w innych formatach.
            </Tooltip>
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
            <div className="justify-center flex text-lg gap-4 items-center cursor-pointer"
                 onClick={() => document.getElementById("landingPageVisualization")!.scrollIntoView({
                     behavior: "smooth", block: "center"
                 })}>
                <span>Przesuń niżej aby zobaczyć wizualizacje</span>
                <ArrowDown className="animate-bounce" />
            </div>
            <div className="max-w-[1280px] px-4 mx-auto w-full mb-8 mt-32 flex flex-col gap-2"
                 id="landingPageVisualization">
                <div className="tracking-tighter text-gray-600">
                    <span className="font-bold mr-1">#1</span>
                    Strona początkowa
                </div>
                <div className="flex gap-4">
                    <div className="p-4 shadow-lg rounded-2xl" style={{backgroundColor: palette[3]}}>
                        <LandingPageVisualization palette={palette} />
                    </div>
                </div>
                <div className="tracking-tighter mt-4 text-gray-600">Użyte kolory:</div>
                <div className="bg-white p-6 rounded-2xl flex flex-col gap-2">
                    <div className="flex gap-6 justify-between">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <div>Kolor główny</div>
                                <div className={`shadow-lg h-24 aspect-video px-4 py-2 rounded-2xl w-full flex justify-center items-center`} style={{backgroundColor: palette[0], color: Color(palette[0]).isLight() ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}}>
                                    { palette[0] }
                                </div>
                            </div>
                            <ul className="list-disc pl-5 text-sm">
                                <li>Tekst główny</li>
                                <li>Przycisk akcji</li>
                                <li>Elementy grafiki</li>
                            </ul>
                        </div>
                       <div className="flex flex-col gap-4">
                           <div className="flex flex-col gap-2">
                               <div className="text-sm">Kolor uzupełniający</div>
                               <div className={`shadow-lg h-24 aspect-video px-4 py-2 rounded-2xl w-full flex justify-center items-center`} style={{backgroundColor: palette[1], color: Color(palette[1]).isLight() ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}}>
                                   { palette[1] }
                               </div>
                           </div>
                           <ul className="list-disc pl-5 text-sm">
                               <li>Przycisk dodatkowy</li>
                               <li>Elementy grafiki</li>
                           </ul>
                       </div>
                       <div className="flex flex-col gap-4">
                           <div className="flex flex-col gap-2">
                               <div className="text-sm">Kolor akcentujący</div>
                               <div className={`shadow-lg h-24 aspect-video px-4 py-2 rounded-2xl w-full flex justify-center items-center`} style={{backgroundColor: palette[2], color: Color(palette[2]).isLight() ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}}>
                                   { palette[2] }
                               </div>
                           </div>
                           <ul className="list-disc pl-5 text-sm">
                               <li>Elementy logo</li>
                               <li>Drobne elementy grafiki</li>
                           </ul>
                       </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <div className="text-sm">Kolor tła</div>
                                <div className={`shadow-lg h-24 aspect-video px-4 py-2 rounded-2xl w-full flex justify-center items-center`} style={{backgroundColor: palette[3], color: Color(palette[3]).isLight() ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}}>
                                    { palette[3] }
                                </div>
                            </div>
                            <ul className="list-disc pl-5 text-sm">
                                <li>Elementy logo</li>
                                <li>Drobne elementy grafiki</li>
                            </ul>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <div className="text-sm">Kolor tekstu</div>
                                <div className={`shadow-lg h-24 aspect-video px-4 py-2 rounded-2xl w-full flex justify-center items-center`} style={{backgroundColor: palette[4], color: Color(palette[4]).isLight() ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}}>
                                    { palette[4] }
                                </div>
                            </div>
                            <ul className="list-disc pl-5 text-sm">
                                <li>Elementy logo</li>
                                <li>Drobne elementy grafiki</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-[1280px] px-4 mx-auto w-full mb-8 mt-16 flex flex-col gap-2">
                <div className="tracking-tighter text-gray-600">
                    <span className="font-bold mr-1">#2</span> Wizytówka
                </div>
                <div className="bg-white p-4 rounded-2xl z-0 pb-48 pt-8">
                    <BusinessCardVisualization palette={palette} />
                </div>
                <div className="tracking-tighter mt-4 text-gray-600">Użyte kolory:</div>
                <div className="bg-white p-6 rounded-2xl flex flex-col gap-2">
                    <div className="flex gap-6 justify-between">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <div>Kolor główny</div>
                                <div className={`shadow-lg h-24 aspect-video px-4 py-2 rounded-2xl w-full flex justify-center items-center`} style={{backgroundColor: palette[0], color: Color(palette[0]).isLight() ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}}>
                                    { palette[0] }
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <div className="text-sm">Kolor uzupełniający</div>
                                <div className={`shadow-lg h-24 aspect-video px-4 py-2 rounded-2xl w-full flex justify-center items-center`} style={{backgroundColor: palette[1], color: Color(palette[1]).isLight() ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}}>
                                    { palette[1] }
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <div className="text-sm">Kolor akcentujący</div>
                                <div className={`shadow-lg h-24 aspect-video px-4 py-2 rounded-2xl w-full flex justify-center items-center`} style={{backgroundColor: palette[2], color: Color(palette[2]).isLight() ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}}>
                                    { palette[2] }
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <div className="text-sm">Kolor tła</div>
                                <div className={`shadow-lg h-24 aspect-video px-4 py-2 rounded-2xl w-full flex justify-center items-center`} style={{backgroundColor: palette[3], color: Color(palette[3]).isLight() ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}}>
                                    { palette[3] }
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <div className="text-sm">Kolor tekstu</div>
                                <div className={`shadow-lg h-24 aspect-video px-4 py-2 rounded-2xl w-full flex justify-center items-center`} style={{backgroundColor: palette[4], color: Color(palette[4]).isLight() ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}}>
                                    { palette[4] }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="max-w-[1280px] px-4 mx-auto w-full mb-8 mt-16 flex flex-col gap-2">
                <div className="tracking-tighter text-gray-600">
                    <span className="font-bold mr-1">#3</span> Naklejki
                </div>
                <div className="bg-white p-4 rounded-2xl">
                    <StickersVisualization palette={palette} />
                </div>
                <div className="tracking-tighter mt-4 text-gray-600">Użyte kolory:</div>
                <div className="bg-white p-6 rounded-2xl flex flex-col gap-2">
                    <div className="flex gap-6 justify-between">
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <div>Kolor główny</div>
                                <div className={`shadow-lg h-24 aspect-video px-4 py-2 rounded-2xl w-full flex justify-center items-center`} style={{backgroundColor: palette[0], color: Color(palette[0]).isLight() ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}}>
                                    { palette[0] }
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <div className="text-sm">Kolor uzupełniający</div>
                                <div className={`shadow-lg h-24 aspect-video px-4 py-2 rounded-2xl w-full flex justify-center items-center`} style={{backgroundColor: palette[1], color: Color(palette[1]).isLight() ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}}>
                                    { palette[1] }
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <div className="text-sm">Kolor akcentujący</div>
                                <div className={`shadow-lg h-24 aspect-video px-4 py-2 rounded-2xl w-full flex justify-center items-center`} style={{backgroundColor: palette[2], color: Color(palette[2]).isLight() ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}}>
                                    { palette[2] }
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <div className="text-sm">Kolor tła</div>
                                <div className={`shadow-lg h-24 aspect-video px-4 py-2 rounded-2xl w-full flex justify-center items-center`} style={{backgroundColor: palette[3], color: Color(palette[3]).isLight() ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}}>
                                    { palette[3] }
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <div className="text-sm">Kolor tekstu</div>
                                <div className={`shadow-lg h-24 aspect-video px-4 py-2 rounded-2xl w-full flex justify-center items-center`} style={{backgroundColor: palette[4], color: Color(palette[4]).isLight() ? 'rgba(0,0,0,1)' : 'rgba(255,255,255,1)'}}>
                                    { palette[4] }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="p-4 text-center">Made with ❤️ by Daniel Skowron</div>
        </div>
    );
};

export default Home;
