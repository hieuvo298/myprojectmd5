import { Request, Response } from "express";
import RatingRepository from "../repositories/rating.repository";
import FavoriteRepository from "../repositories/favorite.repository";
import ProductService from "./products.service";

const productService = new ProductService();

class FavoriteService {
  private favoriteRepository: FavoriteRepository;

  constructor() {
    this.favoriteRepository = new FavoriteRepository();
  }

  async getAllFavorite(): Promise<any> {
    return await this.favoriteRepository.getAllFavorite();
  }
  async getFavoriteByUserId(userId: number): Promise<any> {
    const data = await this.favoriteRepository.getFavoriteById(userId);
    return data;
  }
  async createFavorite(data: any) {
    const product = await productService.getProductById(data.productId);
    if (product) {
      const newFavorite = {
        userId: data.userId,
        productId: data.productId,
        productName: product.dataValues.productName,
        productImage: product.dataValues.productImage,
      };
      console.log(newFavorite);
      await this.favoriteRepository.createFavorite(newFavorite);
    }
  }

  async deleteFavoriteById(id: number) {
    const data = await this.favoriteRepository.deleteFavoriteById(id);
    return data;
  }
}

export default FavoriteService;
