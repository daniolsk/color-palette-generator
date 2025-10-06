import { ColorFormatDisplay } from "./ColorFormatDisplay";
import ColorWheel from "@/components/ColorWheel";
import {
    hsvaToHex, hexToHsva, hsvaToRgba, rgbaToHexa, hsvaToHsla, rgbToCmyk, rgbaToRgb, HsvaColor
} from "@/lib/colors";
import { BrightnessSlider } from "@/components/BrightnessSlider";
import { useEffect, useState } from "react";

export const ColorPicker = ({ color, changeColor }: {
    color: HsvaColor, changeColor: (color: HsvaColor) => void
}) => {
    const [inputValue, setInputValue] = useState(hsvaToHex(color).substring(1));
    const [invalidHex, setInvalidHex] = useState(false);

    const isValidHex = (value: string) => /^([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/.test(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            if (isValidHex(inputValue)) {
                const newColor = hexToHsva("#" + inputValue);
                changeColor(newColor);
                setInvalidHex(false);
            } else {
                setInvalidHex(true);
            }
        }, 500);

        return () => clearTimeout(handler);
    }, [inputValue, changeColor]);

    useEffect(() => {
        setInputValue(hsvaToHex(color).substring(1));
    }, [color]);

    return (
        <div className="gap-8 py-8 flex flex-col items-center justify-center desktop:sticky desktop:top-0">
            <div className="flex justify-center items-center gap-4">
                <span className="font-medium text-2xl">#</span>
                <input
                    className="text-center shadow-lg px-4 py-2 w-38 text-2xl rounded-2xl font-medium focus:outline-none transition"
                    type="text"
                    value={inputValue}
                    onChange={(e) => {
                        setInputValue(e.target.value);
                    }}
                    style={{
                        backgroundColor: rgbaToHexa(hsvaToRgba({ ...color, a: 0.2 })),
                        border: invalidHex ? "2px solid red" : "none",
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = rgbaToHexa(
                            hsvaToRgba({
                                ...color,
                                v: Math.min(color.v + 10, 100),
                                a: 0.3,
                            })
                        );
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = rgbaToHexa(
                            hsvaToRgba({ ...color, a: 0.2 })
                        );
                    }}
                />
                <div
                    className="aspect-square w-12 h-12 rounded-2xl shadow-lg"
                    style={{ backgroundColor: hsvaToHex(color) }}
                />
            </div>
            <div>
                <ColorWheel color={color} changeColor={(color: HsvaColor) => changeColor(color)} />
            </div>
            <div className="w-80 desktop:w-64 lg:w-96 flex flex-col items-center gap-2">
                <BrightnessSlider color={color} changeColor={(color: HsvaColor) => changeColor(color)} />
            </div>
            <div className="w-full grid gap-2 grid-cols-1 desktop:grid-cols-2 lg:gap-4 px-4">
                <ColorFormatDisplay color={color} colorInFormat={hsvaToRgba(color)} label="RGB" />
                <ColorFormatDisplay color={color} colorInFormat={color} label="HSV" />
                <ColorFormatDisplay color={color} colorInFormat={hsvaToHsla(color)} label="HSL" />
                <ColorFormatDisplay color={color}
                                    colorInFormat={rgbToCmyk(rgbaToRgb(hsvaToRgba(color)))}
                                    label="CMYK" />
            </div>
        </div>
    );
};
