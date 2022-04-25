import { IsNotEmpty } from 'class-validator';

export class OrderDto {
  @IsNotEmpty()
  readonly title: string

  @IsNotEmpty()
  readonly amount: string;

  @IsNotEmpty()
  readonly address: string;

  @IsNotEmpty()
  readonly status: string;
}