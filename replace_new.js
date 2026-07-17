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
  { regex: /\+91-6268409259/g, replacement: "+91-7000552999" },
  { regex: /\+916268409259/g, replacement: "+917000552999" },
  { regex: /6268409259/g, replacement: "7000552999" },
  { regex: /\+91 62684 09259/g, replacement: "+91 70005 52999" }
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
