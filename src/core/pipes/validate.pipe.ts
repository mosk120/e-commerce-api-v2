import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class CustomValidationPipe implements PipeTransform {

  async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {

      if (this.isEmpty(value)) {
        throw new HttpException(`Validation failed: No payload provided`, HttpStatus.BAD_REQUEST);
      }

      const object = plainToInstance(metatype, value);

      const errors = await validate(object);

      if (errors.length > 0) {
          throw new HttpException(`Validation failed: ${this.formatErrors(errors)}`, HttpStatus.BAD_REQUEST);
      }
      return value;
    }

    private formatErrors(errors: any) {
      return errors.map( error => {
        for (let key in error.constraints) {
          return error.constraints[key]
        }
      }).join(', ');
    }

    private isEmpty(value: any) {
      return Object.keys(value).length < 1;
  }
}
