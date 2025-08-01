import {source} from '@/lib/source';
import {
    DocsPage,
    DocsBody,
    DocsDescription,
    DocsTitle,
} from '@/components/layouts/page';
import {notFound} from 'next/navigation';
import {createRelativeLink} from 'fumadocs-ui/mdx';
import {getMDXComponents} from '@root/mdx-components';

export default async function Page(props: {
    params: Promise<{ lang: string; slug?: string[] }>;
}) {
    const params = await props.params;
    const page = source.getPage(params.slug, params.lang);
    if (!page) notFound();

    const MDXContent = page.data.body;

    return (
        <DocsPage toc={page.data.toc} full={page.data.full}>
            <DocsTitle>{page.data.title}</DocsTitle>
            <DocsDescription className="mb-2 pb-6 border-b">{page.data.description}</DocsDescription>
            <DocsBody>
                <MDXContent
                    components={getMDXComponents({
                        a: createRelativeLink(source, page)
                    })}
                />
            </DocsBody>
        </DocsPage>
    );
}

export async function generateMetadata(props: {
    params: Promise<{ slug?: string[]; lang: string }>;
}) {
    const params = await props.params;
    console.log('generateMetadata', params);
    const page = source.getPage(params.slug);
    if (!page) notFound();

    return {
        title: page.data.title + ' | Swell',
        description: page.data.description,
    };
}

export async function generateStaticParams() {
    return source.generateParams('slug');
}