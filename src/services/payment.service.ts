// orderItem.service.ts
import OrderItemRepository from "../repositories/orderItem.repository";
import paymentRepository from "../repositories/payment.repository";
import OrderItemService from "./orderItem.service";
import ProductService from "./products.service";

const productService = new ProductService
const orderItemService =new OrderItemService
class paymentService {
  private paymentRepository: paymentRepository;

  constructor() {
    this.paymentRepository = new paymentRepository();
  }
  async createPayment (payment:any,codePayment:string){
    try {
      await this.paymentRepository.createPayment(payment)
      // const orderData= await orderItemService.getAllOrdersByUserId(payment.userId);
      // const quantity = orderData[0].map((e:any)=>{
      //   return {
      //     id:e.productId,
      //     quantity:e.quantity,
      //   }
      // })
      // console.log(orderData);
      // const arrId:number[]=[]
      // orderData[0].forEach((item:any )=> {
      //   arrId.push(item.productId)
      // });
      
      // const arrProducts= await productService.getProductByIds(arrId)
      // const newStock:any =[]
      // arrProducts.forEach((item:any )=>{
      //   quantity.forEach((e:any)=>{
      //     if(item.id == e.id){
      //       newStock.push({
      //         id:item.id,
      //         stock: item.stock - e.quantity
      //       })
      //     }
      //   })
      // });
      // console.log();
      // const newOrderItem:any=orderData[0].map((item:any)=>{
      //   return {
      //     ...item,
      //     codePayment:codePayment,
      //     isPayment:2
      //   }
      // })
    } catch (error) {
      console.log(error);
    }
  } 
  async updatePayment(id:number,status:number){
    return await this.paymentRepository.updatePayment(id,status)
  }
  async getAllPayments(){
    return await this.paymentRepository.getAllPayments()
  }
  async getPaymentsByUserId(userId: number) {
    return await this.paymentRepository.getPaymentsByUserId(userId);
  }
}

export default paymentService;
