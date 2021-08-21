import 'reflect-metadata';
import { Controller, Param, Body, Get, Post, Put, Delete, QueryParam, OnUndefined } from 'routing-controllers';
import { Service } from 'typedi';
import { UserService } from '../services/user.service';

@Controller()
@Service()
export class UserController {
  // eslint-disable-next-line no-useless-constructor
  constructor (private userService: UserService) {}

  @Get('/users')
  async getAll (@QueryParam('skip') skip: number, @QueryParam('limit') limit: number) {
    return await this.userService.getAll(skip || 0, limit || 10);
  }

  @Get('/users/:id')
  @OnUndefined(404)
  async getOne (@Param('id') id: number) {
    return await this.userService.findById(id);
  }

  @Post('/users')
  async post (@Body() user: any) {
    return await this.userService.create(user);
  }

  @Put('/users/:id')
  async put (@Param('id') id: number, @Body() user: any) {
    return await this.userService.updateById(id, user);
  }

  @Delete('/users/:id')
  async remove (@Param('id') id: number) {
    return await this.userService.deleteById(id);
  }
}
