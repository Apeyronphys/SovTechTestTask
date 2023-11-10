import { ApiProperty } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import { IsNumber, IsOptional, IsString, Matches, Max, Min } from 'class-validator'

export class GetCategoriesDto {
    @ApiProperty({ nullable: true })
    @Transform(({ value }) => value?.trim())
    @Matches(/^[a-zA-Z-а-яёА-ЯЁ]+(?:\s+[a-zA-Z-а-яёА-ЯЁ]+)*$/i)
    @IsOptional()
    @IsString()
    name?: string

    @ApiProperty({  nullable: true })
    @Transform(({ value }) => value?.trim())
    @Matches(/^[a-zA-Z-а-яёА-ЯЁ]+(?:\s+[a-zA-Z-а-яёА-ЯЁ]+)*$/i)
    @IsOptional()
    @IsString()
    description?: string

    @ApiProperty({  nullable: true })
    @Transform(({ value }) => {
        if (value === 1 || value === '1') return true;
        if (value === 0 || value === '0') return false;
        return value;
    })
    @IsOptional()
    active?: string

    @ApiProperty({  nullable: true })
    @Transform(({ value }) => value?.trim())
    @Matches(/^[a-zA-Z-а-яёА-ЯЁ]+(?:\s+[a-zA-Z-а-яёА-ЯЁ]+)*$/i)
    @IsOptional()
    @IsString()
    search?:string

    @ApiProperty({ 
        nullable: true,
        type: Number
    })
    @IsNumber()
    @Min(1)
    @Max(9)
    pageSize? = 2

    @ApiProperty({ 
        nullable: true,
        type: Number
    })
    @IsNumber()
    @Transform(({ value }) => value > 0 ? value - 1 : value)
    @IsOptional()
    page? = 0

    @ApiProperty({
        nullable: true,
        type: String
    })
    @IsOptional()
    @IsString()
    sort? = '-createdDate'
}