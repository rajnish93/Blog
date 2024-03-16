import BlogList from "@/components/blogList";
import { getAllFilesFrontMatter } from "@/lib/mdx";

export const POSTS_PER_PAGE = 100;

export default async function Blog() {
  const posts = await getAllFilesFrontMatter("blog");
  const initialDisplayPosts = posts.slice(0, POSTS_PER_PAGE);

  return (
    <BlogList
      posts={posts}
      initialDisplayPosts={initialDisplayPosts}
      title="All Posts"
    />
  );
}
