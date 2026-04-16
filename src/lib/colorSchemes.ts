import Color from "color";

const getSeededUnit = (seed: string): number => {
    let hash = 2166136261;

    for (let i = 0; i < seed.length; i += 1) {
        hash ^= seed.charCodeAt(i);
        hash = Math.imul(hash, 16777619);
    }

    return (hash >>> 0) / 4294967295;
};

const randomlyModifyColor = (
    hex: string,
    saturationStrength: number = 5,
    lightnessStrength: number = 5,
    randomDirection: boolean = false,
    hueStrength: number = 0,
    seed: string = ""
): string => {
    const c = Color(hex).hsl().object();

    const randomDelta = (strength: number, channelSeed: string) => {
        const min = strength * 0.40;
        const max = strength * 0.60;
        const delta = min + getSeededUnit(`${seed}:${channelSeed}:delta`) * (
            max - min
        );
        const direction = randomDirection ? (
            getSeededUnit(`${seed}:${channelSeed}:direction`) > 0.5 ? -1 : 1
        ) : 1;
        return delta * direction;
    };

    const clamp = (v: number, min: number = 0, max: number = 100) => Math.max(min, Math.min(max, v));

    return Color({
        h: (
            clamp(c.h + randomDelta(hueStrength, "h"), 0, 360)
        ),
        s: (
            clamp(c.s + randomDelta(saturationStrength, "s"))
        ),
        l: (
            clamp(c.l + randomDelta(lightnessStrength, "l"), 60, 90)
        )
    }).hex();
};

// --- Generatory palet ---

export const getComplementary = (colorInput: string, variantSeed: string = ""): string[] => {
    const base = Color(colorInput);
    const complementary = base.rotate(180);

    return [
        base.hex(),
        randomlyModifyColor(complementary.hex(), 15, 60, false, 0, `${base.hex()}:complementary:secondary:${variantSeed}`),
        randomlyModifyColor(complementary.hex(), 55, 15, false, 0, `${base.hex()}:complementary:accent:${variantSeed}`)
    ];
};

export const getTriad = (colorInput: string, variantSeed: string = ""): string[] => {
    const base = Color(colorInput).hsl();
    const step = 120;
    const second = base.rotate(step);
    const third = base.rotate(2 * step);

    return [
        base.hex(),
        randomlyModifyColor(second.hex(), 15, 60, false, 0, `${base.hex()}:triad:secondary:${variantSeed}`),
        randomlyModifyColor(third.hex(), 55, 15, false, 0, `${base.hex()}:triad:accent:${variantSeed}`)
    ];
};

export const getAnalogous = (colorInput: string, range: number = 45, variantSeed: string = ""): string[] => {
    const base = Color(colorInput).hsl();
    const left = base.rotate(-range);
    const right = base.rotate(range);

    return [
        base.hex(),
        randomlyModifyColor(left.hex(), 15, 60, false, 0, `${base.hex()}:analogous:secondary:${variantSeed}`),
        randomlyModifyColor(right.hex(), 55, 15, false, 0, `${base.hex()}:analogous:accent:${variantSeed}`)
    ];
};

export const getSplitComplementary = (colorInput: string, variantSeed: string = ""): string[] => {
    const base = Color(colorInput);
    const left = base.rotate(-150);
    const right = base.rotate(150);

    return [
        base.hex(),
        randomlyModifyColor(left.hex(), 15, 60, false, 0, `${base.hex()}:split-complementary:secondary:${variantSeed}`),
        randomlyModifyColor(right.hex(), 55, 15, false, 0, `${base.hex()}:split-complementary:accent:${variantSeed}`)
    ];
};

export const getMonochromatic = (colorInput: string, variantSeed: string = ""): string[] => {
    const base = Color(colorInput).hsl().object();

    return [
        Color(base).hex(),
        randomlyModifyColor(Color(base).hex(), 15, 60, false, 0, `${Color(base).hex()}:monochromatic:secondary:${variantSeed}`),
        randomlyModifyColor(Color(base).hex(), 55, 15, false, 0, `${Color(base).hex()}:monochromatic:accent:${variantSeed}`)
    ];
};
