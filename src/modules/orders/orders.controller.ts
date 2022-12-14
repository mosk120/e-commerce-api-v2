import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  NotFoundException,
  UseGuards,
  Request,
  UsePipes,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { OrdersService } from './orders.service';
import { Order as OrderEntity } from './order.entity';
import { OrderDto } from './dto/order.dto';
import { verifyTokenAndAuthorizationGuard } from '../../core/guards/verifyTokenAndAuthorization.guard';
import { verifyAdmin } from '../../core/guards/verifyAdmin.guard';
import { CustomValidationPipe } from '../../core/pipes/validate.pipe';

@Controller('orders')
export class OrdersController {
  constructor(private readonly orderService: OrdersService) { }

  @Get(':userId')
  @UseGuards(AuthGuard('jwt'), verifyTokenAndAuthorizationGuard)
  async findAll(@Param('userId') id: number): Promise<OrderEntity[]>{
    return await this.orderService.findUserOrders(id);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async findOrdersWithProducts(): Promise<OrderEntity[]>{
    return await this.orderService.findOrdersWithProducts();
  }

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async create(@Body() order: OrderDto, @Request() req): Promise<OrderEntity> {
    return await this.orderService.create(order, req.user.id);
  }

  @UsePipes(new CustomValidationPipe())
  @UseGuards(AuthGuard('jwt'), verifyAdmin)
  @Put(':id')
  async update(@Param('id') id: number, @Body() order: OrderDto, @Request() req): Promise<OrderEntity> {
    return await this.orderService.update(id, order);
  }

  @UseGuards(AuthGuard('jwt'), verifyAdmin)
  @Delete(':id')
  async remove(@Param('id') id: number, @Request() req) {
    const deleted = await this.orderService.delete(id);

    if (deleted === 0) {
      throw new NotFoundException('This Order doesn\'t exist');
    }
    return 'Successfully deleted';
  }
}
