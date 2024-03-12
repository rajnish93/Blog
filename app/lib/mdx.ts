import matter from "gray-matter";
import fs from "fs";
import path from "path";

export async function fetchMarkdownContent(folder: string, fileName: string) {
  const root = process.cwd();
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
