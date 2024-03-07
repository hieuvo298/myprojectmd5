import ProductRepository from "../repositories/product.repository";

class ProductService {
  private productRepository: ProductRepository;

  constructor() {
    this.productRepository = new ProductRepository();
  }

  async createProduct(newProduct: any): Promise<void> {
    await this.productRepository.createProduct(newProduct);
  }

  async updateProduct(formUpdate: any, id: number): Promise<void> {
    await this.productRepository.updateProduct(formUpdate, id);
  }

  async softDeleteProduct(id: number): Promise<void> {
    await this.productRepository.softDeleteProduct(id);
  }
  async returnProduct(id: number): Promise<void> {
    await this.productRepository.returnProduct(id);
  }

  async getProductById(id: number) {
    return await this.productRepository.getProductById(id);
  }
  async getProductsByCategory(category: number, page: number, pageSize: number, sortBy: string | null): Promise<any[]> {
    return await this.productRepository.getProductsByCategory(category, page, pageSize, sortBy);
  }
  async getAllProduct(page: number, pageSize: number, sortBy: string | null): Promise<any[]> {
    return await this.productRepository.getAllProduct(page, pageSize, sortBy);
  }
  async getProductByIds(ids: number[]): Promise<any[]> {
    return await this.productRepository.getProductByIds(ids);
  }
  
  async getAllProductAdmin() {
    return await this.productRepository.getAllProductAdmin();
  }
  async searchProductByName(name: string): Promise<any[]> {
    return await this.productRepository.searchProductByName(name);
  }
}

export default ProductService;