const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('"http://localhost:5005"')) {
        content = content.replace(/"http:\/\/localhost:5005"/g, '(process.env.REACT_APP_API_URL || "http://localhost:5005")');
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated:', fullPath);
      } else if (content.includes('http://localhost:5005')) {
         content = content.replace(/http:\/\/localhost:5005/g, '${process.env.REACT_APP_API_URL || "http://localhost:5005"}');
         fs.writeFileSync(fullPath, content, 'utf8');
         console.log('Updated (template literal):', fullPath);
      }
    }
  }
}

replaceInDir('/Users/amosnunes/Desktop/tisd/frontend/src');
