import express, { Request, Response } from "express";
import RatingService from "../services/rating.service";


const ratingController = express.Router();
const ratingService = new RatingService();

ratingController.get("/", async (req: Request, res: Response) => {
  const result = await ratingService.getAllRatting();
  res.status(200).json(result);
});

ratingController.get("/:id", async (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const result = await ratingService.getRattingById(id);
  res.status(200).json(result);
});

ratingController.post("/", async (req: Request, res: Response) => {
  try {
    const newRatting = {
      userId:req.body.userId,
      productId:req.body.productId,
      comment: req.body.comment,
      rating: req.body.rating,
    };
    await ratingService.createRatting(newRatting);
    res.status(201).json({ msg: "Create ratting successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Có lỗi xảy ra lúc tạo ratting" });
    console.log(error);
  }
});
ratingController.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const result: any = await ratingService.deleteRattingById(id);
    if (!result) {
      res.status(404).json({ msg: "not found" });
    } else {
      res.status(201).json({ msg: "Delete successfully" });
    }
  } catch (error) {
    res.status(500).json({ msg: "Có lỗi xảy ra lúc xóa" });
  }
});

export default ratingController;