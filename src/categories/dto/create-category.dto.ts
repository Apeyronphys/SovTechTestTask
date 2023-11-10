import { ApiProperty } from '@nestjs/swagger';
import { Matches } from 'class-validator';

export class CreateCategoryDto {
    @ApiProperty()
    @Matches('^[a-zA-Z\\s]+$')
    slug: string // dobavit proverku na eng or cirilic

    @ApiProperty()
    @Matches(/^[a-zA-Z-а-яёА-ЯЁ]+(?:\s+[a-zA-Z-а-яёА-ЯЁ]+)*$/i)
    name: string

    @ApiProperty({ nullable: true })
    @Matches(/^[a-zA-Z-а-яёА-ЯЁ]+(?:\s+[a-zA-Z-а-яёА-ЯЁ]+)*$/i)
    description?: string
}