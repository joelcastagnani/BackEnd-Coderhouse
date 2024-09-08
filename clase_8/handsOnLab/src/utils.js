import { fileURLToPath } from "url";
import { dirname } from "path";

const __fileName = fileURLToPath(import.meta.url);
const __dirname = dirname(__fileName);

export default __dirname;
//todo esto podria ir en el app.js, preguntale al chat gpt

import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, __dirname + "/public/img");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage });
