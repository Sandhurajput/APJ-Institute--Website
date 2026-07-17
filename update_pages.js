const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, 'client/src/pages');
const pages = [
  'CoursesPage.jsx',
  'FacilitiesPage.jsx',
  'AdmissionPage.jsx',
  'ContactPage.jsx',
  'About.jsx'
];

for (const file of pages) {
  const filePath = path.join(pagesDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Remove imports
    content = content.replace(/import TopHeaderBar from '\.\.\/components\/home\/TopHeaderBar';\n/g, '');
    content = content.replace(/import Navbar from '\.\.\/components\/home\/Navbar';\n/g, '');
    content = content.replace(/import Footer from '\.\.\/components\/home\/Footer';\n/g, '');
    
    // Remove tags
    content = content.replace(/[ \t]*<TopHeaderBar \/>\n/g, '');
    content = content.replace(/[ \t]*<Navbar \/>\n/g, '');
    content = content.replace(/[ \t]*<Footer \/>\n/g, '');
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}
