const fs = require('fs');
let content = fs.readFileSync('data/dummyProducts.js', 'utf8');
content = content.replace(/title:\s*['"](.*?)['"]/g, (match, p1) => {
  return `title: '${p1.replace(/%2B/g, '+')}'`;
});
fs.writeFileSync('data/dummyProducts.js', content);
