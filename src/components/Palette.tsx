import { HsvaColor, hsvaToHex, hsvaToRgba, rgbaToHexa } from "@/lib/colors";
import { Copy } from "lucide-react";

export const Palette = ({ color }: { color: HsvaColor }) => {
    return (
        <div className="min-h-screen gap-8 flex flex-col items-center justify-center">
            <div className="flex gap-4 text-lg items-center">
                <h2 className="text-lg">Harmonia kolorów:</h2>
                <select
                    name="colorHarmony"
                    id="colorHarmony"
                    className="py-1 px-2 text-lg border-2 rounded-2xl focus:outline-none cursor-pointer"
                    style={{
                        borderColor: hsvaToHex({ ...color, v: 30 }),
                        backgroundColor: rgbaToHexa(hsvaToRgba({ ...color, a: 0.2 }))
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
            <div className="px-8 w-full">
                <div className="flex flex-col bg-white rounded-2xl w-full items-center">
                    <h2 className="mt-8 text-xl font-medium">Twoja paleta barw:</h2>
                    <div className="grid grid-cols-2 gap-4 p-6 w-full">
                        <div className="w-full aspect-video rounded-2xl bg-amber-600"></div>
                        <div className="w-full aspect-video rounded-2xl bg-fuchsia-600"></div>
                        <div className="w-full aspect-video rounded-2xl bg-blue-700"></div>
                        <div className="w-full aspect-video rounded-2xl bg-red-700"></div>
                        <div className="w-full aspect-video rounded-2xl bg-green-700"></div>
                        <div className="w-full aspect-video rounded-2xl bg-pink-500"></div>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 cursor-pointer rounded-2xl hover:bg-gray-300 transition">
                Kopiuj całą paletę <Copy />
            </div>
        </div>
    );
};