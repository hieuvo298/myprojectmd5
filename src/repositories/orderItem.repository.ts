import OrderItem from "../entities/orderItem";
import Products from "../entities/products.entity";
import productSize from "../entities/sizes.entity";

class OrderItemRepository {
  async addOrderItem(newOrderItem: any) {
    await OrderItem.create(newOrderItem);
  }

  async deleteOrderItem(id: number) {
    await OrderItem.destroy({
      where: { id },
    });
  }

  async getAllOrdersByUserId(userId: number): Promise<any[]> {
    return await OrderItem.findAll({
      where: {
        userId,
        isPayment: 1,
      },
    });
  }
  async updateIsPayment(orderItemId: number, isPayment: number): Promise<void> {
    await OrderItem.update(
      { isPayment },
      {
        where: { id: orderItemId },
      }
    );
  }
}

export default OrderItemRepository;
