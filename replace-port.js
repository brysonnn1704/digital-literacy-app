const fs = require('fs');
const path = require('path');

function replaceInDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInDir(fullPath);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.json')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('localhost:5000') || content.includes('port 5000') || content.includes('listen(5000')) {
        content = content.replace(/localhost:5000/g, 'localhost:5005');
        content = content.replace(/port 5000/g, 'port 5005');
        content = content.replace(/listen\(5000/g, 'listen(5005');
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated:', fullPath);
      }
    }
  }
}

replaceInDir('/Users/amosnunes/Desktop/tisd/frontend');
replaceInDir('/Users/amosnunes/Desktop/tisd/backend');
