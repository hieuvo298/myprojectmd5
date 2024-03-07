import productSize from "../entities/sizes.entity";
import OrderItemRepository from "../repositories/orderItem.repository";
import ProductService from "./products.service";

const productService = new ProductService();

class OrderItemService {
  private orderItemRepository: OrderItemRepository;

  constructor() {
    this.orderItemRepository = new OrderItemRepository();
  }

  async addOrderItem(data: any) {
    const product = await productService.getProductById(data.productId);

    if (product) {
      const orderItem = {
        userId: data.userId,
        productId: data.productId,
        quantity: data.quantity,
        sizeNumber: data.sizeNumber,
        productName: product.dataValues.productName,
        productImage: product.dataValues.productImage,
        price: product.dataValues.price,
        totalPrice: data.quantity * product.dataValues.price,
      };
      await this.orderItemRepository.addOrderItem(orderItem);
    } else {
      throw new Error("Product not found");
    }
  }

  async removeOrderItem(id: number): Promise<void> {
    await this.orderItemRepository.deleteOrderItem(id);
  }

  async getAllOrdersByUserId(userId: number): Promise<any[]> {
    return await this.orderItemRepository.getAllOrdersByUserId(userId);
  }
  async updateIsPayment(orderItemId: number, isPayment: number): Promise<void> {
    await this.orderItemRepository.updateIsPayment(orderItemId, isPayment);
  }
}

export default OrderItemService;
