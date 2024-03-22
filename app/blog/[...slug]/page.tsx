import { fetchMarkdownContent } from "@/lib/mdx";
import formatDate from "@/lib/utils/formatDate";
import ReactMarkdown from "react-markdown";

interface pageProps {
  params: { slug: string[] };
}

export default async function BlogDetailsPage({ params }: pageProps) {
  const { metadata, content } = await fetchMarkdownContent(
    "blog",
    params.slug.join("/")
  );

  return (
    <article>
      <header>
        <div className="pb-10 space-y-1 text-center border-b border-gray-200 dark:border-gray-700">
          <dl>
            <div>
              <dt className="sr-only">Published on</dt>
              <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                {metadata.date && (
                  <time dateTime={metadata.date}>
                    {formatDate(metadata.date)}
                  </time>
                )}
              </dd>
            </div>
          </dl>
          <div>
            <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
              {metadata.title}
            </h1>
          </div>
        </div>
      </header>
      <div className="pt-8 pb-8 prose dark:prose-dark max-w-none xl:col-span-2">
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
    </article>
  );
}
