import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from 'src/entities/categories/category.entity';
import { DeleteResult, Repository } from 'typeorm';
import { ICreateCategory } from './interfaces/create-category.interface';
import { IUpdateCategory } from './interfaces/update-category.interface';
import { IGetCategories } from './interfaces/get-categories.interface';
import { createOrderFields } from './utils/order';
import { nameSearch } from './utils/name-serch';

@Injectable()
export class CategoriesRepository {
    constructor(
        @InjectRepository(CategoryEntity)
        private readonly categoriesRepository: Repository<CategoryEntity>,
        private readonly logger: Logger,
    ) {}

    async createCategory(categoryInput: ICreateCategory): Promise<CategoryEntity> {
        try {
            const category = this.categoriesRepository.create({
                ...categoryInput,
                active: true,
            });

            return category;
        } catch(err) {
            this.logger.error(err)

            throw new Error(err);
        }
    }

    async saveCategory(category: CategoryEntity): Promise<CategoryEntity> {
        try {
            return this.categoriesRepository.save(category);
        } catch(err) {
            this.logger.error(err)

            throw new Error(err);
        }
    }

    async findCategory(id?: string, slug?: string): Promise<CategoryEntity> {
        try{
            const category = await this.categoriesRepository.createQueryBuilder('category')
            .where('category.id = :id', { id })
            .orWhere('category.slug = :slug', { slug })
            .getOne()

            return category;
        } catch(err) {
            this.logger.error(err)

            throw new Error(err);
        }
    }

    async updateCategory(
        id: string,
        updateFields: Omit<IUpdateCategory, 'id'>
    ): Promise<boolean> {
        try {
            await this.categoriesRepository.update(
                id, 
                updateFields
            )

            return true;
        } catch(err) {
            this.logger.error(err)

            throw new Error(err);
        }
    }

    async getManyCatigories(request: IGetCategories): Promise<CategoryEntity[]> {
        try {
            const categories = this.categoriesRepository.createQueryBuilder('category')

            const name = nameSearch('name')
            const description = nameSearch('description')

            if (request.active) {
                categories.andWhere('category.active = :active', { active: request.active })
            }

            if (!request.search) {
                if (request.name) {
                    categories.andWhere(name, { name: `${request.name}` })
                }

                if (request.description) {
                    categories.andWhere(description, { description: `%${request.description}%` })
                }
            } else {
                categories.orWhere(description, { description: `%${request.search}%` })
                categories.orWhere(name, { name: `%${request.search}%` })
            }

            const { order, orderValue } = createOrderFields(request.sort)

            return categories
                .limit(request.pageSize)
                .offset(request.page)
                .orderBy(orderValue, order)
                .getMany();
        } catch(err) {
            this.logger.error(err)

            throw new Error(err);
        }
    }

    async deleteCategory(category: CategoryEntity): Promise<DeleteResult> {
        try {
            return this.categoriesRepository.delete(category);
        } catch(err) {
            this.logger.error(err)

            throw new Error(err);
        }
    }
}