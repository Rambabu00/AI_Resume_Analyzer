import multer from "multer";
import { Request } from "express";

const storage = multer.memoryStorage();

const fileFilter: multer.Options["fileFilter"] = (
  req: Request,
  file,
  cb
) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only PDF and DOCX allowed"));
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

export default upload;
