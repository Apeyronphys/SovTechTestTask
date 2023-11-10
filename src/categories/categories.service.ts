import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ICreateCategory } from './interfaces/create-category.interface';
import { ICategory } from './interfaces/category.interface';
import { IUpdateCategory } from './interfaces/update-category.interface';
import _ from 'lodash';
import { CategoriesRepository } from './categories.repository';
import { IGetCategories } from './interfaces/get-categories.interface';

@Injectable()
export class CategoriesService {
  constructor(
    private readonly categoriesRepository: CategoriesRepository,
    private readonly logger: Logger,
  ) {}

  async createCategory(categoryInput: ICreateCategory): Promise<ICategory> {
    try {
      const category =
        await this.categoriesRepository.createCategory(categoryInput);

      return this.categoriesRepository.saveCategory(category);
    } catch (err) {
      this.logger.error(err);

      throw new Error(err);
    }
  }

  async updateCategory(categoryInput: IUpdateCategory): Promise<ICategory> {
    try {
      const category = await this.categoriesRepository.findCategory(
        categoryInput.id,
        categoryInput.slug,
      );

      if (!category) {
        throw new NotFoundException('Category is not found by given varibles');
      }

      const updateFields = _.omit(categoryInput, 'id');

      await this.categoriesRepository.updateCategory(category.id, updateFields);

      return { ...category, ...updateFields };
    } catch (err) {
      this.logger.error(err);

      throw new Error(err);
    }
  }

  async getCategory(id?: string, slug?: string): Promise<ICategory> {
    try {
      const category = await this.categoriesRepository.findCategory(id, slug);

      if (!category) {
        throw new NotFoundException('Category is not found by given varibles');
      }

      return category;
    } catch (err) {
      this.logger.error(err);

      throw new Error(err);
    }
  }

  async removeCategory(id: string): Promise<boolean> {
    try {
      const category = await this.categoriesRepository.findCategory(id);

      return !!this.categoriesRepository.deleteCategory(category);
    } catch (err) {
      this.logger.error(err);

      throw new Error(err);
    }
  }

  async getAllCategories(request: IGetCategories): Promise<ICategory[]> {
    try {
      return this.categoriesRepository.getManyCatigories(request);
    } catch (err) {
      this.logger.error(err);

      throw new Error(err);
    }
  }
}
