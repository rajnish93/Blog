import matter from "gray-matter";
import fs from "fs";
import path from "path";
import getAllFilesRecursively from "./utils/files";

const root = process.cwd();

export async function fetchMarkdownContent(folder: string, fileName: string) {
  const file = fs
    .readdirSync(path.join(root, "app", "data", folder))
    .filter((f) => f.includes(fileName))[0];
  const source = fs.readFileSync(
    path.join(root, "app", "data", folder, file),
    "utf8"
  );

  const markdown = matter(source);
  const { data, content } = markdown;

  return { metadata: data, content };
}

export function formatSlug(slug: string) {
  const regex = /(\d{4})-(\d{2})-(\d{2})-/g;
  return slug.replace(regex, "").replace(/\.(mdx|md)/, "");
}

export async function getAllFilesFrontMatter(folder: string) {
  const prefixPaths = path.join(root, "app", "data", folder);

  const files = getAllFilesRecursively(prefixPaths);

  const allFrontMatter: PostProps[] = [];

  files.forEach((file: string) => {
    // Replace is needed to work on Windows
    const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, "/");
    // Remove Unexpected File
    if (path.extname(fileName) !== ".md" && path.extname(fileName) !== ".mdx") {
      return;
    }
    const source = fs.readFileSync(file, "utf8");
    const { data: frontmatter } = matter(source);
    if (frontmatter.draft !== true) {
      allFrontMatter.push({
        ...frontmatter,
        slug: formatSlug(fileName),
        date: frontmatter.date
          ? new Date(frontmatter.date).toISOString()
          : null,
        title: frontmatter.title,
        summary: frontmatter.summary,
        tags: frontmatter.tags,
      });
    }
  });

  return allFrontMatter.sort((a, b) => {
    const dateA = a.date || "0";
    const dateB = b.date || "0";
    return Date.parse(dateB) - Date.parse(dateA);
  });
}

export interface PostProps {
  title: string;
  summary: string;
  tags: string[];
  slug: string;
  date: string | null;
}
