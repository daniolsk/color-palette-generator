import {ColorFormatDisplay} from './ColorFormatDisplay'
import ColorWheel from "@/components/ColorWheel";
import {
    hsvaToHex,
    hexToHsva,
    hsvaToRgba,
    rgbaToHexa,
    hslaToHsva,
    hsvaToHsla,
    HslaColor,
    rgbToCmyk, 
    rgbaToRgb
} from "@/lib/colors";

export const ColorPicker = ({color, changeColor}: {
    color: HslaColor,
    changeColor: (color: HslaColor) => void
}) => {
    return (
        <div className="min-h-screen gap-12 flex flex-col items-center justify-center">
            <div className="flex justify-center items-center gap-4">
                <span className="font-medium text-2xl">#</span>
                <input
                    className="text-center px-4 py-2 w-38 text-2xl border-2 rounded-2xl font-medium focus:outline-none"
                    type="text"
                    value={hsvaToHex(hslaToHsva({...color})).substring(1)}
                    onChange={(e => changeColor(hsvaToHsla(hexToHsva('#' + e.target.value))))}
                    style={{
                        borderColor: hsvaToHex(hslaToHsva({...color, l: 30})),
                        backgroundColor: rgbaToHexa(hsvaToRgba(hslaToHsva({...color, a: 0.2}))),
                    }}
                />
                <div
                    className="aspect-square w-12 h-12 rounded-2xl shadow-sm"
                    style={{backgroundColor: hsvaToHex(hslaToHsva(color))}}
                />
            </div>
            <div>
                <ColorWheel color={color} changeColor={(color: HslaColor) => changeColor(color)}/>
            </div>
            <div className="grid grid-cols-2 gap-4">
                <ColorFormatDisplay color={color} colorInFormat={hsvaToRgba(hslaToHsva(color))} label="RGB"/>
                <ColorFormatDisplay color={color} colorInFormat={hslaToHsva(color)} label="HSV"/>
                <ColorFormatDisplay color={color} colorInFormat={color} label="HSL"/>
                <ColorFormatDisplay color={color}
                                    colorInFormat={rgbToCmyk(rgbaToRgb(hsvaToRgba(hslaToHsva(color))))}
                                    label="CMYK"/>
            </div>
        </div>
    );
};
