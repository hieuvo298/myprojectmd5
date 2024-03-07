import Payment from "../entities/payment.entity";

class PaymentRepository {
  async createPayment(payment: any) {
    await Payment.create(payment);
  }

  async updatePayment(id: number, status: number) {
    return await Payment.update({ status: status }, { where: { id: id } });
  }

  async getAllPayments() {
    return await Payment.findAll();
  }

  async getPaymentsByUserId(userId: number) {
    return await Payment.findAll({ where: { userId: userId } });
  }
  
}

export default PaymentRepository;
