import { Op } from "sequelize";
import Rating from "../entities/rate.entity";
import Favorite from "../entities/favorite.entity";
import Products from "../entities/products.entity";


class FavoriteRepository {
  async getAllFavorite() {
    return await Favorite.findAll();
  }

  async getFavoriteById(id: number) {
    return await Favorite.findOne({
      where: {
        id,
      },
    });
  }

  async createFavorite(newFavorite: any) {
    return await Favorite.create(newFavorite);
  }

  async deleteFavoriteById(id: number) {
    return await Favorite.destroy({
      where: {
        id,
      },
    });
  }
}

export default FavoriteRepository;