const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'frontend/src');

function findAndReplace(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      findAndReplace(filePath);
    } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
      let content = fs.readFileSync(filePath, 'utf8');
      
      // Check if the file contains the hardcoded localhost URL
      if (content.includes('"http://localhost:5005/')) {
        // Replace: "http://localhost:5005/path" -> `${process.env.REACT_APP_API_URL || "http://localhost:5005"}/path`
        // We use a regex to capture everything after the slash until the closing quote
        content = content.replace(/"http:\/\/localhost:5005\/([^"]*)"/g, '`${process.env.REACT_APP_API_URL || "http://localhost:5005"}/$1`');
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated ${file}`);
      }
      
      if (content.includes('`http://localhost:5005/')) {
        // Handle template literals: `http://localhost:5005/dashboard/${user.id}`
        content = content.replace(/`http:\/\/localhost:5005\/([^`]*)`/g, '`${process.env.REACT_APP_API_URL || "http://localhost:5005"}/$1`');
        
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated template literal in ${file}`);
      }
    }
  });
}

findAndReplace(directoryPath);
console.log('Done preparing frontend for production!');
