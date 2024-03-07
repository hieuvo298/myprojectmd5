import { Request, Response } from "express";
import RatingRepository from "../repositories/rating.repository";


class RatingService {
  private ratingRepository: RatingRepository;

  constructor() {
    this.ratingRepository = new RatingRepository();
  }

  async getAllRatting(): Promise<any> {
    return await this.ratingRepository.getAllRating();
  }
  async getRattingById(id: number): Promise<any> {
    const data = await this.ratingRepository.getRatingById(id);
    return data;
  }
  async createRatting(formRequest: any) {
    await this.ratingRepository.createRating(formRequest);
  }

  async deleteRattingById(id: number) {
    const data = await this.ratingRepository.deleteById(id);
    return data;
  }
}

export default RatingService;