import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Request,
  UsePipes,
  Param,
  Delete,
  Res,
  HttpCode,
  NotFoundException, UseGuards,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { PostDto } from '../posts/dto/post.dto';
import { Post as PostEntity } from '../posts/post.entity';
import { ProductDto } from './dto/product.dto';
import { Product as ProductEntity } from './product.entity';
import { CustomValidationPipe } from '../../core/pipes/validate.pipe';
import { AuthGuard } from '@nestjs/passport';
import { verifyToken } from '../../core/guards/verifyToken.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {
  }

  @UsePipes(new CustomValidationPipe())
  @Post()
  async create(@Body() product: ProductDto): Promise<ProductEntity> {
    // create a new post and return the newly created post
    return await this.productsService.create(product);
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ProductEntity> {
    const product = await this.productsService.findOne(id);
    console.log(product);
    return product;
  }

  @Get()
  async findAll() {
    const product = await this.productsService.findAll();
    console.log(product);
    return product;
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: number) {
    const product = await this.productsService.delete(id);

    if (product === 0) {
      throw new NotFoundException('This Post doesn\'t exist');
    }

    return 'Successfully deleted!';
  }

  @UsePipes(new CustomValidationPipe())
  @UseGuards(AuthGuard('jwt'), verifyToken)
  @Put(':id')
  async updateProduct(@Param('id') id: number, @Body() product: ProductDto): Promise<ProductEntity> {
    return await this.productsService.update(id, product);
  }
}


