import localFont from 'next/font/local';

export const brandFont = localFont({
    src: [
        {
            path: "../../public/fonts/sk-modernist-regular.otf", // Up 2 levels to root, then public
            weight: "300",
            style: "normal",
        },
        {
            path: "../../public/fonts/sk-modernist-bold.otf",
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-brand"
});