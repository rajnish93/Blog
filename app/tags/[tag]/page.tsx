import BlogList from "@/components/blogList";
import { getAllFilesFrontMatter } from "@/lib/mdx";
import kebabCase from "@/lib/utils/kebabCase";

interface pageProps {
  params: { tag: string };
}

export default function TagPage({ params }: pageProps) {
  const allPosts = getAllFilesFrontMatter("blog");
  const filteredPosts = allPosts.filter(
    (post) =>
      !post.draft && post.tags.map((t) => kebabCase(t)).includes(params.tag)
  );

  const title =
    params.tag[0].toUpperCase() + params.tag.split(" ").join("-").slice(1);

  return <BlogList posts={filteredPosts} title={title} />;
}
