import {
	CmykColor,
	HexColor,
	hexToHsva,
	HslaColor,
	HsvaColor,
	hsvaToHsla,
	hsvaToRgba,
	RgbaColor,
	rgbaToHexa,
	rgbaToRgb,
	rgbToCmyk,
} from '@/lib/colors';
import {Contrast, Copy, Dice5, RefreshCcw} from "lucide-react";
import { useState } from 'react';
import Color from 'color';
import toast from 'react-hot-toast';
import { score as getContrastScore, hex as checkContrast } from "wcag-contrast";
import { Tooltip } from "react-tooltip";

export const Palette = ({
	color,
	palette,
	setHarmony,
	refreshPalette,
    setRandomColor,
}: {
	color: HsvaColor;
	palette: HexColor[];
	setHarmony: (harmony: string) => void;
	refreshPalette: () => void;
    setRandomColor: () => void;
}) => {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

	const getColorText = (
		color: RgbaColor | HslaColor | HsvaColor | CmykColor,
		format: string
	) => {
		switch (format) {
			case 'RGB':
				color = color as RgbaColor;
				return `${Math.round(color.r)}, ${Math.round(color.g)}, ${Math.round(
					color.b
				)}`;
			case 'HSV':
				color = color as HsvaColor;
				return `${Math.round(color.h)}, ${Math.round(color.s)}%, ${Math.round(
					color.v
				)}%`;
			case 'HSL':
				color = color as HslaColor;
				return `${Math.round(color.h)}, ${Math.round(color.s)}%, ${Math.round(
					color.l
				)}%`;
			case 'CMYK':
				color = color as CmykColor;
				return `${Math.round(color.c)}, ${Math.round(color.m)}, ${Math.round(
					color.y
				)}, ${Math.round(color.k)}`;
			default:
				return '';
		}
	};

	const copyPalette = async () => {
		await navigator.clipboard.writeText(palette.join(', '));
		toast.success('Skopiowano do schowka!');
	};

	const renderColorLabel = (i: number) => {
		switch (i) {
			case 0:
                return "Kolor dominujący";
			case 1:
                return "Kolor uzupełniający";
			case 2:
                return "Kolor akcentujący";
			case 3:
				return 'Kolor tła';
			case 4:
				return 'Kolor tekstu';
		}
	};

    const renderContrastIndicator = (firstColor: string, secondColor: string) => {
        switch (getContrastScore(checkContrast(firstColor, secondColor))) {
            case "AAA":
                return <Contrast color="green" size="18" />;
            case "AA":
                return <Contrast color="green" size="18" />;
            case "AA Large":
                return <Contrast color="black" size="18" />;
            case "Fail":
                return <Contrast color="red" size="18" />;
        }
    };

    const displayContrastScore = (firstColor: string, secondColor: string) => {
        switch (getContrastScore(checkContrast(firstColor, secondColor))) {
            case "AAA":
                return <span>- poziom według WCAG: <b>najwyższy (AAA)</b></span>;
            case "AA":
                return <span>- poziom według WCAG: <b>standardowy (AA)</b> </span>;
            case "AA Large":
                return <span>- poziom według WCAG: <b>standardowy (AA)</b></span>;
            case "Fail":
                return <span>- poziom według WCAG: <b>niewystarczający</b></span>;
        }
    };

	return (
		<div className='gap-8 py-8 flex flex-col items-center justify-center'>
            <Tooltip
                id="contrast-info"
                place="top"
                style={{
                    borderRadius: "16px",
                    zIndex: "999999",
                    maxWidth: "280px"
                }}
                opacity={1}
                render={({ activeAnchor }) => (
                    <span>
                        Kontrast do tła:{" "}
                       <span className="font-bold">
                           {checkContrast(
                                activeAnchor?.getAttribute("data-tooltip-first-color") ?? "",
                                activeAnchor?.getAttribute("data-tooltip-second-color") ?? ""
                                ).toFixed(2)}
                        :1{" "}
                       </span>
                        {displayContrastScore(
                            activeAnchor?.getAttribute("data-tooltip-first-color") ?? "",
                            activeAnchor?.getAttribute("data-tooltip-second-color") ?? ""
                        )}
                    </span>
                )}
            />
			<div className='flex gap-2 lg:gap-4 text-lg items-center flex-col lg:flex-row'>
				<h2 className='text-lg'>Harmonia kolorów:</h2>
				<select
					defaultValue='analogous'
					onChange={(e) => setHarmony(e.target.value)}
					name='colorHarmony'
					id='colorHarmony'
					className='py-2 px-3 text-lg shadow-lg rounded-2xl focus:outline-none cursor-pointer transition'
					style={{
						backgroundColor: rgbaToHexa(hsvaToRgba({ ...color, a: 0.2 })),
					}}
					onMouseEnter={(e) => {
						e.currentTarget.style.backgroundColor = rgbaToHexa(
							hsvaToRgba({ ...color, v: Math.min(color.v + 10, 100), a: 0.3 })
						);
					}}
					onMouseLeave={(e) => {
						e.currentTarget.style.backgroundColor = rgbaToHexa(
							hsvaToRgba({ ...color, a: 0.2 })
						);
					}}
				>
					<option value='monochromatic'>Monochromatyczna</option>
					<option value='analogous'>Analogiczna</option>
					<option value='complementary'>Dopełniająca</option>
					<option value='split-complementary'>Rozdzielnie dopełniająca</option>
					<option value='triadic'>Triadyczna</option>
				</select>
			</div>
			<div className='w-full flex-1'>
				<div className='flex h-full flex-col bg-white rounded-2xl w-full items-center'>
					<div className='items-center flex justify-between w-full px-6 pt-6'>
						<h2 className='text-xl font-medium'>Twoja paleta barw:</h2>
                        <div className="flex gap-4 items-center">
                            <Dice5
                                className="hover:-translate-y-1 transition-all active:scale-105 cursor-pointer"
                                onClick={() => setRandomColor()}
                            />
                            <RefreshCcw
                                className="hover:rotate-120 transition-all active:scale-105 cursor-pointer"
                                onClick={() => refreshPalette()}
                            />
                        </div>
					</div>
					<div
                        className={`grid grid-cols-1 desktop:grid-cols-10 gap-4 p-6 w-full h-full transition-all`}
					>
						{palette.map((col, i) => {
							const textColor =
								hoveredIndex === i
									? Color(col).isLight()
										? 'rgba(0,0,0,1)'
										: 'rgba(255,255,255,1)'
									: Color(col).isLight()
									? 'rgba(0,0,0,0.7)'
									: 'rgba(255,255,255,0.7)';

							return (
								<div
									key={i}
                                    className={`${i === 0 ? "desktop:col-span-10" : ""} ${
                                        i === 1 ? "desktop:col-span-6" : ""
									} ${
                                        i === 3 || i === 4 ? "desktop:col-span-5" : ""
                                    } desktop:col-span-4`}
								>
                                    <div className="justify-between flex text-sm mb-0.5">
                                        <div className="text-gray-600">{renderColorLabel(i)}</div>
                                        <div className="text-sm cursor-pointer"
                                             data-tooltip-id="contrast-info"
                                             data-tooltip-first-color={palette[i]}
                                             data-tooltip-second-color={palette[3]}>
                                            {
                                                i < 3 ?
                                                    renderContrastIndicator(palette[i], palette[3]) : null
                                            }
                                        </div>
									</div>
									<div
										style={{ backgroundColor: col, color: textColor }}
										onMouseEnter={() => setHoveredIndex(i)}
										onMouseLeave={() => setHoveredIndex(null)}
										className='shadow-lg relative w-full min-h-42 font-medium text-xl rounded-2xl flex items-center justify-center p-2 overflow-hidden transition-all'
									>
										<span
											className='transition-all duration-300'
											style={{
												opacity: hoveredIndex === i ? 0 : 1,
												transform:
													hoveredIndex === i ? 'scale(0.95)' : 'scale(1)',
											}}
										>
											{col}
										</span>

										<div
											className='absolute inset-0 flex flex-col justify-center items-center opacity-0 scale-95 transition-all duration-300'
											style={{
												opacity: hoveredIndex === i ? 1 : 0,
												transform:
													hoveredIndex === i ? 'scale(1)' : 'scale(0.95)',
											}}
										>
											<div
												className='mb-2 text-center cursor-pointer font-medium px-2 py-1 rounded-2xl flex gap-2 items-center transition-all'
												onClick={async () => {
													await navigator.clipboard.writeText(col);
													toast.success('Skopiowano do schowka!');
												}}
												style={{
													backgroundColor: col,
												}}
												onMouseEnter={(e) => {
													e.currentTarget.style.backgroundColor = Color(
														col
													).isLight()
														? 'rgba(255,255,255,0.3)'
														: 'rgba(0,0,0,0.3)';
												}}
												onMouseLeave={(e) => {
													e.currentTarget.style.backgroundColor = col;
												}}
											>
												{col} <Copy size={16} />
											</div>

											<div className='flex flex-col gap-1 text-xs'>
												<div
													className='cursor-pointer px-2 py-1 rounded-2xl flex items-center gap-2 transition-all'
													onClick={async () => {
														await navigator.clipboard.writeText(
															getColorText(hsvaToRgba(hexToHsva(col)), 'RGB')
														);
														toast.success('Skopiowano do schowka!');
													}}
													style={{ backgroundColor: col }}
													onMouseEnter={(e) =>
														(e.currentTarget.style.backgroundColor = Color(
															col
														).isLight()
															? 'rgba(255,255,255,0.3)'
															: 'rgba(0,0,0,0.3)')
													}
													onMouseLeave={(e) =>
														(e.currentTarget.style.backgroundColor = col)
													}
												>
													RGB: {getColorText(hsvaToRgba(hexToHsva(col)), 'RGB')}{' '}
													<Copy size={12} />
												</div>

												<div
													className='cursor-pointer px-2 py-1 rounded-2xl flex items-center gap-2 transition-all'
													onClick={async () => {
														await navigator.clipboard.writeText(
															getColorText(hsvaToHsla(hexToHsva(col)), 'HSL')
														);
														toast.success('Skopiowano do schowka!');
													}}
													style={{ backgroundColor: col }}
													onMouseEnter={(e) =>
														(e.currentTarget.style.backgroundColor = Color(
															col
														).isLight()
															? 'rgba(255,255,255,0.3)'
															: 'rgba(0,0,0,0.3)')
													}
													onMouseLeave={(e) =>
														(e.currentTarget.style.backgroundColor = col)
													}
												>
													HSL: {getColorText(hsvaToHsla(hexToHsva(col)), 'HSL')}{' '}
													<Copy size={12} />
												</div>

												<div
													className='cursor-pointer px-2 py-1 rounded-2xl flex items-center gap-2 transition-all'
													onClick={async () => {
														await navigator.clipboard.writeText(
															getColorText(hexToHsva(col), 'HSV')
														);
														toast.success('Skopiowano do schowka!');
													}}
													style={{ backgroundColor: col }}
													onMouseEnter={(e) =>
														(e.currentTarget.style.backgroundColor = Color(
															col
														).isLight()
															? 'rgba(255,255,255,0.3)'
															: 'rgba(0,0,0,0.3)')
													}
													onMouseLeave={(e) =>
														(e.currentTarget.style.backgroundColor = col)
													}
												>
													HSV: {getColorText(hexToHsva(col), 'HSV')}{' '}
													<Copy size={12} />
												</div>

												<div
													className='cursor-pointer px-2 py-1 rounded-2xl flex items-center gap-2 transition-all'
													onClick={async () => {
														await navigator.clipboard.writeText(
															getColorText(
																rgbToCmyk(
																	rgbaToRgb(hsvaToRgba(hexToHsva(col)))
																),
																'CMYK'
															)
														);
														toast.success('Skopiowano do schowka!');
													}}
													style={{ backgroundColor: col }}
													onMouseEnter={(e) =>
														(e.currentTarget.style.backgroundColor = Color(
															col
														).isLight()
															? 'rgba(255,255,255,0.3)'
															: 'rgba(0,0,0,0.3)')
													}
													onMouseLeave={(e) =>
														(e.currentTarget.style.backgroundColor = col)
													}
												>
													CMYK:{' '}
													{getColorText(
														rgbToCmyk(rgbaToRgb(hsvaToRgba(hexToHsva(col)))),
														'CMYK'
													)}
													<Copy size={12} />
												</div>
											</div>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>
			</div>

			<div
				onClick={copyPalette}
				className='flex items-center gap-2 px-4 py-2 cursor-pointer rounded-2xl hover:bg-gray-300 transition'
			>
				Kopiuj całą paletę <Copy size={16} />
			</div>
		</div>
	);
};
