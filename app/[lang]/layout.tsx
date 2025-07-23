import { SpeedInsights } from "@vercel/speed-insights/next"
import '@app/global.css';
import {RootProvider} from 'fumadocs-ui/provider';
import {Geist, Geist_Mono} from 'next/font/google';
import type {ReactNode} from 'react';
import type { Translations } from 'fumadocs-ui/i18n';

const fr: Partial<Translations> = {
    search: 'Rechercher',
    searchNoResult: 'Aucun résultat trouvé',
    toc: 'Sur cette page',
    chooseLanguage: 'Choisir une langue',
};

const locales = [
    {
        name: 'Français',
        locale: 'fr',
    },
    {
        name: 'English',
        locale: 'en',
    },
];

const geistSans = Geist({
    variable: "--font-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-mono",
    subsets: ["latin"],
});

export default async function RootLayout({ params, children }: { params: Promise<{ lang: string }>; children: ReactNode }) {
    const lang = (await params).lang;

    return (
        <html lang={lang} className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>
            <body className="flex flex-col min-h-screen">
                <RootProvider
                    i18n={{
                        locale: lang,
                        locales,
                        translations: { fr }[lang],
                    }}
                >
                    {children}
                    <SpeedInsights />
                </RootProvider>
            </body>
        </html>
    );
}
