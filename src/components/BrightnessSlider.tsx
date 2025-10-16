import { HsvaColor, hsvaToRgbaString } from "@/lib/colors";

export const BrightnessSlider = ({ color, changeColor, compact }: {
    color: HsvaColor, changeColor: (color: HsvaColor) => void, compact?: boolean
}) => {
    return (
        <div
            className={`${compact ? 'h-4' : 'h-8'} relative w-full shadow-lg overflow-hidden flex items-center rounded-2xl`}
            style={{
                background: `linear-gradient(to right, black, ${hsvaToRgbaString({ ...color, v: 100 })})`,
            }}
        >
            <input
                type="range"
                min="0"
                max="100"
                step="0.1"
                value={color.v}
                onChange={(e) => changeColor({ ...color, v: parseFloat(e.target.value) })}
                className={`
                    ${compact ? 'h-4' : 'h-8'} appearance-none w-full bg-transparent cursor-pointer transition
                    [&::-webkit-slider-thumb]:appearance-none
                    [&::-webkit-slider-thumb]:h-6
                    [&::-webkit-slider-thumb]:w-6
                    [&::-webkit-slider-thumb]:rounded-full
                    [&::-webkit-slider-thumb]:border-4
                    [&::-webkit-slider-thumb]:border-white
                    [&::-webkit-slider-thumb]:bg-transparent
                    [&::-webkit-slider-thumb]:cursor-pointer
                    [&::-webkit-slider-thumb]:shadow-[0_1px_3px_0_rgb(0_0_0_/_0.5),_0_1px_2px_-1px_rgb(0_0_0_/_0.5)]
                    [&::-moz-range-thumb]:h-6
                    [&::-moz-range-thumb]:w-6
                    [&::-moz-range-thumb]:rounded-full
                    [&::-moz-range-thumb]:border-4
                    [&::-moz-range-thumb]:border-white
                    [&::-moz-range-thumb]:bg-transparent
                    [&::-moz-range-thumb]:cursor-pointer
                    [&::-moz-range-thumb]:shadow-[0_1px_3px_0_rgb(0_0_0_/_0.5),_0_1px_2px_-1px_rgb(0_0_0_/_0.5)]
                  `}
            />
        </div>
    );
};