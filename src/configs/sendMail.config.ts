import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "nikeshop298@gmail.com",
    pass: "deas anuk vicf jnua",
  },
});

export default transporter;
