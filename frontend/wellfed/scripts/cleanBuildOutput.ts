const fs = require('fs');
const path = require('path');

function deleteCompressedFiles(dir: string) {
  if (!fs.existsSync(dir)) {
    console.error(`Directory not found: ${dir}`);
    return;
  }

  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filepath = path.join(dir, file);
    const stat = fs.statSync(filepath);

    if (stat.isDirectory()) {
      deleteCompressedFiles(filepath);
    } else if (/\.(gz|br)$/i.test(file)) {
      try {
        fs.unlinkSync(filepath);
        console.log(`Deleted compressed file: ${filepath}`);
      } catch (err) {
        console.error(`Error deleting file ${filepath}:`, err);
      }
    }
  }
}

const buildDir = path.resolve(__dirname, '../.next');
deleteCompressedFiles(buildDir);
