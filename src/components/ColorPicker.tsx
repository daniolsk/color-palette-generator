import {ColorFormatDisplay} from './ColorFormatDisplay'
import ColorWheel from "@/components/ColorWheel";
import {
    hsvaToHex,
    hexToHsva,
    hsvaToRgba, rgbaToHexa, hslaToHsva, hsvaToHsla, HslaColor, rgbToCmyk, rgbaToRgb, hsvaToRgbaString, HsvaColor
} from "@/lib/colors";

export const ColorPicker = ({color, changeColor}: {
    color: HsvaColor, changeColor: (color: HsvaColor) => void
}) => {
    return (
        <div className="min-h-screen gap-12 flex flex-col items-center justify-center">
            <div className="flex justify-center items-center gap-4">
                <span className="font-medium text-2xl">#</span>
                <input
                    className="text-center px-4 py-2 w-38 text-2xl border-2 rounded-2xl font-medium focus:outline-none"
                    type="text"
                    value={hsvaToHex(color).substring(1)}
                    onChange={(e => changeColor(hexToHsva("#" + e.target.value)))}
                    style={{
                        borderColor: hsvaToHex({ ...color, v: 30 }),
                        backgroundColor: rgbaToHexa(hsvaToRgba({ ...color, a: 0.2 }))
                    }}
                />
                <div
                    className="aspect-square w-12 h-12 rounded-2xl shadow-sm"
                    style={{ backgroundColor: hsvaToHex(color) }}
                />
            </div>
            <div>
                <ColorWheel color={color} changeColor={(color: HsvaColor) => changeColor(color)}/>
            </div>
            <div className="w-96 flex flex-col items-center gap-2">
                <div
                    className="relative w-full h-8 overflow-hidden flex items-center border-2 rounded-2xl"
                    style={{
                        background: `linear-gradient(to right, black, ${hsvaToRgbaString(color)}, white)`,
                        borderColor: hsvaToHex({ ...color, v: 30 })
                    }}
                >
                    <input
                        type="range"
                        min="0"
                        max="100"
                        step="0.1"
                        value={color.v}
                        onChange={(e) => changeColor({ ...color, v: parseFloat(e.target.value) })}
                        className="
                            appearance-none w-full h-8 bg-transparent cursor-pointer
                        "
                    />
                </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <ColorFormatDisplay color={color} colorInFormat={hsvaToRgba(color)} label="RGB"/>
                <ColorFormatDisplay color={color} colorInFormat={color} label="HSV"/>
                <ColorFormatDisplay color={color} colorInFormat={hsvaToHsla(color)} label="HSL"/>
                <ColorFormatDisplay color={color}
                                    colorInFormat={rgbToCmyk(rgbaToRgb(hsvaToRgba(color)))}
                                    label="CMYK"/>
            </div>
        </div>
    );
};
