import {
    hsvaToHex, HsvaColor, hsvaToRgba, rgbaToHexa, HslaColor, CmykColor, RgbaColor
} from "@/lib/colors";
import { Copy } from "lucide-react";

export const ColorFormatDisplay = ({ color, colorInFormat, label }: {
    color: HsvaColor, colorInFormat: RgbaColor | HslaColor | HsvaColor | CmykColor, label: string
}) => {
    const getColorText = () => {
        switch (label) {
            case "RGB":
                colorInFormat = colorInFormat as RgbaColor;
                return `${Math.round(colorInFormat.r)}, ${Math.round(colorInFormat.g)}, ${Math.round(colorInFormat.b)}`;
            case "HSV":
                colorInFormat = colorInFormat as HsvaColor;
                return `${Math.round(colorInFormat.h)}, ${Math.round(colorInFormat.s)}%, ${Math.round(colorInFormat.v)}%`;
            case "HSL":
                colorInFormat = colorInFormat as HslaColor;
                return `${Math.round(colorInFormat.h)}, ${Math.round(colorInFormat.s)}%, ${Math.round(colorInFormat.l)}%`;
            case "CMYK":
                colorInFormat = colorInFormat as CmykColor;
                return `${Math.round(colorInFormat.c)}, ${Math.round(colorInFormat.m)}, ${Math.round(colorInFormat.y)}, ${Math.round(colorInFormat.k)}`;

        }
    };

    return (
        <div className="relative">
            <div className="text-sm text-gray-600 mb-0.5">
                {label}
            </div>
            <div
                className="w-full items-center gap-8 flex px-4 py-2 text-lg border-2 rounded-2xl font-medium focus:outline-none cursor-pointer transition"
                style={{
                    borderColor: hsvaToHex({ ...color, v: 30 }),
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
                <div className="flex-1">{getColorText()}</div>
                <Copy />
            </div>
        </div>
    );
};