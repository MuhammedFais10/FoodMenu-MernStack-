// const fs = require("fs");
// const path = require("path");

// const sourceDir = path.join(__dirname, "frontend", "dist");
// const destDir = path.join(__dirname, "Backend", "src", "public");

// // Function to copy files from source to destination
// function copyFiles(src, dest) {
//   if (!fs.existsSync(dest)) {
//     fs.mkdirSync(dest, { recursive: true });
//   }

//   fs.readdirSync(src).forEach((file) => {
//     const srcFile = path.join(src, file);
//     const destFile = path.join(dest, file);

//     if (fs.lstatSync(srcFile).isDirectory()) {
//       copyFiles(srcFile, destFile);
//     } else {
//       fs.copyFileSync(srcFile, destFile);
//     }
//   });
// }

// copyFiles(sourceDir, destDir);
// console.log("Files moved successfully");
