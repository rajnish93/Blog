import matter from "gray-matter";
import { promises as fs } from "fs";
import path from "path";
import getAllFilesRecursively from "./utils/files";
import kebabCase from "./utils/kebabCase";

const root = process.cwd();

export async function fetchMarkdownContent(folder: string, fileName: string) {
  try {
    const files = await fs.readdir(path.join(root, "app", "data", folder));
    const file = files.filter((f) => f.includes(fileName))[0];
    const source = await fs.readFile(
      path.join(root, "app", "data", folder, file),
      "utf8"
    );

    const markdown = matter(source);
    const { data, content } = markdown;

    return { metadata: data, content };
  } catch (error) {
    console.error("Error fetching markdown content:", error);
    throw error; // Re-throw the error to propagate it further if needed
  }
}

export function formatSlug(slug: string) {
  const regex = /(\d{4})-(\d{2})-(\d{2})-/g;
  return slug.replace(regex, "").replace(/\.(mdx|md)/, "");
}

export async function getAllFilesFrontMatter(folder: string) {
  const prefixPaths = path.join(root, "app", "data", folder);
  const files = getAllFilesRecursively(prefixPaths);
  const allFrontMatter: PostProps[] = [];

  for (const file of files) {
    const fileName = file.slice(prefixPaths.length + 1).replace(/\\/g, "/");
    // Remove Unexpected File
    if (path.extname(fileName) !== ".md" && path.extname(fileName) !== ".mdx") {
      continue;
    }
    try {
      const source = await fs.readFile(file, "utf8");
      const { data: frontmatter } = matter(source);
      if (!frontmatter.draft) {
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
    } catch (error) {
      console.error(`Error reading file ${file}:`, error);
    }
  }

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

  const tagCount: TagCounts = {};

  // Read all files concurrently and process their tags
  await Promise.all(
    files.map(async (file) => {
      try {
        const source = await fs.readFile(
          path.join(root, "app", "data", type, file),
          "utf8"
        );
        const { data } = matter(source);
        if (data.tags && !data.draft) {
          data.tags.forEach((tag: string) => {
            const formattedTag = kebabCase(tag);
            tagCount[formattedTag] = (tagCount[formattedTag] || 0) + 1; // Increment count or initialize to 1
          });
        }
      } catch (error) {
        console.error(`Error reading file ${file}:`, error);
        throw error; // Re-throw the error to propagate it further if needed
      }
    })
  );

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
