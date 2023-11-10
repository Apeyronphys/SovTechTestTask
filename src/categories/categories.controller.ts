import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { CategoryDto } from './dto/category.dto';
import { ApiResponse } from '@nestjs/swagger';
import { GetCategoryDto } from './dto/get-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { GetCategoryByIdDto } from './dto/get-category-by-id.dto';
import { GetCategoriesDto } from './dto/get-categories.dto';

@Controller('categories')
export class CategoriesController {
    constructor(
        private readonly categoriesService: CategoriesService,
    ) {}

    @Post()
    @ApiResponse({ type: CategoryDto })
    async createCategory(
        @Body() input: CreateCategoryDto,
    ): Promise<CategoryDto> {
        const cotegory = await this.categoriesService.createCategory(input)

        return new CategoryDto(cotegory)
    }

    @Put()
    @ApiResponse({ type: CategoryDto })
    async updateCategory(
        @Body() input: UpdateCategoryDto
    ): Promise<CategoryDto> {
        return this.categoriesService.updateCategory(input)
    }

    @Get()
    @ApiResponse({ type: CategoryDto })
    async getCategory(
        @Query() query: GetCategoryDto
    ): Promise<CategoryDto> {
        return this.categoriesService.getCategory(query.id, query.slug)
    }

    @Post('all')
    @ApiResponse({ type: [CategoryDto] })
    @UsePipes(new ValidationPipe({ transform: true }))
    async getAllCategories(
        @Body() body: GetCategoriesDto
    ): Promise<CategoryDto[]> {
        return this.categoriesService.getAllCategories(body)
    }

    @Delete(':id')
    @ApiResponse({ type: Boolean })
    async deleteCategory(
        @Param() param: GetCategoryByIdDto
    ): Promise<boolean> {
        return this.categoriesService.removeCategory(param.id)
    }

}