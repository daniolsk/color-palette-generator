import { HsvaColor, hsvaToHex, hsvaToRgbaString } from "@/lib/colors";

export const BrightnessSlider = ({ color, changeColor }: {
    color: HsvaColor, changeColor: (color: HsvaColor) => void
}) => {
    return (
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
                className="appearance-none w-full h-8 bg-transparent cursor-pointer"
            />
        </div>
    );
};