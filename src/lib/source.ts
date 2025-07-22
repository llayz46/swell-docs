import {docs} from '@/.source';
import {loader} from 'fumadocs-core/source';
import {i18n} from '@/lib/i18n';

// See https://fumadocs.vercel.app/docs/headless/source-api for more info
export const source = loader({
    baseUrl: '/',
    source: docs.toFumadocsSource(),
    i18n,
});
