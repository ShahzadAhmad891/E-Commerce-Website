// const multer = require("multer");
// const path = require("path");
import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/products");
  },
  filename: (req, file, cb) => {
    const uniqueName =
      Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueName + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

export default upload;





// module.exports = multer({ storage, fileFilter });




// import multer from "multer";
// import path from "path";

// const storage = multer.diskStorage({
//   destination(req, file, cb) {
//     cb(null, "uploads/products");
//   },
//   filename(req, file, cb) {
//     cb(
//       null,
//       `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(
//         file.originalname
//       )}`
//     );
//   },
// });

// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpg|jpeg|png|webp/;
//   const ext = allowedTypes.test(path.extname(file.originalname).toLowerCase());
//   const mime = allowedTypes.test(file.mimetype);

//   if (ext && mime) cb(null, true);
//   else cb(new Error("Images only!"));
// };

// const upload = multer({ storage, fileFilter });

// export default upload;





