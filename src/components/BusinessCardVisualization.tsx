import { HexColor } from "@/lib/colors";

export const BusinessCardVisualization = ({ palette }: { palette: HexColor[] }) => {
    return (
        <section className="flex flex-col relative">
            <div className="grid grid-cols-2 p-4 mr-24 ml-96 z-20">
                <div className="rounded-l-2xl shadow-lg/20 bg-white">
                    <main className="flex flex-col justify-center px-8 py-16 h-full">
                        <div className="text-5xl flex-1 font-extrabold tracking-tighter">
                            DESIGN STUDIO.
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
                <svg className="w-full h-full rounded-r-2xl shadow-lg/20" width="743" height="1024"
                     viewBox="0 0 743 1024"
                     fill="none"
                     xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_61_390)">
                        <rect width="743" height="1024" transform="translate(743 1024) rotate(-180)"
                              fill={palette[2]} />
                        <path
                            d="M8.95209e-05 6.8908e-06L856.856 8.17995e-05C1065.23 93.7749 1231.12 225.615 1317.5 315L825.081 1024L0 1024L8.95209e-05 6.8908e-06Z"
                            fill={palette[0]} />
                        <path d="M401.046 1024C577.902 623.079 1117.22 368.757 1486 253.944L1486 1024L401.046 1024Z"
                              fill={palette[1]} />
                        <path
                            d="M424.9 6.53324e-05L1073.91 0.00012207C918.331 220.008 757.025 335.125 601.069 379.677L424.9 6.53324e-05Z"
                            fill={palette[1]} />
                        <path
                            d="M401.046 1024C552.134 681.493 967.76 445.98 1315.6 313.037C1316.23 313.694 1316.87 314.348 1317.5 315L825.081 1024L401.046 1024Z"
                            fill={palette[2]} />
                        <path
                            d="M424.9 7.06875e-05L856.856 0.00010845C911.99 24.813 964.151 52.2921 1012.65 80.9435C876.267 248.884 736.647 340.946 601.069 379.677L424.9 7.06875e-05Z"
                            fill={palette[2]} />
                        <path
                            d="M288.16 1024C408.273 848.932 440.396 609.581 438.954 484.883C328.541 465.967 158.86 504.569 4.08554e-05 556.669L8.95209e-05 4.3387e-05L424.9 8.0533e-05L900.032 1024L288.16 1024Z"
                            fill={palette[1]} />
                        <path
                            d="M-9.46496e-06 556.669C158.86 504.569 328.541 465.967 438.954 484.883C440.396 609.58 408.273 848.932 288.16 1024L-5.03203e-05 1024L-9.46496e-06 556.669Z"
                            fill={palette[2]} />
                        <path
                            d="M401.046 1024C466.725 875.109 582.395 746.438 720.754 637.621L900.032 1024L401.046 1024Z"
                            fill={palette[0]} />
                        <path
                            d="M601.068 379.676C379.264 443.039 168.282 363.664 1.41369e-05 240.291L3.51439e-05 -0.000540828L424.9 -0.000503682L601.068 379.676Z"
                            fill={palette[0]} />
                    </g>
                    <defs>
                        <clipPath id="clip0_61_390">
                            <rect width="743" height="1024" fill="white" transform="translate(743 1024) rotate(-180)"/>
                        </clipPath>
                    </defs>
                </svg>
            </div>
            <div className="p-4 mr-96 ml-24 absolute top-60 left-0 z-10">
                <svg className="w-full h-full rounded-2xl shadow-lg/20" width="1486" height="1024"
                     viewBox="0 0 1486 1024"
                     fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_61_149)">
                        <rect width="1486" height="1024" fill={palette[2]} />
                        <path d="M1486 1024H629.145C420.775 930.225 254.883 798.386 168.5 709L660.919 0H1486V1024Z"
                              fill={palette[0]} />
                        <path d="M1084.95 0C908.098 400.921 368.778 655.243 0 770.056V0H1084.95Z" fill={palette[1]} />
                        <path d="M1061.1 1024H412.095C567.67 803.993 728.975 688.875 884.931 644.323L1061.1 1024Z"
                              fill={palette[1]} />
                        <path
                            d="M1084.95 0C933.866 342.507 518.24 578.02 170.404 710.963C169.766 710.306 169.13 709.652 168.5 709L660.919 0H1084.95Z"
                            fill={palette[2]} />
                        <path
                            d="M1061.1 1024H629.145C574.01 999.187 521.85 971.707 473.349 943.056C609.733 775.115 749.353 683.054 884.931 644.323L1061.1 1024Z"
                            fill={palette[2]} />
                        <path
                            d="M1197.84 0C1077.73 175.068 1045.6 414.42 1047.05 539.117C1157.46 558.033 1327.14 519.431 1486 467.331V1024H1061.1L585.968 0H1197.84Z"
                            fill={palette[1]} />
                        <path
                            d="M1486 467.331C1327.14 519.431 1157.46 558.033 1047.05 539.117C1045.6 414.42 1077.73 175.068 1197.84 0H1486V467.331Z"
                            fill={palette[2]} />
                        <path d="M1084.95 0C1019.27 148.891 903.605 277.562 765.246 386.379L585.968 0H1084.95Z"
                              fill={palette[0]} />
                        <path
                            d="M884.932 644.324C1106.74 580.962 1317.72 660.336 1486 783.709V1024H1061.1L884.932 644.324Z"
                            fill={palette[0]} />
                        <path d="M0 472.193V0H525.603L0 472.193Z" fill={palette[2]} />
                    </g>
                    <defs>
                        <clipPath id="clip0_61_149">
                            <rect width="1486" height="1024" fill="white"/>
                        </clipPath>
                    </defs>
                </svg>
            </div>
        </section>
    );
}