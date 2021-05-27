import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoryEntity } from '../infrastructure/data-source/entities/category.entity';
import { Repository } from 'typeorm';
import { Category } from './category.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
  ) {
    this.seedCategories();
  }

  async seedCategories(): Promise<void> {
    if ((await this.categoryRepo.count()) == 0) {
      const cat1: Category = {
        name: 'Switch',
      };
      const cat2: Category = {
        name: 'Lamp',
      };
      const cat3: Category = {
        name: 'Thermometer',
      };
      const cat4: Category = {
        name: 'Oven',
      };
      await this.addCategory(cat1);
      await this.addCategory(cat2);
      await this.addCategory(cat3);
      await this.addCategory(cat4);
    }
  }

  async getAllCategories(): Promise<Category[]> {
    return await this.categoryRepo.find();
  }

  async addCategory(category: Category): Promise<Category> {
    const createdCategory = this.categoryRepo.create();
    createdCategory.name = category.name;
    return await this.categoryRepo.save(createdCategory);
  }
}
