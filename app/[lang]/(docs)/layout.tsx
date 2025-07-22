import {DocsLayout} from '@/components/layouts/docs';
import type {ReactNode} from 'react';
import {baseOptions} from '@app/layout.config';
import {source} from '@/lib/source';
import {ThemeToggle} from "@/components/layout/theme-toggle";
import {Languages} from "lucide-react";
import {LanguageToggle} from "@/components/layout/language-toggle";

export default async function Layout({ params, children }: { params: Promise<{ lang: string }>; children: ReactNode }) {
    const { lang } = await params;

    return (
        <DocsLayout
            tree={source.pageTree[lang]}
            {...baseOptions(lang)}
            sidebar={{ footer:
                <div className="md:hidden flex flex-row items-center justify-end">
                    <LanguageToggle className="me-1.5">
                        <Languages className="size-4.5" />
                    </LanguageToggle>
                    <ThemeToggle className="p-0" mode={baseOptions(lang).themeSwitch?.mode} />
                </div>
            }}
        >
            {children}
        </DocsLayout>
    );
}
