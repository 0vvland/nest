import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ToursService } from '../services/tours/tours.service';
import { JwtAuthGuardService } from '../services/authentication/jwt-auth.guard/jwt-auth.guard.service';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('tours')
export class ToursController {
  private static imgName: string;
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
  @Post()
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: './public/',
        filename: (req, file, cb) => {
          const imgType = file.mimetype.split('/');
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          console.log(file);
          const imgName =
            file.fieldname + '-' + uniqueSuffix + '.' + imgType[1];

          cb(null, imgName);
          ToursController.imgName = imgName;
        },
      }),
    }),
  )
  create(@Body() data) {
    console.log(data, ToursController.imgName);
    data.img = ToursController.imgName;
    return this.tourService.createTour(data);
  }

  @UseGuards(JwtAuthGuardService)
  @Get('name/:name')
  getByName(@Param('name') name: string) {
    return this.tourService.getByName(name);
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
