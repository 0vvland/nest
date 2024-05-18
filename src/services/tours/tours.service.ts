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

  async generateTours() {
    await Promise.all(
      Array(this.tourCount)
        .fill(undefined)
        .map((_, i) => {
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
          return tourData.save();
        }),
    );
    return this.tourModel.find();
  }

  async deleteTours() {
    return this.tourModel.deleteMany({});
  }
}
