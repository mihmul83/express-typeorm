import 'reflect-metadata';
import { Controller, Param, Body, Get, Post, Delete, QueryParam, OnUndefined } from 'routing-controllers';
import { Service } from 'typedi';
import { PhotoService } from '../services/photo.service';

@Controller()
@Service()
export class PhotoController {
  // eslint-disable-next-line no-useless-constructor
  constructor (private photoService: PhotoService) {}

  @Get('/photos')
  async getAll (@QueryParam('skip') skip: number, @QueryParam('limit') limit: number) {
    return await this.photoService.getAll(skip || 0, limit || 10);
  }

  @Get('/photos/:id')
  @OnUndefined(404)
  async getOne (@Param('id') id: number) {
    return await this.photoService.findById(id);
  }

  @Post('/photos')
  async post (@Body() photo: any) {
    return await this.photoService.create(photo);
  }

  @Delete('/photos/:id')
  async remove (@Param('id') id: number) {
    return await this.photoService.deleteById(id);
  }
}
