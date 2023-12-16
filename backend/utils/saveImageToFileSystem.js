const fs = require("fs");
const path = require("path");

const saveImageToFileSystem = async (base64Image) => {
  try {
    const matches = base64Image.match(/^data:([A-Za-z-+/]+);base64,(.+)$/);
    const type = matches[1];
    const buffer = Buffer.from(matches[2], "base64");

    const fileName = `image_${Date.now()}.${type.split("/")[1]}`;
    const filePath = path.join(__dirname, "uploads", fileName);

    fs.writeFileSync(filePath, buffer);

    return filePath;
  } catch (error) {
    console.error("Error saving image:", error);
    throw error;
  }
};

module.exports = saveImageToFileSystem;
