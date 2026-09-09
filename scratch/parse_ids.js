const fs = require('fs');
const content = fs.readFileSync('data/dummyProducts.js', 'utf8');
const regex = /id:\s*['"](.*?)['"].*?title:\s*['"](.*?)['"]/gs;
let match;
while((match = regex.exec(content)) !== null) {
  console.log(match[1] + ' -> ' + match[2]);
}
