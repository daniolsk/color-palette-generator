import { HexColor } from "@/lib/colors";

export const BusinessCardVisualization = ({ palette }: { palette: HexColor[] }) => {
    return (
        <section className="grid grid-cols-3 grid-rows-2">
            <div className="col-start-2 col-span-2 grid grid-cols-2 p-4">
                <div className="rounded-l-2xl shadow-lg">
                    <main className="flex flex-col justify-center px-8 py-16 h-full">
                        <div className="text-5xl flex-1 font-extrabold tracking-tighter">
                            DESIGN STUDIO
                        </div>
                        <div className="mt-4">
                            <div className="text-xl font-bold tracking-tighter mt-4">DANIEL SKOWRON</div>
                            <div className="text-lg font-bold" style={{
                                color: palette[0]
                            }}>ART DIRECTOR</div>
                        </div>
                        <div className="mt-4 flex flex-col">
                            <div>
                                <div className="">123-456-789</div>
                            </div>
                            <div>
                                <div className="">daniel.skowron@designstudio.pl</div>
                            </div>
                        </div>
                    </main>
                </div>
                <svg className="w-full h-full shadow-lg rounded-r-2xl" width="743" height="1024" viewBox="0 0 743 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_60_24)">
                        <rect width="743" height="1024" transform="translate(743 1024) rotate(-180)" fill={palette[3]}/>
                        <path d="M1336.5 315L746.5 1164.5L672.5 1273L-93.5 1250.5L-256 745C-288.5 491.333 -233.4 -33.5001 247 -103.5C727.4 -173.5 1173.5 146.333 1336.5 315Z" fill={palette[2]} fill-opacity="0.7"/>
                        <path d="M1185.25 -144.473C646.846 782.727 9.91309 323.527 -241.254 -21.9735L-243.754 -34.4735C456.913 -457.473 1723.65 -1071.67 1185.25 -144.473Z" fill={palette[3]} fill-opacity="0.7"/>
                        <path d="M393 1095.35C557 579.751 1319.67 287.851 1680.5 206.351L1696 1231.35C1193.33 1400.85 229 1610.95 393 1095.35Z" fill={palette[4]} fill-opacity="0.7"/>
                        <path d="M324.396 -257.555L967 1127.38L-79.7222 1300.88L-411.868 -113.012L324.396 -257.555Z" fill={palette[1]} fill-opacity="0.7"/>
                        <path d="M155.995 1170.83C402.176 1020.95 459.876 651.08 457.954 484.883C257.907 450.611 -136.702 605.144 -309 686.694C-256.577 910.527 -90.1847 1320.72 155.995 1170.83Z" fill={palette[4]} fill-opacity="0.7"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_60_24">
                            <rect width="743" height="1024" fill="white" transform="translate(743 1024) rotate(-180)"/>
                        </clipPath>
                    </defs>
                </svg>
            </div>
            <div className="col-start-1 col-span-2 p-4">
                <svg className="w-full h-full shadow-lg rounded-2xl" width="1486" height="1024" viewBox="0 0 1486 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_57_2)">
                        <rect width="1486" height="1024" fill={palette[3]}/>
                        <path d="M168.5 709L758.5 -140.5L832.5 -249L1598.5 -226.5L1761 279C1793.5 532.667 1738.4 1057.5 1258 1127.5C777.6 1197.5 331.5 877.667 168.5 709Z" fill={palette[2]} fill-opacity="0.7"/>
                        <path d="M319.753 1168.47C858.154 241.273 1495.09 700.473 1746.25 1045.97L1748.75 1058.47C1048.09 1481.47 -218.647 2095.67 319.753 1168.47Z" fill={palette[3]} fill-opacity="0.7"/>
                        <path d="M1112 -71.3506C948 444.249 185.333 736.149 -175.5 817.649L-191 -207.351C311.667 -376.851 1276 -586.951 1112 -71.3506Z" fill={palette[0]} fill-opacity="0.7"/>
                        <path d="M1180.6 1281.55L538 -103.38L1584.72 -276.881L1916.87 1137.01L1180.6 1281.55Z" fill={palette[4]} fill-opacity="0.7"/>
                        <path d="M610.967 -76.6908L-14.4669 485.191L-53.5884 -25.8138L610.967 -76.6908Z" fill={palette[1]} fill-opacity="0.7"/>
                        <path d="M1349 -146.834C1102.82 3.05334 1045.12 372.92 1047.05 539.117C1247.09 573.389 1641.7 418.856 1814 337.306C1761.58 113.473 1595.18 -296.721 1349 -146.834Z" fill={palette[4]} fill-opacity="0.7"/>
                    </g>
                    <defs>
                        <clipPath id="clip0_57_2">
                            <rect width="1486" height="1024" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            </div>
        </section>
    );
}