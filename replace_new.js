const fs = require('fs');
const path = require('path');

const walk = (dir) => {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(filePath));
    } else {
      if (filePath.endsWith('.js') || filePath.endsWith('.jsx') || filePath.endsWith('.css') || filePath.endsWith('.html') || filePath.endsWith('.svg') || filePath.endsWith('.json')) {
        results.push(filePath);
      }
    }
  });
  return results;
};

const replacements = [
  { regex: /\+91-9243758191/g, replacement: "+91-9243758191" },
  { regex: /\+919243758191/g, replacement: "+919243758191" },
  { regex: /9243758191/g, replacement: "9243758191" },
  { regex: /\+91 92437 58191/g, replacement: "+91 92437 58191" }
];

const files = walk('./client');
let modifiedCount = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let originalContent = content;
  
  replacements.forEach(({ regex, replacement }) => {
    content = content.replace(regex, replacement);
  });
  
  if (content !== originalContent) {
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Modified: ${file}`);
    modifiedCount++;
  }
});

console.log(`Total files modified: ${modifiedCount}`);
