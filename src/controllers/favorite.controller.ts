import express, { Request, Response } from "express";
import FavoriteService from "../services/favorite.service";

const favoriteController = express.Router();
const favoriteService = new FavoriteService();

favoriteController.get("/", async (req: Request, res: Response) => {
  const result = await favoriteService.getAllFavorite();
  res.status(200).json(result);
});

favoriteController.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await favoriteService.getFavoriteByUserId(id);
  res.status(200).json(result);
});

favoriteController.post("/", async (req: Request, res: Response) => {
  try {
    const newFavorite = {
      userId: req.body.userId,
      productId: req.body.productId,
    };
    console.log(newFavorite);
    await favoriteService.createFavorite(newFavorite);
    res.status(201).json({ msg: "Create ratting successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Có lỗi xảy ra " });
    console.log(error);
  }
});

favoriteController.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result: any = await favoriteService.deleteFavoriteById(id);
    if (!result) {
      res.status(404).json({ msg: "not found" });
    } else {
      res.status(201).json({ msg: "Delete successfully" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Có lỗi xảy ra lúc xóa" });
  }
});

export default favoriteController;
