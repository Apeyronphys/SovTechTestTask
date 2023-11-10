import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty()
  @Matches('^[a-zA-Z\\s]+$')
  slug: string;

  @ApiProperty()
  @Matches(/^[a-zA-Z-а-яёА-ЯЁ]+(?:\s+[a-zA-Z-а-яёА-ЯЁ]+)*$/i)
  name: string;

  @ApiProperty({ nullable: true })
  @Matches(/^[a-zA-Z-а-яёА-ЯЁ]+(?:\s+[a-zA-Z-а-яёА-ЯЁ]+)*$/i)
  description?: string;
}
