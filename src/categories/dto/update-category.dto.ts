import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Matches,
  ValidateIf,
} from 'class-validator';

export class UpdateCategoryDto {
  @ApiProperty({ nullable: true })
  @ValidateIf((o) => !o.slug)
  @IsNotEmpty()
  @IsUUID()
  id?: string;

  @ApiProperty({ nullable: true })
  @ValidateIf((o) => !o.id)
  @IsNotEmpty()
  @IsString()
  slug?: string;

  @ApiProperty({ nullable: true })
  @Matches('^[а-яёА-ЯЁa-zA-Z\\s]+$')
  @IsOptional()
  name?: string;

  @ApiProperty({ nullable: true })
  @Matches('^[а-яёА-ЯЁa-zA-Z\\s]+$')
  @IsOptional()
  description?: string;

  @ApiProperty({ nullable: true })
  @IsBoolean()
  @IsOptional()
  active?: boolean;
}
