import {
  Injectable,
  PipeTransform,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  transform(value: any, metadata: ArgumentMetadata): any {
    const { metatype } = metadata;

    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const dtoProperties = Object.keys(new metatype());
    const invalidProperties = Object.keys(value).filter(
      (key) => !dtoProperties.includes(key),
    );

    if (invalidProperties.length > 0) {
      throw new BadRequestException(
        `Invalid properties: ${invalidProperties.join(', ')}`,
      );
    }

    return value;
  }

  private toValidate(metatype: any): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }
}
