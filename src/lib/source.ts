import {docs} from '@/.source';
import {loader} from 'fumadocs-core/source';
import {i18n} from '@/lib/i18n';
import {icons} from 'lucide-react';
import {createElement} from 'react';

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
    icon(icon) {
        if (icon && icon in icons)
            return createElement(icons[icon as keyof typeof icons]);
    },
    baseUrl: '/',
    source: docs.toFumadocsSource(),
    i18n,
});
