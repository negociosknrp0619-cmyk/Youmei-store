const { Jimp } = require('jimp');

async function main() {
    console.log("Loading image...");
    const img = await Jimp.read('C:\\Users\\user\\.gemini\\antigravity\\brain\\24667234-747b-4d3e-92d1-48ec32b8fdaf\\.user_uploaded\\media_1786058964417.png');
    
    console.log("Applying circular mask...");
    img.circle(); // This masks the image into a circle, making corners transparent
    
    console.log("Saving images...");
    img.write('public/logo.png');
    img.write('app/icon.png');
    console.log("Successfully converted and saved transparent logos.");
}

main().catch(console.error);
