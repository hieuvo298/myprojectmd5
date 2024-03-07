import express, { Request, Response } from "express";
import PaymentService from "../services/payment.service";
import { v4 as uuidv4 } from 'uuid';

const paymentController = express.Router();
const paymentService = new PaymentService();

paymentController.post('/create/:id', async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.id);
        const codePayment = uuidv4();
        const data = {
            userId,
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            phoneNumber: req.body.phoneNumber,
            paymentMethod:req.body.paymentMethod,
            codePayment,
            subTotal: Number(req.body.subTotal),
        };
        console.log(data);
        await paymentService.createPayment(data, codePayment);
        res.status(200).json("payment created successfully");
    } catch (error) {
        console.log(error);
        res.status(500).json("payment error");
    }
});

paymentController.patch('/update/:id', async (req, res) => {
    try {
        const id = Number(req.params.id);
        const status = req.body.status;
        const result = await paymentService.updatePayment(id, status);
        if (result[0] === 0) {
            res.status(400).json('not found');
        } else {
            res.status(200).json('updated status successfully');
        }
    } catch (error) {
        res.status(500).json('internal server error');
    }
});
paymentController.get('/get-by-id/:id', async (req: Request, res: Response) => {
    try {
        const userId = Number(req.params.id);
        const data = await paymentService.getPaymentsByUserId(userId);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json('internal server error');
    }
});
paymentController.get('/get-all', async (req, res) => {
    try {
        const data = await paymentService.getAllPayments();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json('internal server error'); 
    }
});

export default paymentController;
