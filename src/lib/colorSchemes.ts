import Color from "color";

const extendColors = (colors: string[], count: number, allowHueChange: boolean = true): string[] => {
    if (colors.length === 0) return [];

    const result = [colors[0]]; // pierwszy kolor zawsze bazowy
    const len = colors.length;
    let i = 0; // indeks do przechodzenia po pozostałych kolorach

    while (result.length < count) {
        const baseColor = Color(colors[i % len]).hsl();

        // losowa modyfikacja: hue ±30°, saturation ±20%, lightness ±20%
        const hueShift = (Math.random() * 60) - 30;
        const satShift = (Math.random() * 40) - 20;
        const lightShift = (Math.random() * 40) - 20;

        const newCol = baseColor
            .rotate(allowHueChange ? hueShift : 0)
            .saturationl(Math.min(100, Math.max(0, baseColor.saturationl() + satShift)))
            .lightness(Math.min(100, Math.max(0, baseColor.lightness() + lightShift)));

        result.push(newCol.hex());
        i++;
    }

    return result.slice(0, count);
};

// --- Generatory palet ---

export const getComplementary = (colorInput: string, count: number = 2): string[] => {
    const baseSet = [colorInput, Color(colorInput).rotate(180).hex()];
    return extendColors(baseSet, count);
};

export const getTriad = (colorInput: string, count: number = 3): string[] => {
    const base = Color(colorInput).hsl();
    const step = 360 / 3;
    const baseSet = [colorInput, ...Array.from({ length: 2 }, (_, i) => base.rotate((i+1) * step).hex())];
    return extendColors(baseSet, count);
};

export const getAnalogous = (colorInput: string, count: number = 4, range: number = 90): string[] => {
    const base = Color(colorInput).hsl();
    const step = range / (count - 1);
    const start = -range / 2;
    const baseSet = [colorInput, ...Array.from({ length: count - 1 }, (_, i) =>
        base.rotate(start + (i+1) * step).hex()
    )];
    return extendColors(baseSet, count);
};

export const getSplitComplementary = (colorInput: string, count: number = 3): string[] => {
    const baseSet = [colorInput, Color(colorInput).rotate(-150).hex(), Color(colorInput).rotate(150).hex()];
    return extendColors(baseSet, count);
};

export const getTetradic = (colorInput: string, count: number = 4): string[] => {
    const base = Color(colorInput).hsl();
    const step = 360 / 4;
    const baseSet = [colorInput, ...Array.from({ length: 3 }, (_, i) => base.rotate((i+1) * step).hex())];
    return extendColors(baseSet, count);
};

export const getMonochromatic = (colorInput: string, count: number = 4): string[] => {
    const base = Color(colorInput).hsl().object();
    const baseSet: string[] = [colorInput];

    for (let i = 1; i < count; i++) {
        const s = (i / count) * 100;
        baseSet.push(Color({ h: base.h, s, l: base.l }).hex());
    }

    return extendColors(baseSet, count, false);
};
