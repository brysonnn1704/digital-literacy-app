const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'frontend/src');

function fixSyntax(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      fixSyntax(filePath);
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Fix the double quote issue: "${process.env.REACT_APP_API_URL || "http://localhost:5005"}/path"
      // Change to: `${process.env.REACT_APP_API_URL || "http://localhost:5005"}/path`
      const badPattern = /"\$\{process\.env\.REACT_APP_API_URL \|\| \\?"http:\/\/localhost:5005\\?"\}\/([^"]*)"/g;
      
      if (content.includes('"${process.env.REACT_APP_API_URL')) {
        content = content.replace(badPattern, '`${process.env.REACT_APP_API_URL || "http://localhost:5005"}/$1`');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Fixed syntax in ${file}`);
      }
    }
  });
}

fixSyntax(directoryPath);
console.log('Done fixing syntax!');
