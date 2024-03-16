import matter from "gray-matter";
import fs from "fs";
import path from "path";
import getAllFilesRecursively from "./utils/files";
import kebabCase from "./utils/kebabCase";

const root = process.cwd();

export function fetchMarkdownContent(folder: string, fileName: string) {
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

export function getAllFilesFrontMatter(folder: string) {
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

export function getFiles(type: string) {
  const prefixPaths = path.join(root, "app", "data", type);
  const files = getAllFilesRecursively(prefixPaths);
  // Only want to return blog/path and ignore root, replace is needed to work on Windows
  return files.map((file) =>
    file.slice(prefixPaths.length + 1).replace(/\\/g, "/")
  );
}

export async function getAllTags(type: string) {
  const files = getFiles(type);

  let tagCount: TagCounts = {};
  // Iterate through each post, putting all found tags into `tags`
  files.forEach((file) => {
    const source = fs.readFileSync(
      path.join(root, "app", "data", type, file),
      "utf8"
    );
    const { data } = matter(source);
    if (data.tags && data.draft !== true) {
      data.tags.forEach((tag: string) => {
        const formattedTag = kebabCase(tag);
        if (formattedTag in tagCount) {
          tagCount[formattedTag] += 1;
        } else {
          tagCount[formattedTag] = 1;
        }
      });
    }
  });

  return tagCount;
}

export interface PostProps {
  title: string;
  summary: string;
  tags: string[];
  slug: string;
  draft?: string;
  date: string | null;
}

export interface TagCounts {
  [key: string]: number;
}
