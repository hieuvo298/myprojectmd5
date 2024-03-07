import Products from "../entities/products.entity";
import productSize from "../entities/sizes.entity";
import { Op } from "sequelize";

class ProductRepository {
  async createProduct(newProduct: any) {
    await Products.create(newProduct);
  }

  async updateProduct(formUpdate: any, id: number) {
    await Products.update(formUpdate, { where: { id } });
  }

  async softDeleteProduct(id: number) {
    await Products.update({ isDelete: 1 }, { where: { id, isDelete: 0 } });
  }
  async returnProduct(id: number) {
    await Products.update({ isDelete: 0 }, { where: { id, isDelete: 1 } });
  }
  async getProductById(id: number) {
    return await Products.findOne({
      where: { id, isDelete: 0 },
      include: {
        model: productSize,
      },
    });
  }
  async getProductByIds(ids: number[]): Promise<any[]> {
    return await Products.findAll({
      where: { id: ids, isDelete: 0 },
      include: {
        model: productSize,
      },
    });
  }
  async getAllProduct(page: number, pageSize: number, sortBy: string | null) {
    const offset = (page - 1) * pageSize;
    let order: any = [];

    if (sortBy === "lowToHigh") {
      order = [["price", "ASC"]];
    } else if (sortBy === "highToLow") {
      order = [["price", "DESC"]];
    }
    return await Products.findAll({
      include: { model: productSize },
      where: { isDelete: 0 },
      limit: pageSize,
      offset: offset,
      order: order,
    });
  }
  async getAllProductAdmin() {
    return await Products.findAll({
      include: { model: productSize}
    });
  }
  async getProductsByCategory(
    category: number,
    page: number,
    pageSize: number,
    sortBy: string | null
  ): Promise<any[]> {
    const offset = (page - 1) * pageSize;
    let order: any = [];

    if (sortBy == "lowToHigh") {
      order = [["price", "ASC"]];
    } else if (sortBy == "highToLow") {
      order = [["price", "DESC"]];
    }
    return await Products.findAll({
      where: { categoryId: category, isDelete: 0 },
      limit: pageSize,
      offset: offset,
      order: order,
    });
  }

  async searchProductByName(name: string): Promise<any[]> {
    return await Products.findAll({
      where: {
        isDelete: 0,
        productName: {
          [Op.iLike]: `%${name}%`,
        },
      },
      include: {
        model: productSize,
      },
    });
  }
}

export default ProductRepository;