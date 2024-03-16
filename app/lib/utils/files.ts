import fs from "fs";
import path from "path";

const getAllFilesRecursively = (folder: string): string[] => {
  const fullPath = (extraPath: string) => path.join(folder, extraPath);
  const walkDir = (currentPath: string): string[] => {
    const fullPathResult = fullPath(currentPath);
    return fs.statSync(fullPathResult).isFile()
      ? [fullPathResult]
      : fs.readdirSync(fullPathResult).flatMap(walkDir);
  };

  return walkDir("");
};

export default getAllFilesRecursively;
