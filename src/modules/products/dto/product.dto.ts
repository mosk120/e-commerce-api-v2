import { IsNotEmpty } from 'class-validator';

export class ProductDto {
  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly price: string;

  @IsNotEmpty()
  readonly img: string;

}