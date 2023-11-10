import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class GetCategoryByIdDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsUUID()
    id!: string
}