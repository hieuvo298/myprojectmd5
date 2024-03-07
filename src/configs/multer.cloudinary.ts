import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();
cloudinary.config({
  cloud_name: "dv9tkz5pa",
  api_key: "674178638899189",
  api_secret: "cKcMQXVogDxvdiOSjXJP_96Wkdo",
});

const store = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => {
    return {
      folder: "myImages",
      format: "png",
    };
  },
});

const fileFilter = (req: any, file: any, cb: any) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    const maxsize = 5 * 1024 * 1024;
    if (file.size > maxsize) {
      console.log("File exceeds size limit");
      cb(null, false);
    } else {
      console.log("File check passed");
      cb(null, true);
    }
  } else {
    console.log("Invalid file type");
    cb(null, false);
  }
};

const uploadCloud = multer({
  storage: store,
  fileFilter,
});

export default uploadCloud;
