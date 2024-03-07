import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import authMiddleware from "../middlewares/authMiddleware";
import checkRole from "../middlewares/checkRole";
import uploadCloud from "../configs/multer.cloudinary";
import checkUsers from "../middlewares/checkUser";
import UserService from "../services/user.service";
import { body, validationResult } from "express-validator";

const usersController = express.Router();
const userService = new UserService();

usersController.post(
  "/register",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const salt = bcrypt.genSaltSync(10);
      const hashPass = bcrypt.hashSync(req.body.password, salt);

      const newUser = {
        userName: req.body.userName,
        email: req.body.email,
        password: hashPass,
      };

      console.log(newUser);

      await userService.register(newUser);
      res.status(201).json({ msg: "create successfully" });
    } catch (error) {
      console.error(error);
      res.status(400).json({ msg: "email is already exist" });
    }
  }
);

usersController.post("/login", async (req: any, res: Response) => {
  try {
    const loginForm = {
      email: req.body.email,
      password: req.body.password,
    };
    const result = await userService.login(loginForm);
    if (result == 1) {
      res.status(400).json({ msg: "Email wrong" });
    } else if (result == 2) {
      res.status(400).json({ msg: "Password wrong" });
    } else {
      res.status(200).json(result);
    }
  } catch (error) {
    res.status(400).json({ msg: "login failed" });
  }
});
usersController
  .patch(
    "/update/:id",
    checkUsers,
    uploadCloud.single("myImages"),
    async (req: Request, res: Response) => {
      try {
        const id = Number(req.params.id);
        let updateUser;
        if (req.file) {
          updateUser = {
            ...req.body,
            avatar: req.file.path,
          };
        } else {
          updateUser = {
            ...req.body,
          };
        }
        await userService.updateUser(updateUser, id);
        res.status(200).json({ msg: "updated" });
      } catch (error) {
        res.status(400).json({ msg: "update failed" });
      }
    }
  )
  .get("/get-all", async (req, res) => {
    try {
      const data = await userService.getAll();
      res.status(200).json({ data });
    } catch (error) {
      res.status(400).json({ msg: "get failed" });
    }
  });
usersController.get("/:id", async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id);
    const user = await userService.getUserById(userId);

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ msg: "User not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

export default usersController;
