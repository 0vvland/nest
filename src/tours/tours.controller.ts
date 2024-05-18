import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ToursService } from '../services/tours/tours.service';
import { JwtAuthGuardService } from '../services/authentication/jwt-auth.guard/jwt-auth.guard.service';

@Controller('tours')
export class ToursController {
  constructor(private tourService: ToursService) {}

  @UseGuards(JwtAuthGuardService)
  @Get()
  getAllTours() {
    return this.tourService.getAll();
  }

  @UseGuards(JwtAuthGuardService)
  @Get(':id')
  getTourById(@Param('id') id) {
    return this.tourService.getById(id);
  }

  @UseGuards(JwtAuthGuardService)
  @Delete('clear')
  removeAllTours() {
    return this.tourService.deleteTours();
  }

  @UseGuards(JwtAuthGuardService)
  @Post('generate')
  generateTours() {
    return this.tourService.generateTours();
  }
}
