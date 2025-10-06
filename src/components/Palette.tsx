import {
    CmykColor,
    hexToHsva,
    HslaColor,
    HsvaColor,
    hsvaToHex,
    hsvaToHsla,
    hsvaToRgba,
    RgbaColor,
    rgbaToHexa, rgbaToRgb, rgbToCmyk
} from "@/lib/colors";
import { Copy } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
    getMonochromatic,
    getAnalogous,
    getComplementary,
    getSplitComplementary,
    getTriad,
    getTetradic
} from "@/lib/colorSchemes";
import Color from "color";

export const Palette = ({ color }: { color: HsvaColor }) => {
    const [harmony, setHarmony] = useState<string>("monochromatic");
    const [hoveredIndex, setHoveredIndex] = useState<number|null>(null);

    const palette = useMemo(() => {
        const colorHex = hsvaToHex(color);
        switch (harmony) {
            case "monochromatic":
                return getMonochromatic(colorHex);
            case "analogous":
                return getAnalogous(colorHex);
            case "complementary":
                return getComplementary(colorHex);
            case "split-complementary":
                return getSplitComplementary(colorHex);
            case "triadic":
                return getTriad(colorHex);
            case "tetradic":
                return getTetradic(colorHex);
            default:
                return getMonochromatic(colorHex);
        }
    }, [harmony, color]);

    const getColorText = (color: RgbaColor | HslaColor | HsvaColor | CmykColor, format: string) => {
        switch (format) {
            case "RGB":
                color = color as RgbaColor;
                return `${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(color.b)}`;
            case "HSV":
                color = color as HsvaColor;
                return `${Math.round(color.h)}, ${Math.round(color.s)}%, ${Math.round(color.v)}%`;
            case "HSL":
                color = color as HslaColor;
                return `${Math.round(color.h)}, ${Math.round(color.s)}%, ${Math.round(color.l)}%`;
            case "CMYK":
                color = color as CmykColor;
                return `${Math.round(color.c)}, ${Math.round(color.m)}, ${Math.round(color.y)}, ${Math.round(color.k)}`;
            default:
                return "";

        }
    };

    const copyPalette = async () => {
        await navigator.clipboard.writeText(palette.join(", "));
    };

    return (
        <div className="gap-8 py-8 flex flex-col items-center justify-center">
            <div className="flex gap-4 text-lg items-center">
                <h2 className="text-lg">Harmonia kolorów:</h2>
                <select
                    onChange={(e) => setHarmony(e.target.value)}
                    name="colorHarmony"
                    id="colorHarmony"
                    className="py-2 px-3 text-lg shadow-lg rounded-2xl focus:outline-none cursor-pointer transition"
                    style={{
                        backgroundColor: rgbaToHexa(hsvaToRgba({ ...color, a: 0.2 }))
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = rgbaToHexa(
                            hsvaToRgba({ ...color, v: Math.min(color.v + 10, 100), a: 0.3 })
                        )
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = rgbaToHexa(
                            hsvaToRgba({ ...color, a: 0.2 })
                        )
                    }}
                >
                    <option value="monochromatic">Monochromatyczna</option>
                    <option value="analogous">Analogiczna</option>
                    <option value="complementary">Dopełniająca</option>
                    <option value="split-complementary">Rozdzielnie dopełniająca</option>
                    <option value="triadic">Triadyczna</option>
                    <option value="tetradic">Tetradyczna (kwadratowa)</option>
                </select>
            </div>
            <div className="px-8 w-full flex-1">
                <div className="flex h-full flex-col bg-white rounded-2xl w-full items-center">
                    <h2 className="mt-8 text-xl font-medium">Twoja paleta barw:</h2>
                    <div className={`grid ${palette.length <= 3 ? 'grid-cols-1' : 'grid-cols-2'} auto-rows-fr gap-4 p-6 w-full h-full`}>
                        {palette.map((col, i) => {
                            const textColor = hoveredIndex === i
                                ? (Color(col).isLight() ? "rgba(0,0,0,1)" : "rgba(255,255,255,1)")
                                : (Color(col).isLight() ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.5)");
                            return (
                                <div
                                    key={i}
                                    className="w-full font-medium text-xl rounded-2xl flex items-center justify-center transition-all"
                                    style={{ backgroundColor: col, color: textColor }}
                                    onMouseEnter={() => setHoveredIndex(i)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    {hoveredIndex !== i ? col : null}
                                    {hoveredIndex === i && (
                                        <div className="h-full w-full flex flex-col justify-center items-center">
                                            <div
                                                className="mb-2 text-center cursor-pointer font-medium px-2 py-1 rounded-2xl flex gap-2 items-center transition-all"
                                                onClick={async () => {
                                                    await navigator.clipboard.writeText(col);
                                                }}
                                                style={{
                                                    backgroundColor: col
                                                }}
                                                onMouseEnter={(e) => {
                                                    e.currentTarget.style.backgroundColor = Color(col).isLight() ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)"
                                                }}
                                                onMouseLeave={(e) => {
                                                    e.currentTarget.style.backgroundColor = col
                                                }}
                                            >
                                                {col} <Copy size={16} />
                                            </div>
                                            <div className="flex flex-col gap-1 text-xs">
                                                <div
                                                    className="cursor-pointer px-2 py-1 rounded-2xl flex items-center gap-2 transition-all"
                                                    onClick={async () => {
                                                        await navigator.clipboard.writeText(getColorText(hsvaToRgba(hexToHsva(col)), "RGB"));
                                                    }}
                                                    style={{
                                                        backgroundColor: col
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = Color(col).isLight() ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)"
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = col
                                                    }}
                                                >
                                                    RGB: {getColorText(hsvaToRgba(hexToHsva(col)), "RGB")} <Copy size={12} />
                                                </div>
                                                <div
                                                    className="cursor-pointer px-2 py-1 rounded-2xl flex items-center gap-2 transition-all"
                                                    onClick={async () => {
                                                        await navigator.clipboard.writeText(getColorText(hsvaToHsla(hexToHsva(col)), "HSL"));
                                                    }}
                                                    style={{
                                                        backgroundColor: col
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = Color(col).isLight() ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)"
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = col
                                                    }}
                                                >
                                                    HSL: {getColorText(hsvaToHsla(hexToHsva(col)), "HSL")} <Copy size={12} />
                                                </div>
                                                <div
                                                    className="cursor-pointer px-2 py-1 rounded-2xl flex items-center gap-2 transition-all"
                                                    onClick={async () => {
                                                        await navigator.clipboard.writeText(getColorText(hexToHsva(col), "HSV")); <Copy size={12} />
                                                    }}
                                                    style={{
                                                        backgroundColor: col
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = Color(col).isLight() ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)"
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = col
                                                    }}
                                                >
                                                    HSV: {getColorText(hexToHsva(col), "HSV")} <Copy size={12} />
                                                </div>
                                                <div
                                                    className="cursor-pointer px-2 py-1 rounded-2xl flex items-center gap-2 transition-all"
                                                    onClick={async () => {
                                                        await navigator.clipboard.writeText(getColorText(rgbToCmyk(rgbaToRgb(hsvaToRgba(hexToHsva(col)))), "CMYK"));
                                                    }}
                                                    style={{
                                                        backgroundColor: col
                                                    }}
                                                    onMouseEnter={(e) => {
                                                        e.currentTarget.style.backgroundColor = Color(col).isLight() ? "rgba(255, 255, 255, 0.3)" : "rgba(0, 0, 0, 0.3)"
                                                    }}
                                                    onMouseLeave={(e) => {
                                                        e.currentTarget.style.backgroundColor = col
                                                    }}
                                                >
                                                    CMYK: {getColorText(rgbToCmyk(rgbaToRgb(hsvaToRgba(hexToHsva(col)))), "CMYK")} <Copy size={12} />
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
            <div onClick={copyPalette} className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-2xl hover:bg-gray-300 transition">
                Kopiuj całą paletę <Copy />
            </div>
        </div>
    );
};