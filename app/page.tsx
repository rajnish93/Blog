import Link from "@/components/customLink";
import siteMetadata from "@/data/siteMetadata";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import formatDate from "@/lib/utils/formatDate";
import Tag from "@/components/tag";

export default async function Home() {
  const posts = await getAllFilesFrontMatter("blog");
  const MAX_DISPLAY = 5;

  return (
    <>
      <div>
        <div className="flex flex-col items-center my-6 xl:flex-row gap-x-12 xl:mb-12">
          <div className="pt-6">
            <h1 className="pb-6 text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
              Hi, I’m Rajnish Singh
            </h1>
            <h2 className="text-lg prose text-gray-600 dark:text-gray-400">
              {`Welcome to my blog - ${siteMetadata.description}. In my free time, I like developing `}
              <Link href="/projects">side projects</Link>
              {" and "}
              <Link href="/blog">blogging</Link>
              {" about them. Have a good read!"}
            </h2>
          </div>
        </div>
        <h2 className="flex pb-6 text-2xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100 sm:text-3xl md:text-5xl">
          Latest
        </h2>
        <hr className="border-gray-200 dark:border-gray-700" />
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {!posts.length && "No posts found."}
          {posts.slice(0, MAX_DISPLAY).map((frontMatter) => {
            const { slug, date, title, summary, tags } = frontMatter;
            return (
              <li key={slug} className="py-12">
                <article>
                  <div className="space-y-2 xl:grid xl:grid-cols-4 xl:space-y-0 xl:items-baseline">
                    <dl>
                      <dt className="sr-only">Published on</dt>
                      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400">
                        {date && (
                          <time dateTime={date}>{formatDate(date)}</time>
                        )}
                      </dd>
                    </dl>
                    <div className="space-y-5 xl:col-span-3">
                      <div className="space-y-6">
                        <div>
                          <h2 className="text-2xl font-bold leading-8 tracking-tight">
                            <Link
                              href={`/blog/${slug}`}
                              className="text-gray-900 dark:text-gray-100"
                            >
                              {title}
                            </Link>
                          </h2>
                          <div className="flex flex-wrap">
                            {tags.map((tag) => (
                              <Tag key={tag} text={tag} />
                            ))}
                          </div>
                        </div>
                        <div className="prose text-gray-500 max-w-none dark:text-gray-400">
                          {summary}
                        </div>
                      </div>
                      <div className="text-base font-medium leading-6">
                        <Link
                          href={`/blog/${slug}`}
                          className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                          aria-label={`Read "${title}"`}
                        >
                          Read more &rarr;
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
      {posts.length > MAX_DISPLAY && (
        <div className="flex justify-end text-base font-medium leading-6">
          <Link
            href="/blog"
            className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
            aria-label="all posts"
          >
            All Posts &rarr;
          </Link>
        </div>
      )}
    </>
  );
}
