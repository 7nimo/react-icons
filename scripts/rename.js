import { extname, join, relative } from "path";
import fs from "fs/promises";

const srcDir = "../assets/streamline/collection/";
const outDir = "../assets/icons/streamline/";

const regex = /(?<=streamline-)(.*)(?=--free+)/g;

try {
  const files = await getFiles(srcDir);

  for (const file of files) {
    await fs.mkdir(file.outDir, { recursive: true });
  }

  renameFiles(files);
} catch (err) {
  console.error(err);
}

async function getFiles(path) {
  const entries = await fs.readdir(path, { withFileTypes: true });

  const files = entries
    .filter((entry) => entry.isFile())
    .map((file) => ({
      oldName: file.name,
      path: path + file.name,
      name: file.name.match(regex).pop() + extname(file.name).toLowerCase(),
      outDir: join(outDir, relative(srcDir, path)),
    }));

  const folders = entries.filter((entry) => entry.isDirectory());

  for (const folder of folders) {
    const nestedFiles = await getFiles(`${path}${folder.name}/`);
    files.push(...nestedFiles);
  }

  return files;
}

async function renameFiles(files) {
  files.forEach((file) => {
    try {
      fs.rename(file.path, join(file.outDir, file.name));
    } catch (err) {
      console.error(err);
    }
  });
}
