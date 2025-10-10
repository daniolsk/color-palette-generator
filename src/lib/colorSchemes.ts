import Color from "color";

// --- Pomocnicza funkcja do lekkiej modyfikacji kolorów ---
const slightlyModify = (hex: string, strength: number = 8): string => {
    const c = Color(hex).hsl().object();

    const randomDelta = () => {
        const sign = Math.random() < 0.5 ? -1 : 1;
        const value = Math.random() * strength; // ±strength
        return sign * value;
    };

    const clamp = (v: number) => Math.max(0, Math.min(100, v));

    return Color({
        h: c.h,
        s: clamp(c.s + randomDelta()),
        l: clamp(c.l + randomDelta())
    }).hex();
};

// --- Generatory palet (3 kolory: dominujący, dodatkowy, akcent) ---

export const getComplementary = (colorInput: string): string[] => {
    const base = Color(colorInput);
    const complementary = base.rotate(180);

    // kolor pośredni między bazowym a dopełniającym
    const baseHSL = base.hsl().object();
    const compHSL = complementary.hsl().object();
    const mid = Color({
        h: (
            baseHSL.h + compHSL.h
        ) / 2,
        s: (
            baseHSL.s + compHSL.s
        ) / 2,
        l: (
            baseHSL.l + compHSL.l
        ) / 2
    });

    // 60 / 30 / 10 – dominujący / dodatkowy / akcent
    return [
        base.hex(),                   // dominujący
        slightlyModify(mid.hex(), 6), // dodatkowy
        slightlyModify(complementary.hex(), 10) // akcent
    ];
};

export const getTriad = (colorInput: string): string[] => {
    const base = Color(colorInput).hsl();
    const step = 120; // triada = 120° odstępu
    const second = base.rotate(step);
    const third = base.rotate(2 * step);

    return [
        base.hex(),
        slightlyModify(second.hex(), 6),
        slightlyModify(third.hex(), 10)
    ];
};

export const getAnalogous = (colorInput: string, range: number = 30): string[] => {
    const base = Color(colorInput).hsl();
    const left = base.rotate(-range);
    const right = base.rotate(range);

    return [
        base.hex(),
        slightlyModify(left.hex(), 6),
        slightlyModify(right.hex(), 8)
    ];
};

export const getSplitComplementary = (colorInput: string): string[] => {
    const base = Color(colorInput);
    const left = base.rotate(-150);
    const right = base.rotate(150);

    return [
        base.hex(),
        slightlyModify(left.hex(), 6),
        slightlyModify(right.hex(), 10)
    ];
};

export const getMonochromatic = (colorInput: string): string[] => {
    const base = Color(colorInput).hsl().object();

    const lighter = Color({
        h: base.h,
        s: base.s,
        l: Math.min(100, base.l + 20)
    });

    const darker = Color({
        h: base.h,
        s: base.s,
        l: Math.max(0, base.l - 20)
    });

    return [
        Color(base).hex(),
        slightlyModify(lighter.hex(), 5),
        slightlyModify(darker.hex(), 8)
    ];
};
