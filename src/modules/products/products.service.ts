import { Injectable, Inject, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';
import { ProductDto } from './dto/product.dto';
import { PRODUCT_REPOSITORY } from '../../core/constants';
import { Post } from '../posts/post.entity';
import { User } from '../users/user.entity';

@Injectable()
export class ProductsService {
  constructor(@Inject(PRODUCT_REPOSITORY) private readonly productRepository: typeof Product) { }

  async create(product: ProductDto): Promise<Product> {
    return await this.productRepository.create<Product>(product);
  }

  async findOne(id): Promise<Product> {
    const product = await this.productRepository.findOne({
        where: { id }
      }
    );
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return product;
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.findAll( {
      limit: 20
    });
  }

  async delete(id) {
    const product = await this.productRepository.destroy({
        where: { id }
      }
    );
    return product;
  }

  async update(id, data) {
    const product = await this.productRepository.findByPk(id)
    if (!product) {
      throw new Error('not found')
    }
    const updatedProduct = await (product).update(data)
    return updatedProduct
  }
}
