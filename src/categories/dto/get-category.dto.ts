import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, ValidateIf } from 'class-validator';

export class GetCategoryDto {
    @ApiProperty({ nullable: true })
    @ValidateIf(o => !o.slug)
    @IsNotEmpty()
    @IsUUID()
    id?: string

    @ApiProperty({ nullable: true })
    @ValidateIf(o => !o.id)
    @IsNotEmpty()
    @IsString()
    slug?: string
}