import Color from "color";

const randomlyModifyColor = (
    hex: string,
    saturationStrength: number = 5,
    lightnessStrength: number = 5,
    randomDirection: boolean = false,
    hueStrength: number = 0
): string => {
    const c = Color(hex).hsl().object();

    const randomDelta = (strength: number) => {
        const min = strength * 0.40;
        const max = strength * 0.60;
        const delta = min + Math.random() * (
            max - min
        );
        const direction = randomDirection ? (
            Math.random() > 0.5 ? -1 : 1
        ) : 1;
        return delta * direction;
    };

    const clamp = (v: number, min: number = 0, max: number = 100) => Math.max(min, Math.min(max, v));

    return Color({
        h: (
            clamp(c.h + randomDelta(hueStrength), 0, 360)
        ),
        s: (
            clamp(c.s + randomDelta(saturationStrength))
        ),
        l: (
            clamp(c.l + randomDelta(lightnessStrength), 60, 90)
        )
    }).hex();
};

// --- Generatory palet ---

export const getComplementary = (colorInput: string): string[] => {
    const base = Color(colorInput);
    const complementary = base.rotate(180);

    return [
        base.hex(),
        randomlyModifyColor(complementary.hex(), 15, 60),
        randomlyModifyColor(complementary.hex(), 55, 15)
    ];
};

export const getTriad = (colorInput: string): string[] => {
    const base = Color(colorInput).hsl();
    const step = 120;
    const second = base.rotate(step);
    const third = base.rotate(2 * step);

    return [
        base.hex(),
        randomlyModifyColor(second.hex(), 15, 60),
        randomlyModifyColor(third.hex(), 55, 15)
    ];
};

export const getAnalogous = (colorInput: string, range: number = 45): string[] => {
    const base = Color(colorInput).hsl();
    const left = base.rotate(-range);
    const right = base.rotate(range);

    return [
        base.hex(),
        randomlyModifyColor(left.hex(), 15, 60),
        randomlyModifyColor(right.hex(), 55, 15)
    ];
};

export const getSplitComplementary = (colorInput: string): string[] => {
    const base = Color(colorInput);
    const left = base.rotate(-150);
    const right = base.rotate(150);

    return [
        base.hex(),
        randomlyModifyColor(left.hex(), 15, 60),
        randomlyModifyColor(right.hex(), 55, 15)
    ];
};

export const getMonochromatic = (colorInput: string): string[] => {
    const base = Color(colorInput).hsl().object();

    return [
        Color(base).hex(),
        randomlyModifyColor(Color(base).hex(), 15, 60),
        randomlyModifyColor(Color(base).hex(), 55, 15)
    ];
};
