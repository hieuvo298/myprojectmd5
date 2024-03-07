import { Op } from "sequelize";
import Rating from "../entities/rate.entity";


class RatingRepository {
  async getAllRating() {
    return await Rating.findAll();
  }

  async getRatingById(id: number) {
    return await Rating.findOne({
      where: {
        id,
      },
    });
  }

  async createRating(formRequest: any) {
    return await Rating.create(formRequest);
  }

  async deleteById(id: number) {
    return await Rating.destroy({
      where: {
        id,
      },
    });
  }
}

export default RatingRepository;