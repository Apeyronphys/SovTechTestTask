import { ApiProperty } from '@nestjs/swagger';
import { ICategory } from '../interfaces/category.interface';

export class CategoryDto {
  @ApiProperty()
  id!: string;

  @ApiProperty()
  slug!: string;

  @ApiProperty()
  name!: string;

  @ApiProperty()
  description?: string;

  @ApiProperty()
  createdDate!: Date;

  @ApiProperty()
  active!: boolean;

  constructor(category: ICategory) {
    this.id = category.id;
    this.name = category.name;
    this.description = category.description;
    this.slug = category.slug;
    this.createdDate = category.createdDate;
    this.active = category.active;
  }
}
