import express, { Request, Response } from "express";
import OrderItemService from "../services/orderItem.service";

const orderItemService = new OrderItemService();

const orderItemController = express.Router();

orderItemController.post("/add", async (req: Request, res: Response) => {
  try {
    const newOrderItem = {
      productId: Number(req.body.productId),
      userId: Number(req.body.userId),
      quantity: Number(req.body.quantity),
      sizeNumber: Number(req.body.sizeNumber),
    };
    await orderItemService.addOrderItem(newOrderItem);
    res.status(201).json({ msg: "Order item added successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Internal server error" });
  }
});

orderItemController.get(
  "/get-all/:userId",
  async (req: Request, res: Response) => {
    try {
      const userId = Number(req.params.userId);
      const orders = await orderItemService.getAllOrdersByUserId(userId);
      // console.log(orders);

      res.status(200).json({ data: orders });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  }
);

orderItemController.delete(
  "/remove/:id",
  async (req: Request, res: Response) => {
    try {
      const orderItemId = Number(req.params.id);
      await orderItemService.removeOrderItem(orderItemId);
      res.status(200).json({ msg: "Order item removed successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  }
);

orderItemController.patch(
  "/update/:id",
  async (req: Request, res: Response) => {
    try {
      const orderItemId = Number(req.params.id);
      const isPayment = Number(req.body.isPayment);
      await orderItemService.updateIsPayment(orderItemId, isPayment);
      res.status(200).json({ msg: "Payment status updated successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Internal server error" });
    }
  }
);

export default orderItemController;
