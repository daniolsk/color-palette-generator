import { ColorFormatDisplay } from "./ColorFormatDisplay";
import ColorWheel from "@/components/ColorWheel";
import {
    hsvaToHex, hexToHsva, hsvaToRgba, rgbaToHexa, hsvaToHsla, rgbToCmyk, rgbaToRgb, HsvaColor
} from "@/lib/colors";
import { BrightnessSlider } from "@/components/BrightnessSlider";

export const ColorPicker = ({ color, changeColor }: {
    color: HsvaColor, changeColor: (color: HsvaColor) => void
}) => {
    return (
        <div className="min-h-screen gap-12 flex flex-col items-center justify-center">
            <div className="flex justify-center items-center gap-4">
                <span className="font-medium text-2xl">#</span>
                <input
                    className="text-center px-4 py-2 w-38 text-2xl border-2 rounded-2xl font-medium focus:outline-none transition"
                    type="text"
                    value={hsvaToHex(color).substring(1)}
                    onChange={(
                        e => {
                            const newColor = hexToHsva("#" + e.target.value);
                            changeColor(newColor);
                            e.currentTarget.style.backgroundColor = rgbaToHexa(hsvaToRgba(
                                { ...newColor, v: Math.min(newColor.v + 10, 100), a: 0.3 }
                            ))
                        }
                    )}
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
                />
                <div
                    className="aspect-square w-12 h-12 rounded-2xl shadow-sm"
                    style={{ backgroundColor: hsvaToHex(color) }}
                />
            </div>
            <div>
                <ColorWheel color={color} changeColor={(color: HsvaColor) => changeColor(color)} />
            </div>
            <div className="w-96 flex flex-col items-center gap-2">
                <BrightnessSlider color={color} changeColor={(color: HsvaColor) => changeColor(color)} />
            </div>
            <div className="w-full grid grid-cols-2 gap-4 px-4">
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
