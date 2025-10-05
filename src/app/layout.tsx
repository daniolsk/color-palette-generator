import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
    subsets: ["latin"]
});

export const metadata: Metadata = {
    title: "Color Palette Generator", description: "Color Palette Generator - made by Daniel Skowron"
};

export default function RootLayout({
    children
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="pl" className={montserrat.className}>
        <body>
        {children}
        </body>
        </html>
    );
}
