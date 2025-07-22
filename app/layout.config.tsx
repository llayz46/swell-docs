import type {BaseLayoutProps} from 'fumadocs-ui/layouts/shared';
import { i18n } from '@/lib/i18n';

/**
 * Shared layout configurations
 *
 * you can customise layouts individually from:
 * Home Layout: app/(home)/layout.tsx
 * Docs Layout: app/docs/layout.tsx
 */
export function baseOptions(lang: string): BaseLayoutProps {
    return {
        i18n,
        nav: {
            title: (
                <>
                    <svg width="24" height="24" className="fill-fd-foreground" viewBox="0 0 32 52" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.56904 35.889L27.3808 19.5641L32 15.7579L31.9886 0L0 26.3577L7.56904 35.889Z" />
                        <path d="M14.6136 44.7606L23.7235 37.2539L27.3808 34.2402V19.5641L7.56904 35.889L14.6136 44.7606Z" fillOpacity="0.8"/>
                        <path d="M20.3644 52L23.7235 49.2318V37.2539L14.6136 44.7606L20.3644 52Z" fillOpacity="0.6"/>
                    </svg>
                    Swell
                </>
            ),
            transparentMode: 'top',
        },
        themeSwitch: {
            mode: 'light-dark-system'
        },
        // see https://fumadocs.dev/docs/ui/navigation/links
        links: [],
    }
}