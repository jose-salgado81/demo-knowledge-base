const fs = require('fs');
const path = require('path');

const docsDir = path.join(__dirname, '../docs');
const outputPath = path.join(__dirname, '../static/kb-index.json');

// Helper to recursively read all markdown/mdx files
function getMarkdownFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getMarkdownFiles(filePath, fileList);
    } else if (file.endsWith('.md') || file.endsWith('.mdx')) {
      fileList.push(filePath);
    }
  });
  return fileList;
}

function buildIndex() {
  if (!fs.existsSync(docsDir)) {
    console.log('Docs directory not found, skipping KB index generation.');
    return;
  }

  const files = getMarkdownFiles(docsDir);
  const index = [];

  files.forEach((file) => {
    const content = fs.readFileSync(file, 'utf8');
    const relativePath = path.relative(docsDir, file);
    
    index.push({
      id: relativePath,
      title: relativePath.replace(/\\/g, '/').replace(/\.mdx?$/, ''),
      content: content.replace(/import.*?;/g, '').trim(), // strip MDX imports
    });
  });

  fs.writeFileSync(outputPath, JSON.stringify(index, null, 2));
  console.log(`Successfully generated KB index with ${index.length} documents at static/kb-index.json`);
}

buildIndex();