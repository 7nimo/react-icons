import fs from 'fs/promises';
import { extname, join, relative } from 'path';

const srcDir = '../assets/streamline/collection/';
const outDir = '../assets/icons/streamline/';

const regex = /(?<=streamline-)(.*)(?=--free+)/g;

try {
  const files = await getFiles(srcDir);
  // const destFiles = await getDestFiles(files, regex, srcDir, outDir);

  for (const file of files) {
    await fs.mkdir(file.outDir, { recursive: true });
  }

  renameFiles(files);
} catch (err) {
  console.error(err);
}

async function getFiles (path) {
  const entries = await fs.readdir(path, { withFileTypes: true });

  const files = entries
    .filter((entry) => entry.isFile())
    .map((file) => ({
      name: file.name.match(regex).pop() + extname(file.name).toLowerCase(),
      oldName: file.name,
      outDir: join(outDir, relative(srcDir, path)),
      path: path + file.name
    }));

  const folders = entries.filter((entry) => entry.isDirectory());

  for (const folder of folders) {
    const nestedFiles = await getFiles(`${path}${folder.name}/`);

    files.push(...nestedFiles);
  }

  return files;
}

// async function getDestFiles(files, regex, srcDir, outDir) {
//   const dir = join(outDir, relative(srcDir, path))
//   const destFiles = files.map((file) => ({
//     name: file.name.match(regex).pop() + extname(file.name).toLowerCase(),
//     outDir: join(outDir)
//   }))
// }

function renameFiles (files) {
  files.forEach((file) => {
    try {
      fs.rename(file.path, join(file.outDir, file.name));
    } catch (err) {
      console.error(err);
    }
  });
}
