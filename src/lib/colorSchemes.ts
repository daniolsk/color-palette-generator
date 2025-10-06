import Color from "color";

/** Zwraca kolor bazowy (primary) */
export const getPrimary = (colorInput: string): string[] => {
    const color = Color(colorInput).hsl();
    return [color.hex()];
};

/** Kolory dopełniające (complementary) */
export const getComplementary = (colorInput: string): string[] => {
    const base = Color(colorInput).hsl();
    return [base.hex(), base.rotate(180).hex()];
};

/**
 * Triada — domyślnie 3 kolory co 120°, ale można zwrócić dowolną liczbę `count`
 * (równo rozłożonych na kole barw)
 */
export const getTriad = (colorInput: string, count: number = 3): string[] => {
    const base = Color(colorInput).hsl();
    const step = 360 / count;

    return Array.from({ length: count }, (_, i) =>
        base.rotate(i * step).hex()
    );
};

/**
 * Analogiczne — kolory blisko siebie w kole barw.
 * `range` określa łączny zakres (np. 60° wokół bazowego).
 * `count` — ile kolorów chcesz (domyślnie 3).
 */
export const getAnalogous = (
    colorInput: string,
    count: number = 4,
    range: number = 90
): string[] => {
    const base = Color(colorInput).hsl();
    const step = range / (count - 1);
    const start = -range / 2;

    return Array.from({ length: count }, (_, i) =>
        base.rotate(start + i * step).hex()
    );
};

/** Split-complementary — zawsze 3 kolory */
export const getSplitComplementary = (colorInput: string): string[] => {
    const base = Color(colorInput).hsl();
    return [base.hex(), base.rotate(-150).hex(), base.rotate(150).hex()];
};

/**
 * Tetradic — 4 kolory co 90°, ale można podać `count` dla równych odstępów
 */
export const getTetradic = (colorInput: string, count: number = 4): string[] => {
    const base = Color(colorInput).hsl();
    const step = 360 / count;

    return Array.from({ length: count }, (_, i) =>
        base.rotate(i * step).hex()
    );
};

/**
 * Monochromatyczne kolory — ten sam hue i lightness, różne saturation.
 * Zwraca tablicę HEX z kolorami od największego nasycenia do najmniejszego
 * z dodatkiem koloru bazowego na końcu (lub początku).
 */
export const getMonochromatic = (colorInput: string, count: number = 3): string[] => {
    const base = Color(colorInput).hsl().object();
    const result: string[] = [];

    for (let i = 1; i <= count; i++) {
        const s = (i / (count + 1)) * 100; // równomierne nasycenia
        result.push(Color({ h: base.h, s, l: base.l }).hex());
    }

    // Dodaj kolor bazowy na koniec
    result.push(Color(colorInput).hex());

    // Odwróć kolejność (od największego nasycenia do najmniejszego)
    return result.reverse();
};
