import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Tour, TourDocument } from '../../schemas/tour';
import { Model } from 'mongoose';
import { TourDto } from '../../dto/tour.dto';

@Injectable()
export class ToursService {
  private tourCount = 10;

  constructor(@InjectModel(Tour.name) private tourModel: Model<TourDocument>) {}

  getAll() {
    return this.tourModel.find();
  }

  getById(id: string) {
    return this.tourModel.findById(id);
  }

  generateTours() {
    for (let i = 0; i <= this.tourCount; i++) {
      const tour = new TourDto(
        'test' + i,
        'test desc',
        'test operator',
        '1234',
        '',
        '',
        '',
      );
      const tourData = new this.tourModel(tour);
      tourData.save();
    }
    return [];
  }

  async deleteTours() {
    return this.tourModel.deleteMany({});
  }
}
