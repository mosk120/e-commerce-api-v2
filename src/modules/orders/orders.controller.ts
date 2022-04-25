import { Controller, Get, Post, Put, Delete, Param, Body, NotFoundException, UseGuards, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrdersService } from './orders.service';
import { Order as OrderEntity } from './order.entity';
import { OrderDto } from './dto/order.dto';
import { verifyTokenAndAuthorizationGuard } from '../../core/guards/verifyTokenAndAuthorization.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) { }

  @Get(':userId')
  @UseGuards(AuthGuard('jwt'), verifyTokenAndAuthorizationGuard)
  async findAll(@Param('userId') id: number) {
    return await this.orderService.findUserOrders(id);
  }

  // @Get(':id')
  // async findOne(@Param('id') id: number): Promise<OrderEntity> {
  //   // find the post with this id
  //   const post = await this.orderService.findOne(id);
  //
  //   // if the post doesn't exit in the db, throw a 404 error
  //   if (!post) {
  //     throw new NotFoundException('This Post doesn\'t exist');
  //   }
  //
  //   // if post exist, return the post
  //   return post;
  // }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() order: OrderDto, @Request() req): Promise<OrderEntity> {
    // create a new order and return the newly created order
    return await this.orderService.create(order, req.user.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Put(':id')
  async update(@Param('id') id: number, @Body() order: OrderDto, @Request() req): Promise<OrderEntity> {
    // get the number of row affected and the updated post
    const { numberOfAffectedRows, updatedPost } = await this.orderService.update(id, order, req.user.id);

    // if the number of row affected is zero,
    // it means the post doesn't exist in our db
    if (numberOfAffectedRows === 0) {
      throw new NotFoundException('This Post doesn\'t exist');
    }

    // return the updated post
    return updatedPost;
  }

  @UseGuards(AuthGuard('jwt'))
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    // delete the post with this id
    const deleted = await this.orderService.delete(id, req.user.id);

    // if the number of row affected is zero,
    // then the post doesn't exist in our db
    if (deleted === 0) {
      throw new NotFoundException('This Post doesn\'t exist');
    }

    // return success message
    return 'Successfully deleted';
  }
}
